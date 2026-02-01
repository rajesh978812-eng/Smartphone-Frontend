import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast'; // --- Imported Toast ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders"; 
import AdminDashboard from "./pages/AdminDashboard";
import TrackOrder from "./pages/TrackOrder";
import Profile from "./pages/Profile";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login Check on Load
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) setIsLoggedIn(true);
  }, []);

  /* --- CART FUNCTIONS --- */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        toast.success(`Quantity updated for ${product.name}!`);
        return prev.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item );
      }
      toast.success(`${product.name} added to cart! 🛒`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.error("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => prev.map((item) => item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item ));
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
         toast.error("Removed from Wishlist");
         return prev.filter((item) => item._id !== product._id);
      }
      toast.success("Added to Wishlist ❤️");
      return [...prev, product];
    });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* --- TOASTER COMPONENT ADDED HERE --- */}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar 
          search={search} 
          setSearch={setSearch}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        
        <div className="flex-grow pt-20"> 
          <Routes>
            <Route path="/" element={
              <Home 
                addToCart={addToCart} 
                toggleWishlist={toggleWishlist} 
                wishlistItems={wishlistItems} 
              />
            } />
            
            <Route path="/products" element={
                <Products 
                  addToCart={addToCart} 
                  search={search} 
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                  wishlistItems={wishlistItems}
                  toggleWishlist={toggleWishlist}
                />
              } 
            />
            
            <Route path="/product/:id" element={
    <ProductDetails addToCart={addToCart} 
      wishlistItems={wishlistItems} 
      toggleWishlist={toggleWishlist} />}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/cart" element={
                <Cart 
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  setCartItems={setCartItems}
                />
              } 
            />
            
            <Route path="/wishlist" element={
                <Wishlist 
                  wishlistItems={wishlistItems}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                />
              } 
            />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* --- ADMIN ROUTE --- */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;