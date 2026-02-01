import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrder } from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data.orders.reverse()); // சமீபத்தியது முதலில் வர
      setLoading(false);
    } catch (error) {
      alert("Error loading orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, status);
      alert("Order Status Updated!");
      loadOrders(); // Refresh List
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Data...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders ({orders.length})</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="p-4 rounded-tl-lg">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-4 text-xs font-mono text-gray-500">#{order._id}</td>
                <td className="p-4 text-sm font-bold text-gray-700">User ID: {order.user}</td>
                <td className="p-4 text-sm text-gray-600">
                  {order.cartItems.map(i => (
                    <div key={i._id}>{i.name} (x{i.quantity})</div>
                  ))}
                </td>
                <td className="p-4 font-bold text-purple-600">₹{order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  {order.status !== 'Delivered' && (
                    <select 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                  {order.status === 'Delivered' && <span className="text-green-500">Completed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;