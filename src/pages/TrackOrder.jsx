import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // நாம் உருவாக்கிய API
import { toast } from 'react-hot-toast';
import { 
  FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock, 
  FiMapPin, FiChevronRight, FiAlertCircle, FiShoppingBag, FiCalendar 
} from "react-icons/fi";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // --- API CALL FUNCTION ---
  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return toast.error("Please enter Order ID");

    const cleanId = orderId.replace('#', '').trim();
    
    // MongoDB ID Validation (24 chars)
    if (cleanId.length !== 24) {
        return toast.error("Invalid Order ID format. Check My Orders page.");
    }

    setLoading(true);
    setOrderDetails(null);

    try {
        // API Call
        const { data } = await API.get(`/order/${cleanId}`);

        if (data.success) {
            setOrderDetails(data.order);
            toast.success("Order Found! 📦");
        } else {
            toast.error("Order not found");
        }
    } catch (error) {
        console.error("Tracking Error:", error);
        toast.error(error.response?.data?.message || "Order not found with this ID");
    } finally {
        setLoading(false);
    }
  };

  // --- STATUS STEPPER LOGIC ---
  const getStatusStep = (status) => {
      switch(status) {
          case 'Processing': return 1;
          case 'Shipped': return 2;
          case 'Delivered': return 3;
          default: return 0;
      }
  };

  const currentStep = orderDetails ? getStatusStep(orderDetails.status) : 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. HERO HEADER (Premium Gradient) */}
      <div className="relative bg-[#1a1c2e] text-white py-24 px-4 overflow-hidden">
        {/* Abstract Background Animation */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Order Status</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Enter your Order ID below to get real-time updates on your shipment.
            </p>

            {/* SEARCH INPUT CARD */}
            <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col md:flex-row gap-2 transform translate-y-8 border border-gray-100">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                    <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g., 65cf3b...)" 
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-gray-800 font-mono transition-all"
                    />
                </div>
                <button 
                    onClick={handleTrack}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {loading ? (
                       <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                       <>Track Now <FiChevronRight /></>
                    )}
                </button>
            </div>
        </div>
      </div>

      {/* 2. ORDER DETAILS SECTION */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        
        {/* LOADING SKELETON (Optional) */}
        {loading && (
           <div className="animate-pulse space-y-4">
              <div className="h-40 bg-gray-200 rounded-2xl"></div>
              <div className="h-60 bg-gray-200 rounded-2xl"></div>
           </div>
        )}

        {/* RESULT CARD */}
        {orderDetails && !loading && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                
                {/* Header Info */}
                <div className="bg-gray-50/50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Order ID</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 font-mono">#{orderDetails._id}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                           <FiCalendar /> Placed on: {new Date(orderDetails.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Amount</p>
                        <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                           ₹{orderDetails.amount?.toLocaleString()}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                            orderDetails.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                           <FiClock /> {orderDetails.status}
                        </span>
                    </div>
                </div>

                {/* PROGRESS TRACKER (The "Premium" Look) */}
                <div className="p-8 md:p-12 relative">
                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                        
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-0 rounded-full"></div>
                        <div 
                            className="hidden md:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -translate-y-1/2 -z-0 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                        ></div>

                        {/* Steps */}
                        {['Processing', 'Shipped', 'Delivered'].map((step, index) => {
                             const stepNum = index + 1;
                             const isCompleted = stepNum <= currentStep;
                             const isCurrent = stepNum === currentStep;

                             return (
                                <div key={step} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-4 w-full md:w-auto">
                                    {/* Icon Circle */}
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl shadow-lg transition-all duration-500 ${
                                        isCompleted 
                                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110 ring-4 ring-purple-50' 
                                          : 'bg-white border-2 border-gray-200 text-gray-300'
                                    }`}>
                                        {step === 'Processing' && <FiPackage />}
                                        {step === 'Shipped' && <FiTruck />}
                                        {step === 'Delivered' && <FiCheckCircle />}
                                    </div>

                                    {/* Text */}
                                    <div className="md:text-center">
                                        <p className={`font-bold text-base ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</p>
                                        <p className="text-xs text-gray-400">
                                            {isCurrent ? 'Current Status' : isCompleted ? 'Completed' : 'Pending'}
                                        </p>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                </div>

                {/* ITEMS LIST (Grid Layout) */}
                <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                        <FiShoppingBag className="text-purple-600" /> Order Items
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orderDetails.cartItems?.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                   <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                       <span className="font-bold text-purple-600">₹{item.price}</span> 
                                       <span className="text-gray-400 mx-2">|</span> 
                                       Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* FOOTER ACTIONS */}
                <div className="p-6 bg-white border-t border-gray-100 flex justify-center">
                   <Link to="/contact" className="text-gray-500 hover:text-purple-600 transition flex items-center gap-2 text-sm font-medium">
                      <FiAlertCircle /> Report an issue with this order
                   </Link>
                </div>

            </div>
        )}

        {/* EMPTY STATE / INSTRUCTIONS */}
        {!orderDetails && !loading && (
            <div className="text-center py-12 opacity-50">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-4xl">
                  <FiMapPin />
               </div>
               <p className="text-gray-400">Enter your Order ID above to see details.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;