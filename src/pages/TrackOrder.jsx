import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';
import { FiSearch, FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiClock, FiShoppingBag, FiCopy, FiAlertCircle } from "react-icons/fi";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // User Token for API Calls
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserToken(JSON.parse(userInfo).token);
    }
  }, []);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return toast.error("Please enter Order ID");

    // Remove '#' if user types it
    const cleanId = orderId.replace('#', '').trim();
    setLoading(true);
    setOrderDetails(null);

    try {
        // --- 1. TRY REAL API CALL (Backend Connection) ---
        // குறிப்பு: உங்கள் Backend-ல் '/api/order/:id' என்ற route இருக்க வேண்டும்.
        const config = { headers: { Authorization: `Bearer ${userToken}` } };
        const { data } = await axios.get(`http://localhost:8000/api/order/${cleanId}`, config);
        
        setOrderDetails({
            id: data.order._id,
            product: data.order.cartItems.map(item => item.name).join(", "),
            amount: data.order.amount,
            date: new Date(data.order.createdAt).toLocaleDateString(),
            status: data.order.status, // "Processing", "Shipped", "Delivered"
            deliveryDate: "Estimated within 3-5 days"
        });
        toast.success("Order Found! 🚚");

    } catch (error) {
        console.error("Tracking Error (Using Demo Data):", error);
        
        // --- 2. FALLBACK DEMO DATA (API வேலை செய்யவில்லை என்றால் இது வரும்) ---
        // நீங்கள் கேட்டபடி 'Delivered' என்று காட்ட மாற்றியுள்ளேன்
        setTimeout(() => {
            setOrderDetails({
                id: cleanId,
                product: "iPhone 15 Pro (Black Titanium) - [DEMO MODE]",
                amount: 147999,
                date: "Jan 30, 2026",
                status: "Delivered", // <--- FIXED: இப்போது Delivered என்று காட்டும்
                deliveryDate: "Feb 02, 2026"
            });
            toast.success("Order Found (Demo)!");
        }, 1000);
    } finally {
        setTimeout(() => setLoading(false), 1000);
    }
  };

  // Timeline Steps
  const steps = [
      { status: "Order Placed", label: "Order Placed", icon: <FiShoppingBag /> },
      { status: "Processing", label: "Processing", icon: <FiClock /> },
      { status: "Shipped", label: "Shipped", icon: <FiTruck /> },
      { status: "Delivered", label: "Delivered", icon: <FiCheckCircle /> }
  ];

  // Logic to determine active step
  const getStepStatus = (stepName) => {
      const statusOrder = ["Order Placed", "Processing", "Shipped", "Delivered"];
      // Backend Status-ஐ 'Out for Delivery' போன்றவற்றுடன் Map செய்தல்
      let currentStatus = orderDetails?.status || "Processing";
      
      const currentStatusIndex = statusOrder.indexOf(currentStatus);
      const stepIndex = statusOrder.indexOf(stepName);
      
      return stepIndex <= currentStatusIndex;
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-[#1a1c2e] text-white py-16 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
         
         <div className="relative z-10 px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Track Your Order</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Enter your Order ID to verify the status and estimated delivery time.
            </p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* 2. SEARCH BOX */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <FiPackage className="absolute left-4 top-4 text-gray-400 text-xl group-focus-within:text-purple-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Enter Order ID (e.g., 65b7...)"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium text-gray-700 placeholder-gray-400"
                    />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                   {loading ? (
                     <> <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span> Searching... </>
                   ) : (
                     <> <FiSearch className="text-xl" /> Track Order </>
                   )}
                </button>
            </form>
        </div>

        {/* 3. TRACKING RESULT */}
        {orderDetails && (
            <div className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up relative">
                
                {/* Confetti for Delivered Status (CSS Trick) */}
                {orderDetails.status === 'Delivered' && (
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"></div>
                )}

                {/* Header Info */}
                <div className="bg-gray-50/50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-start gap-6">
                    <div className="space-y-2">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                            {orderDetails.product}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                Order ID: <span className="font-mono text-gray-800 font-bold">#{orderDetails.id.substring(0, 10)}...</span>
                                <button onClick={() => {navigator.clipboard.writeText(orderDetails.id); toast.success("Copied!")}} className="ml-1 text-purple-600 hover:text-purple-800"><FiCopy /></button>
                            </span>
                            <span>|</span>
                            <span>Ordered: {orderDetails.date}</span>
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                        {orderDetails.status === 'Delivered' ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                                <FiCheckCircle /> Delivered
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                <FiTruck /> {orderDetails.status}
                            </span>
                        )}
                    </div>
                </div>

                {/* TIMELINE VISUALIZATION */}
                <div className="p-8 md:p-12 relative">
                    {/* Desktop Horizontal Line */}
                    <div className="hidden md:block absolute top-16 left-12 right-12 h-1 bg-gray-200 rounded-full -z-0">
                        {/* Progress Fill */}
                        <div 
                            className="h-full bg-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                                width: orderDetails.status === 'Delivered' ? '100%' : 
                                       orderDetails.status === 'Shipped' ? '66%' : 
                                       orderDetails.status === 'Processing' ? '33%' : '0%' 
                            }}
                        ></div>
                    </div>

                    {/* Mobile Vertical Line */}
                    <div className="md:hidden absolute left-12 top-12 bottom-12 w-1 bg-gray-200 rounded-full -z-0"></div>

                    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 relative z-10">
                        {steps.map((step, index) => {
                            const isActive = getStepStatus(step.status);
                            const isCompleted = getStepStatus(step.status) && orderDetails.status !== step.status; // Past step
                            const isCurrent = orderDetails.status === step.status;

                            return (
                                <div key={index} className="flex md:flex-col items-center gap-6 md:gap-4 md:w-1/4">
                                    {/* Icon Circle */}
                                    <div 
                                        className={`
                                            w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-500 shadow-sm
                                            ${isActive ? 'bg-purple-600 border-purple-200 text-white scale-110 shadow-purple-200' : 'bg-white border-gray-200 text-gray-300'}
                                        `}
                                    >
                                        {step.icon}
                                    </div>
                                    
                                    {/* Text */}
                                    <div className="md:text-center">
                                        <h4 className={`font-bold text-base ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.label}
                                        </h4>
                                        {isCurrent && (
                                            <p className="text-xs text-purple-600 font-bold animate-pulse mt-1">In Progress</p>
                                        )}
                                        {isCompleted && (
                                            <p className="text-xs text-green-600 font-bold mt-1">Completed</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* HELP SECTION */}
                <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600">
                        <FiAlertCircle className="text-xl text-purple-600" />
                        <span className="text-sm font-medium">Issue with your order?</span>
                    </div>
                    <Link 
                        to="/contact" 
                        className="text-purple-700 font-bold hover:bg-purple-50 px-4 py-2 rounded-lg transition text-sm border border-transparent hover:border-purple-200"
                    >
                        Contact Support →
                    </Link>
                </div>

            </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;