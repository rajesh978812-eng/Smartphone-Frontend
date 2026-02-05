import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiBox, FiGrid } from "react-icons/fi";

const Navbar = ({ search, setSearch, cartItems, wishlistItems, isLoggedIn, setIsLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Scroll Effect
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // --- 1. USER AUTH CHECK ---
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [isLoggedIn]);

  // --- 2. SCROLL EFFECT (Premium Feel) ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3. CLICK OUTSIDE TO CLOSE MENU ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- COUNTS ---
  const totalCartItems = cartItems?.length || 0;
  const totalWishlistItems = wishlistItems?.length || 0;

  // --- HANDLERS ---
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  // Helper for Active Link Class
  const getLinkClass = (path) => {
    return location.pathname === path 
      ? "text-purple-400 font-bold border-b-2 border-purple-400 pb-1" 
      : "text-gray-300 hover:text-white transition-colors duration-300 font-medium hover:scale-105 transform";
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#1a1c2e]/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-[#1a1c2e] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3">

          {/* 1. LOGO (Gradient Text) */}
          {/* --- PREMIUM SWIPEKART LOGO START --- */}
<Link to="/" className="flex items-center gap-2 group">
  
  {/* Logo Icon Container */}
  <div className="relative w-11 h-11">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80 blur-sm"></div>
    <div className="relative w-full h-full bg-[#24263a] border border-gray-700 rounded-xl flex items-center justify-center text-white overflow-hidden shadow-2xl">
       
       {/* Animated Swipe Icon */}
       <div className="relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <path d="M12 18h.01"></path>
            {/* Swipe Arrow Animation */}
            <path d="M15 10l-3-3m0 0l-3 3m3-3v8" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-white" /> 
          </svg>
       </div>
       
       {/* Shine Effect */}
       <div className="absolute top-0 -left-10 w-8 h-full bg-white/10 skew-x-[20deg] group-hover:translate-x-24 transition-transform duration-700 ease-in-out"></div>
    </div>
  </div>

  {/* Logo Text */}
  <div className="flex flex-col">
    <h1 className="text-2xl font-black tracking-tight text-white leading-none font-sans">
      Swipe<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:text-purple-300 transition-colors">Kart</span>
    </h1>
  </div>

</Link>
{/* --- PREMIUM SWIPEKART LOGO END --- */}


          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkClass("/")}>Home</Link>
            <Link to="/products" className={getLinkClass("/products")}>Products</Link>
            <Link to="/about" className={getLinkClass("/about")}>About</Link>
            <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
            <Link to="/track-order" className={getLinkClass("/track-order")}>Track Order</Link>
            <Link to="/compare" className={getLinkClass("/compare")}>Compare</Link>
            <Link to="/repair" className={getLinkClass("/repair")}>Service</Link>  
          </div>

          {/* 3. RIGHT ICONS & SEARCH */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Search Bar (Expandable) */}
            <div className="relative hidden md:block group ml-[10px]">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchInput}
                className="bg-gray-800/50 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-32 focus:w-64 transition-all duration-500 border border-gray-700"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            </div>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative text-gray-300 hover:text-purple-400 transition transform hover:scale-110">
              <FiHeart size={22} />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md animate-bounce">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-300 hover:text-purple-400 transition transform hover:scale-110">
              <FiShoppingCart size={22} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                   <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md border-2 border-transparent hover:border-purple-300 transition">
                      {user.name.charAt(0).toUpperCase()}
                   </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 transform origin-top-right transition-all border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {/* --- 1. NEW PROFILE LINK (Desktop) --- */}
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FiUser /> My Profile
                    </Link>

                    {user.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 text-sm text-yellow-600 hover:bg-yellow-50 font-medium transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiGrid /> Admin Dashboard
                      </Link>
                    )}

                    <Link 
                      to="/my-orders" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FiBox /> My Orders
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition rounded-b-xl"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-bold transition shadow-lg hover:shadow-purple-500/30 text-sm">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU (Slide Down) */}
      <div className={`md:hidden bg-[#1f2136] overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen border-t border-gray-700" : "max-h-0"}`}>
        <div className="px-4 pt-4 pb-6 space-y-3">
          
          {/* Mobile Search */}
          <div className="relative mb-4 ">
             <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchInput}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 border  border-gray-700"
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Home</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Products</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Contact</Link>
          <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Track Order</Link>
          <Link to="/compare" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Compare</Link>
           <Link to="/repair" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 rounded-lg transition">Service</Link>
          
          {user ? (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex items-center gap-3 px-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* --- 2. NEW PROFILE LINK (Mobile) --- */}
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                 <FiUser /> My Profile
              </Link>

              {user.role === 'admin' && (
                 <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-yellow-400 font-bold hover:bg-white/5 rounded-lg flex items-center gap-2">
                   <FiGrid /> Admin Dashboard
                 </Link>
              )}
              
              <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-purple-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                 <FiBox /> My Orders
              </Link>
              <button onClick={handleLogout} className="w-full text-left py-2 px-3 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg flex items-center gap-2 mt-2">
                 <FiLogOut /> Logout
              </button>
            </div>
          ) : (
             <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-purple-600 text-white font-bold py-3 rounded-lg mt-4 shadow-lg active:scale-95 transition">
               Login / Signup
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;