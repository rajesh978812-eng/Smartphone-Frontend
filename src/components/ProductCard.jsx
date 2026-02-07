import React from 'react';
import { Link } from 'react-router-dom';
// FiStar ஐ நீக்கிவிட்டு FaStar ஐ இங்கே சேர்த்துள்ளேன்
import { FiHeart, FiShoppingCart } from "react-icons/fi"; 
import { FaBolt, FaStar } from "react-icons/fa"; 

const ProductCard = ({ product, wishlistItems, toggleWishlist, addToCart }) => {
  const { 
    _id, image, name, ram, storage, display, mrp, price, 
    ratings, numOfReviews, brand 
  } = product;

  // --- IMAGE HELPER ---
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300?text=No+Image";
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`; 
  };

  // Wishlist Check
  const isWishlisted = wishlistItems?.some((item) => item._id === _id);
  
  // Discount Calculation
  const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  // Rating Stars Helper (UPDATED FIX)
  const renderStars = (ratingValue) => {
    // 1. Ensure rating is a valid number, default to 0 if missing
    const safeRating = parseFloat(ratingValue) || 0;
    
    // 2. Generate 5 stars
    return [...Array(5)].map((_, i) => {
        // Logic: Compare current index (i) with the rounded rating
        // Example: Rating 3.2 -> Rounds to 3.
        // i=0 (<3) -> Orange
        // i=1 (<3) -> Orange
        // i=2 (<3) -> Orange
        // i=3 (<3 is False) -> Gray
        const isActive = i < Math.round(safeRating);

        return (
          <FaStar 
            key={i} 
            size={14}
            className={`${isActive ? "text-[#ffa41c]" : "text-gray-200"} transition-colors duration-200`}
          />
        );
    });
  };

  return (
    <div className='group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1'>
      
      {/* 1. PRODUCT IMAGE AREA */}
      <div className="relative w-full bg-gray-50 p-4 flex items-center justify-center overflow-hidden h-[220px] md:h-[260px]">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {discount >= 20 && (
                <span className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                   <FaBolt size={10} /> {discount}% OFF
                </span>
            )}
            {/* UPDATED LOGIC: Only show Bestseller if Rating is high AND Review count is > 30 */}
            {ratings >= 4.5 && numOfReviews >= 30 && (
                <span className="bg-[#ffa41c] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm">
                   BESTSELLER
                </span>
            )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist && toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-20 p-2.5 bg-white rounded-full shadow-md hover:bg-red-50 transition group/btn"
        >
          <FiHeart 
             size={18} 
             className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/btn:text-red-500"}`} 
          />
        </button>

        {/* Link to Details */}
        <Link to={`/product/${_id}`} className="w-full h-full flex items-center justify-center">
            <img 
              src={getImageUrl(image)} 
              alt={name} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
        </Link>

        {/* Quick Add to Cart Button (Visible on Hover for Desktop) */}
        {addToCart && (
           <button 
             onClick={() => addToCart(product)}
             className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 z-20 hidden md:flex items-center justify-center"
             title="Add to Cart"
           >
              <FiShoppingCart size={20} />
           </button>
        )}
      </div>

      {/* 2. PRODUCT CONTENT */}
      <Link to={`/product/${_id}`} className="flex-1 p-4 md:p-5 flex flex-col">
        
        {/* Brand */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{brand}</p>
        
        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug mb-2 line-clamp-2 hover:text-purple-600 transition-colors h-[40px] md:h-[48px]">
          {name}
        </h3>

        {/* Ratings (Amazon Style) */}
        <div className="flex items-center gap-1 mb-3">
           <div className="flex items-center gap-0.5">
             {renderStars(ratings)}
           </div>
           <span className="text-xs text-gray-400 font-medium ml-1">({numOfReviews})</span>
        </div>

        {/* Specs Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
           <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium px-2 py-1 rounded">{ram}GB RAM</span>
           <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium px-2 py-1 rounded">{storage}GB</span>
           <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-medium px-2 py-1 rounded">{display}</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-dashed border-gray-100">
           <div className="flex items-end gap-2">
              <span className="text-lg md:text-xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
              {mrp > price && (
                 <>
                   <span className="text-xs md:text-sm text-gray-400 line-through mb-1">₹{mrp.toLocaleString()}</span>
                   <span className="text-xs md:text-sm font-bold text-green-600 mb-1">{discount}% off</span>
                 </>
              )}
           </div>
           <p className="text-[10px] text-gray-500 mt-1 font-medium">Free Delivery by Smartphone Store</p>
        </div>
      </Link>
      
      {/* Mobile Add to Cart Button (Always Visible on Mobile) */}
      {addToCart && (
        <div className="md:hidden px-4 pb-4">
           <button 
             onClick={() => addToCart(product)}
             className="w-full bg-purple-50 text-purple-700 font-bold py-2 rounded-lg text-sm border border-purple-100 active:bg-purple-100 flex items-center justify-center gap-2"
           >
             <FiShoppingCart /> Add to Cart
           </button>
        </div>
      )}

    </div>
  );
};

export default ProductCard;