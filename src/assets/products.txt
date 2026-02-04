import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlassMagnifier } from "react-image-magnifiers";
import { toast } from 'react-hot-toast';
import { 
  FiShoppingCart, FiZap, FiHeart, FiShare2, FiStar, 
  FiCheckCircle, FiChevronRight, FiCopy 
} from "react-icons/fi";
import { FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCard from '../components/ProductCard'; 

const ProductDetails = ({ addToCart, wishlistItems, toggleWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // --- STATES ---
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Review States
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const isWishlisted = wishlistItems?.some((item) => item._id === product?._id);

  // --- IMAGE HELPER ---
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/400?text=No+Image"; 
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`;
  };

  // --- SHARE FUNCTION ---
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing ${product.name} on Smartphone Store!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard! 📋");
    }
  };

 // --- DATA FETCHING ---
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // மாற்றம் 1: Localhost-ஐ Render Link ஆக மாற்றப்பட்டது
        const { data } = await axios.get(`https://smartphone-backend-rgjm.onrender.com/api/products/${id}`);
        const foundProduct = data.product;
        
        setProduct(foundProduct);
        setSelectedImage(getImageUrl(foundProduct.image));

        // மாற்றம் 2: Related Products-க்கும் Link மாற்றப்பட்டது
        const allProductsRes = await axios.get(`https://smartphone-backend-rgjm.onrender.com/api/products`);
        const related = allProductsRes.data.products.filter(
            (p) => p.brand === foundProduct.brand && p._id !== foundProduct._id
        ).slice(0, 4);
        setRelatedProducts(related);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    window.scrollTo(0, 0); 
    getData();
  }, [id, refreshKey]);
  
// --- REVIEW SUBMIT FUNCTION ---
  const submitReviewToggle = async () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
        toast.error("Please Login to submit a review!");
        navigate("/login");
        return;
    }
    if (rating === 0) return toast.error("Select a star rating! ⭐");
    if (!comment) return toast.error("Write a comment! 📝");

    try {
      const user = JSON.parse(userInfo);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // மாற்றம் 3: Review-க்கும் Render Link மாற்றப்பட்டது
      await axios.put(`https://smartphone-backend-rgjm.onrender.com/api/products/review`, { productId: id, rating, comment }, config);
      
      toast.success("Review Submitted Successfully!");
      setComment("");
      setRating(0);
      setRefreshKey(old => old + 1); 
    } catch (error) {
        toast.error(error.response?.data?.message || "Review Failed");
    }
  };
  

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin h-12 w-12 border-4 border-purple-600 rounded-full border-t-transparent"></div>
    </div>
  );

  if (!product) return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-2xl font-bold text-gray-800">Product Not Found 😕</h2>
      <Link to="/products" className="mt-4 text-purple-600 hover:underline">Back to Products</Link>
    </div>
  );

  const discountPercentage = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // Rating Stars Helper
  const renderStars = (ratingValue) => {
    return [...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        size={18}
        className={`${i < Math.round(ratingValue) ? "fill-[#ffa41c] text-[#ffa41c]" : "fill-gray-200 text-gray-200"}`} 
      />
    ));
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-24 md:pb-10">
      
      {/* 1. BREADCRUMB */}
      <div className="bg-gray-50 py-3 px-4 text-xs md:text-sm text-gray-500 sticky top-16 z-30 hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link to="/" className="hover:text-purple-600 font-medium">Home</Link> <FiChevronRight />
            <Link to="/products" className="hover:text-purple-600 font-medium">Mobiles</Link> <FiChevronRight />
            <span className="truncate font-semibold text-gray-800">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* --- LEFT SIDE: IMAGES (Improved Sizing) --- */}
        <div className="lg:col-span-5 relative">
            <div className="sticky top-28">
                {/* Main Image with Zoom - SIZING FIXED HERE */}
                <div className="relative border border-gray-100 rounded-2xl p-2 bg-white flex justify-center items-center w-full h-[400px] md:h-[500px] shadow-sm group overflow-hidden">
                    
                    {/* Wishlist & Share Buttons */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
                         <button 
                            onClick={() => toggleWishlist(product)} 
                            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition border border-gray-100 group/btn"
                            title="Add to Wishlist"
                         >
                             <FiHeart className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/btn:text-red-500"}`} size={22} />
                         </button>
                         <button 
                            onClick={handleShare}
                            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition border border-gray-100 group/btn"
                            title="Share"
                         >
                             <FiShare2 className="text-gray-400 group-hover/btn:text-purple-600" size={22} />
                         </button>
                    </div>

                    {selectedImage && (
                        <div className="w-full h-full flex items-center justify-center">
                            <GlassMagnifier
                                imageSrc={selectedImage}
                                largeImageSrc={selectedImage}
                                magnifierSize="40%"
                                allowOverflow={true}
                                magnifierBorderSize={2}
                                magnifierBorderColor="#9333ea"
                                className="object-contain max-h-full max-w-full" // Ensure image fits perfectly
                                style={{ width: "auto", height: "auto", maxHeight: "100%", maxWidth: "100%" }}
                            />
                        </div>
                    )}
                </div>

                {/* DESKTOP ACTION BUTTONS (Purple Modern UI) */}
                <div className="hidden lg:grid grid-cols-2 gap-4 mt-8">
                    <button 
                        onClick={() => addToCart(product)}
                        className="py-4 bg-white border-2 border-purple-600 text-purple-700 font-bold text-lg rounded-xl hover:bg-purple-50 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-lg active:scale-95"
                    >
                        <FiShoppingCart size={22} /> ADD TO CART
                    </button>
                    <button 
                        onClick={() => { addToCart(product); navigate("/cart"); }}
                        className="py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-800 transition flex items-center justify-center gap-2 shadow-md hover:shadow-xl active:scale-95"
                    >
                        <FiZap size={22} /> BUY NOW
                    </button>
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="lg:col-span-7 space-y-6 lg:pl-6">
            
            {/* 1. Title & Rating */}
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h1>
                
                {/* Amazon Style Stars (No Green Box) */}
                <div className="flex items-center gap-2 mt-3">
                    <div className="flex text-[#ffa41c]">
                        {renderStars(product.ratings || 4.5)}
                    </div>
                    <span className="text-blue-600 hover:text-orange-700 hover:underline cursor-pointer text-sm md:text-base font-medium ml-1">
                        {product.numOfReviews.toLocaleString()} ratings
                    </span>
                    <span className="text-gray-300 mx-1">|</span>
                    <span className="text-sm text-gray-500">Search this page</span>
                </div>
                <div className="mt-2 text-sm text-gray-500 font-medium">
                     <span className="text-black font-bold">Brand:</span> {product.brand}
                </div>
            </div>

            {/* 2. Price Section */}
            <div className="border-t border-b border-gray-100 py-4">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-medium text-red-600">-{discountPercentage}%</span>
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                </div>
                {product.mrp && (
                    <div className="text-gray-500 text-sm md:text-base mt-2 font-medium">
                        M.R.P.: <span className="line-through">₹{product.mrp.toLocaleString()}</span>
                    </div>
                )}
                <p className="text-sm text-gray-800 mt-2 font-bold">Inclusive of all taxes</p>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-bold">EMI</span> starts at ₹{Math.round(product.price / 12).toLocaleString()}/mo. No Cost EMI available.
                </p>
            </div>

            {/* 3. Offers */}
            <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <FiZap className="fill-yellow-400 text-yellow-600" /> Offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white hover:bg-gray-50">
                        <h4 className="font-bold text-sm text-gray-800 mb-1">Bank Offer</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">Upto ₹1,500 Discount on HDFC Bank Credit Card EMI Trxn. Min purchase value ₹5000</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white hover:bg-gray-50">
                        <h4 className="font-bold text-sm text-gray-800 mb-1">Partner Offer</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">Get GST invoice and save up to 28% on business purchases.</p>
                    </div>
                </div>
            </div>

            {/* 4. Specifications Grid */}
            <div className="mt-6">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm md:text-base">
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">RAM</span>
                         <span className="text-gray-900 font-bold">{product.ram} GB</span>
                     </div>
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">Storage</span>
                         <span className="text-gray-900 font-bold">{product.storage} GB</span>
                     </div>
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">Display</span>
                         <span className="text-gray-900 font-bold">{product.display}</span>
                     </div>
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">Camera</span>
                         <span className="text-gray-900 font-bold">{product.camera}</span>
                     </div>
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">Battery</span>
                         <span className="text-gray-900 font-bold">{product.battery}</span>
                     </div>
                     <div className="flex border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-medium w-32">Warranty</span>
                         <span className="text-gray-900 font-bold">1 Year Manufacturer</span>
                     </div>
                 </div>
            </div>

            {/* 5. Services Icons */}
            <div className="grid grid-cols-3 gap-4 text-center mt-6">
                 <div className="flex flex-col items-center gap-2 p-2">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <FaUndo size={20} />
                    </div>
                    <p className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">7 Days Replacement</p>
                 </div>
                 <div className="flex flex-col items-center gap-2 p-2">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <FaTruck size={20} />
                    </div>
                    <p className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">Free Delivery</p>
                 </div>
                 <div className="flex flex-col items-center gap-2 p-2">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <FaShieldAlt size={20} />
                    </div>
                    <p className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">1 Year Warranty</p>
                 </div>
            </div>

            {/* 6. Description */}
            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">About this item</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm md:text-base leading-relaxed space-y-2">
                    <li>{product.description || "Designed to impress, this smartphone combines powerful performance with stunning aesthetics."}</li>
                    <li>Experience visuals like never before with the {product.display} screen.</li>
                    <li>Capture life's best moments with the advanced {product.camera} camera system.</li>
                    <li>Power through your day with the massive {product.battery} battery.</li>
                </ul>
            </div>

            {/* 7. Ratings & Reviews Section */}
            <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Left: Rating Summary */}
                    <div className="md:col-span-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#ffa41c]">
                                {renderStars(product.ratings || 4.5)}
                            </div>
                            <span className="text-lg font-bold text-gray-900">{product.ratings?.toFixed(1) || 4.5} out of 5</span>
                        </div>
                        <p className="text-sm text-gray-500">{product.numOfReviews} global ratings</p>
                        
                        {/* Rating Bars (Visual Only) */}
                        <div className="space-y-2 mt-4">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3 text-sm">
                                    <span className="w-12 text-blue-600 hover:underline cursor-pointer">{star} star</span>
                                    <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                                        <div 
                                            className="h-full bg-[#ffa41c]" 
                                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                                        ></div>
                                    </div>
                                    <span className="w-8 text-right text-gray-500">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Review Form & List */}
                    <div className="md:col-span-8">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">Review this product</h3>
                        <p className="text-sm text-gray-600 mb-4">Share your thoughts with other customers</p>
                        
                        {/* Review Form */}
                        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex gap-3 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star} 
                                        onClick={() => setRating(star)} 
                                        className={`text-3xl transition transform hover:scale-110 focus:outline-none ${star <= rating ? "text-[#ffa41c]" : "text-gray-300"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea 
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white transition resize-none"
                                rows="3"
                                placeholder="Write your review here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button 
                                onClick={submitReviewToggle} 
                                className="mt-3 bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm w-full md:w-auto"
                            >
                                Submit Review
                            </button>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((rev, i) => (
                                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                                                {rev.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-sm text-gray-900 capitalize">{rev.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-[#ffa41c] text-xs">
                                                {renderStars(rev.rating)}
                                            </div>
                                            <span className="font-bold text-sm text-gray-800">Verified Purchase</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{rev.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500 font-medium">No reviews yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 8. SIMILAR PRODUCTS (Bottom Section) */}
            {relatedProducts.length > 0 && (
                <div className="pt-10 border-t border-gray-200 mt-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map(p => (
                            <ProductCard key={p._id} product={p} wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} />
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* --- MOBILE STICKY FOOTER BUTTONS (Purple Modern UI) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex lg:hidden z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
         <button 
           onClick={() => addToCart(product)}
           className="flex-1 bg-white text-purple-700 font-bold py-4 text-sm uppercase border-r border-gray-200 active:bg-gray-50 flex items-center justify-center gap-2"
         >
           <FiShoppingCart size={18} /> Add to Cart
         </button>
         <button 
           onClick={() => { addToCart(product); navigate("/cart"); }}
           className="flex-1 bg-purple-600 text-white font-bold py-4 text-sm uppercase active:bg-purple-700 flex items-center justify-center gap-2"
         >
           <FiZap size={18} /> Buy Now
         </button>
      </div>

    </div>
  );
};

export default ProductDetails;