import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const Home = ({ addToCart, toggleWishlist, wishlistItems }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setLatestProducts(res.data.products.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products", error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10 overflow-x-hidden">
      
      {/* 1. HERO SLIDER */}
      <ImageSlider />

      {/* 2. FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-30 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100">
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">🚚</div>
             <div><h4 className="font-bold text-gray-800 text-sm">Free Shipping</h4><p className="text-xs text-gray-500">On orders over ₹499</p></div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🛡️</div>
             <div><h4 className="font-bold text-gray-800 text-sm">Official Warranty</h4><p className="text-xs text-gray-500">100% Genuine</p></div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">💳</div>
             <div><h4 className="font-bold text-gray-800 text-sm">Secure Payment</h4><p className="text-xs text-gray-500">UPI, Card & Netbanking</p></div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🎧</div>
             <div><h4 className="font-bold text-gray-800 text-sm">24/7 Support</h4><p className="text-xs text-gray-500">Friendly Support</p></div>
          </div>

        </div>
      </div>

      {/* 3. LATEST COLLECTION */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Trending Now
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our latest arrivals featuring top-tier performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
             Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse h-80">
                   <div className="bg-gray-200 h-48 w-full rounded mb-4"></div>
                   <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                </div>
             ))
          ) : latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found.</p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="inline-block bg-white text-purple-600 border-2 border-purple-600 px-10 py-3 rounded-full text-lg font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-md transform hover:-translate-y-1">
            View All Products →
          </Link>
        </div>
      </div>

      {/* 4. PROMO BANNER (Final Fixes) */}
      <div className="mt-16 bg-[#1a1c2e] text-white py-12 px-4 relative overflow-hidden">
         
         {/* Background Blur - Added pointer-events-none to prevent blocking clicks */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>

         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            
            {/* Left Content */}
            <div className="md:w-1/2 text-center md:text-left space-y-6 relative z-30">
               <span className="bg-purple-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm inline-block">
                 Limited Offer
               </span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Upgrade to <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    iPhone 15 Pro
                  </span>
               </h2>
               <p className="text-gray-300 text-base md:text-lg max-w-lg mx-auto md:mx-0">
                  Titanium design, A17 Pro chip, and the most powerful camera system yet. Experience the future today.
               </p>
               
               {/* BUTTON FIX: z-50 and relative to ensure it's on top */}
               <div className="relative z-50 pt-4">
                 <Link 
                   to="/products" 
                   className="inline-block bg-white text-[#1a1c2e] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                 >
                    Shop Now
                 </Link>
               </div>
            </div>

            {/* Right Image (Responsive Fix) */}
            {/* pointer-events-none added to container to ensure it doesn't block clicks on mobile overlapping areas */}
            <div className="md:w-1/2 flex justify-center relative z-20 mt-8 md:mt-0 pointer-events-none">
               <img 
                 src="/iphone 15 pro.jpg" 
                 alt="iPhone 15 Pro" 
                 // Responsive Classes: w-3/4 on mobile ensures it's not too big. md:w-full lets it grow on desktop.
                 className="w-3/4 md:w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl animate-float pointer-events-auto"
                 onError={(e) => { e.target.style.display='none' }} 
               />
            </div>
         </div>
      </div>

    </div>
  );
};

export default Home;