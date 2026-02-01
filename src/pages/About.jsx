import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiUsers, FiAward, FiTruck, FiHeadphones, FiShield } from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. HERO SECTION (Matches Navbar/Footer Color) */}
      <div className="relative bg-[#1a1c2e] text-white py-20 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Revolutionizing</span> <br/>
            the Mobile Experience.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Smartphone Store is not just a marketplace; it's a destination for tech enthusiasts. 
            We bring the latest innovation directly to your hands with trust and premium service.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg hover:shadow-purple-500/50">
              Explore Store
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold transition border border-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS SECTION (Floating Cards) */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Happy Customers", value: "15K+", icon: <FiUsers /> },
            { label: "Premium Products", value: "500+", icon: <FiAward /> },
            { label: "Years of Trust", value: "5+", icon: <FiShield /> },
            { label: "Cities Covered", value: "100+", icon: <FiTruck /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-purple-600 text-3xl mb-2 flex justify-center">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OUR MISSION & VISION */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute inset-0 bg-purple-600 rounded-3xl rotate-3 opacity-10"></div>
             <img 
               src="/About1.jpeg" 
               alt="Team" 
               className="relative rounded-3xl shadow-2xl w-full object-cover transform -rotate-2 hover:rotate-0 transition duration-500"
             />
          </div>
          <div>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
               Driven by Passion, <br/>Defined by Quality.
             </h2>
             <p className="text-gray-600 text-lg leading-relaxed mb-6">
               Founded in 2024, <b>Smartphone Store</b> started with a simple mission: to make premium technology accessible to everyone without the hassle.
             </p>
             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               We believe that buying a phone should be an exciting experience, not a stressful one. That's why we meticulously select every product, ensure secure packaging, and provide a warranty that you can trust.
             </p>
             
             <ul className="space-y-4">
               {[
                 "100% Original Products Guaranteed",
                 "Secure Payment & Fast Shipping",
                 "Dedicated 24/7 Customer Support"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                   <FiCheckCircle className="text-green-500 text-xl" /> {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* 4. WHY CHOOSE US (Features) */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
            <p className="text-gray-600">We don't just sell phones; we build relationships. Here is why thousands of customers prefer us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
               <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <FiAward />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Products</h3>
               <p className="text-gray-500 leading-relaxed">
                 We source directly from brands to ensure you get 100% genuine products with original warranty. No fakes, ever.
               </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
               <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <FiTruck />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Express Delivery</h3>
               <p className="text-gray-500 leading-relaxed">
                 Get your dream phone delivered to your doorstep safely and quickly. We offer free shipping on all orders.
               </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
               <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                 <FiHeadphones />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
               <p className="text-gray-500 leading-relaxed">
                 Confused about specs? Our tech experts are here to help you choose the perfect device for your needs.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BRANDS WE LOVE (Extra Feature) */}
      <div className="py-16 bg-white overflow-hidden">
         <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted By Top Brands</p>
         <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Logos for Demo */}
            <span className="text-3xl font-bold text-gray-800">Apple</span>
            <span className="text-3xl font-bold text-gray-800">Samsung</span>
            <span className="text-3xl font-bold text-gray-800">OnePlus</span>
            <span className="text-3xl font-bold text-gray-800">Xiaomi</span>
            <span className="text-3xl font-bold text-gray-800">Google</span>
            <span className="text-3xl font-bold text-gray-800">Realme</span>
         </div>
      </div>

      {/* 6. CALL TO ACTION (Matches Footer Theme) */}
      <div className="bg-[#1a1c2e] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
           {/* Decorative */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-purple-500/10 blur-3xl rounded-full"></div>
           
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
             Ready to upgrade your tech?
           </h2>
           <p className="text-gray-400 mb-8 text-lg relative z-10">
             Join thousands of happy customers and experience the future of mobile shopping today.
           </p>
           <Link 
             to="/products" 
             className="relative z-10 inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-transform"
           >
             Shop Now
           </Link>
        </div>
      </div>

    </div>
  );
};

export default About;