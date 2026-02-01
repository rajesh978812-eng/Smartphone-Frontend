import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminOrders from './AdminOrders'; // கீழே உருவாக்குவோம்
import AdminAddProduct from './AdminAddProduct'; // கீழே உருவாக்குவோம்

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'add-product'
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* 1. SIDEBAR (Responsive) */}
      <div className="bg-[#1a1c2e] text-white w-full md:w-64 flex-shrink-0 md:min-h-screen">
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-2xl font-bold text-purple-400">Admin Panel</h2>
        </div>
        
        <nav className="mt-6 px-4 space-y-3">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'orders' ? 'bg-purple-600 shadow-lg' : 'hover:bg-white/10'}`}
          >
            📦 Manage Orders
          </button>
          
          <button 
            onClick={() => setActiveTab('add-product')}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'add-product' ? 'bg-purple-600 shadow-lg' : 'hover:bg-white/10'}`}
          >
            ➕ Add Product
          </button>

          <Link to="/" className="w-full block text-left px-4 py-3 rounded-lg hover:bg-white/10 text-gray-400 transition flex items-center gap-3">
            🏠 Back to Home
          </Link>
          
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-900/50 text-red-400 transition flex items-center gap-3 mt-10">
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[80vh]">
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'add-product' && <AdminAddProduct />}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;