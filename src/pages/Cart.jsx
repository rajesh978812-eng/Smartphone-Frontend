import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../services/api"; 
import { toast } from 'react-hot-toast';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiCheckCircle, FiCreditCard, FiTruck, FiShield, FiGift } from "react-icons/fi";
import { FaGooglePay, FaAmazonPay, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Cart = ({ cartItems, updateQuantity, removeFromCart, setCartItems }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState("method");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const navigate = useNavigate();

  // Calculations
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cartItems.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const totalDiscount = totalMRP - totalPrice;
  const shippingFee = totalPrice > 500 ? 0 : 49;
  const finalAmount = totalPrice + shippingFee;

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
    setPaymentStep("method");
  };

  // --- PROCESS PAYMENT & CREATE ORDER ---
  const processPayment = async () => {
    setPaymentStep("processing");
    setIsProcessing(true);

    try {
      // Backend API Call
      await createOrder({ cartItems }); 

      // Simulate Payment Delay (2 Seconds)
      setTimeout(() => {
        setPaymentStep("method");
        setShowPaymentModal(false);
        setShowSuccess(true);
        setCartItems([]); // Clear Cart
        toast.success("Order Placed Successfully! 🎉");
      }, 2000);

    } catch (error) {
      console.error("Order Failed", error);
      toast.error("Order Failed! Please try again.");
      setIsProcessing(false);
      setPaymentStep("method");
    }
  };

  // --- EMPTY CART UI ---
  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        {/* Header Match */}
        <div className="bg-[#1a1c2e] py-12 text-center">
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <p className="text-gray-400 mt-2">Home / Cart</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100">
             <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag className="text-purple-600 text-4xl" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
             <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
             <Link 
               to="/products" 
               className="block w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-purple-500/30 transition-all duration-300"
             >
               Start Shopping
             </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- SUCCESS UI ---
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100 relative overflow-hidden">
          {/* Confetti Effect (CSS only) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
          
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <FiCheckCircle className="text-green-600 text-5xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate("/my-orders")} 
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg"
            >
              View My Orders
            </button>
            <button 
              onClick={() => navigate("/products")} 
              className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* 1. HERO HEADER (Matches Footer Color) */}
      <div className="bg-[#1a1c2e] text-white py-16 mb-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-400 flex items-center gap-2 text-sm">
                <span className="text-purple-400 font-bold">{cartItems.length} Items</span> in your bag
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 2. CART ITEMS LIST (Left Side) */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item._id} 
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-purple-600 transition line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{item.ram} RAM | {item.storage} Storage</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                     <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                     {item.mrp && (
                        <span className="text-sm text-gray-400 line-through">₹{item.mrp.toLocaleString()}</span>
                     )}
                     <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% Off
                     </span>
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-30 transition"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-purple-600 transition"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Additional Features (Trust) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><FiTruck /></div>
                    <p className="text-xs font-bold text-gray-700">Fast Delivery</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><FiShield /></div>
                    <p className="text-xs font-bold text-gray-700">Secure Payment</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center"><FiGift /></div>
                    <p className="text-xs font-bold text-gray-700">Genuine Product</p>
                </div>
            </div>
          </div>

          {/* 3. ORDER SUMMARY (Right Side - Sticky) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalMRP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <span className="text-green-600">Free</span> : `₹${shippingFee}`}</span>
                </div>
                
                <div className="border-t border-dashed border-gray-200 my-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-purple-600">₹{finalAmount.toLocaleString()}</span>
                  </div>
                  {totalDiscount > 0 && (
                      <p className="text-green-600 text-xs font-bold mt-2 text-right">
                        You will save ₹{totalDiscount.toLocaleString()} on this order
                      </p>
                  )}
                </div>
              </div>

              {/* Coupon Code (Visual) */}
              <div className="mb-6">
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                    <button className="bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-black transition">Apply</button>
                 </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handlePaymentClick}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2"
              >
                Proceed to Checkout <FiArrowRight />
              </button>

              {/* Payment Methods Icons */}
              <div className="mt-6 flex justify-center gap-4 text-gray-400 text-2xl opacity-60">
                 <FaGooglePay /> <FaAmazonPay /> <FaCcVisa /> <FaCcMastercard />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. PAYMENT MODAL (Modern) */}
      {showPaymentModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
              
              {/* Modal Header */}
              <div className="bg-[#1a1c2e] px-6 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <FiCreditCard /> Secure Payment
                </h3>
                {!isProcessing && (
                  <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white transition">✕</button>
                )}
              </div>

              <div className="p-6">
                {paymentStep === "method" ? (
                  <>
                    <p className="text-gray-500 text-sm mb-4">Select a payment method to complete your purchase of <span className="font-bold text-gray-900">₹{finalAmount.toLocaleString()}</span></p>
                    
                    <div className="space-y-3">
                       <button onClick={processPayment} className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FaGooglePay size={20} /></div>
                             <span className="font-bold text-gray-700 group-hover:text-purple-700">UPI / Google Pay</span>
                          </div>
                          <span className="text-gray-300 group-hover:text-purple-600">➔</span>
                       </button>

                       <button onClick={processPayment} className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><FiCreditCard size={20} /></div>
                             <span className="font-bold text-gray-700 group-hover:text-purple-700">Credit / Debit Card</span>
                          </div>
                          <span className="text-gray-300 group-hover:text-purple-600">➔</span>
                       </button>

                       <button onClick={processPayment} className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><FiTruck size={20} /></div>
                             <div>
                                <span className="font-bold text-gray-700 group-hover:text-purple-700 block text-left">Cash on Delivery</span>
                                <span className="text-[10px] text-gray-500">Pay when you receive</span>
                             </div>
                          </div>
                          <span className="text-gray-300 group-hover:text-purple-600">➔</span>
                       </button>
                    </div>
                  </>
                ) : (
                  /* PROCESSING STATE */
                  <div className="flex flex-col items-center justify-center py-8">
                     <div className="relative w-20 h-20 mb-6">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FiShield className="text-purple-600 text-xl" />
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                     <p className="text-sm text-gray-500 text-center max-w-xs">Please do not close this window or press back. Securely connecting to bank...</p>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                 <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <FiShield /> 100% Secure Transaction encrypted with 128-bit SSL
                 </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Cart;