import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = ({ wishlistItems, addToCart, toggleWishlist }) => {
  
  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save items you like to see them here.</p>
        <Link 
          to="/products" 
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">My Wishlist ({wishlistItems.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            addToCart={addToCart}
            wishlistItems={wishlistItems}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;