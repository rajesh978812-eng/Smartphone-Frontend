import React, { useEffect, useState } from 'react';
import { fetchMyOrders } from '../services/api';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await fetchMyOrders();
        setOrders(data.orders); // சமீபத்திய ஆர்டர்கள் முதலில் வர .reverse() போடலாம்
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No orders found</h2>
            <Link to="/products" className="text-purple-600 hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold">Order ID</p>
                    <p className="text-gray-800 font-mono text-sm">#{order._id}</p>
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 uppercase font-bold">Date</p>
                     <p className="text-gray-800 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 uppercase font-bold">Total Amount</p>
                     <p className="text-purple-600 font-bold">₹{order.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  {order.cartItems.map((item) => (
                    <div key={item.product} className="flex items-center gap-4 mb-4 last:mb-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 rounded p-1" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;