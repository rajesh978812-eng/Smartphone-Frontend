import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // api.js Import
import { FiCheckCircle, FiX, FiSmartphone, FiCpu, FiCamera, FiBattery, FiMonitor, FiShoppingBag, FiArrowRight } from "react-icons/fi";

const Compare = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection States
  const [selectedId1, setSelectedId1] = useState('');
  const [selectedId2, setSelectedId2] = useState('');

  // Fetch Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error loading products", error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Find Selected Product Objects
  const product1 = products.find(p => p._id === selectedId1);
  const product2 = products.find(p => p._id === selectedId2);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. HERO HEADER (Matches Theme) */}
      <div className="relative bg-[#1a1c2e] text-white py-20 px-4 text-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
           <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-2 block">Tech Showdown</span>
           <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
             Compare & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Choose the Best</span>
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto">
             Confused between two phones? Put them side by side and see which one wins.
           </p>
        </div>
      </div>

      {/* 2. SELECTION AREA (Floating Cards) */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
         <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
            
            {/* VS Badge (Absolute Center) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full items-center justify-center text-white font-black text-xl shadow-lg z-10 border-4 border-white">
               VS
            </div>

            {/* Product 1 Selector */}
            <div className="space-y-4">
               <label className="block text-sm font-bold text-gray-700">Select First Phone</label>
               <div className="relative">
                 <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium cursor-pointer"
                    onChange={(e) => setSelectedId1(e.target.value)}
                    value={selectedId1}
                 >
                    <option value="">-- Choose Device 1 --</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                 </select>
                 <FiSmartphone className="absolute right-4 top-4 text-gray-400" />
               </div>
               
               {/* Product 1 Preview */}
               {product1 ? (
                  <div className="mt-6 text-center animate-fade-in-up">
                     <div className="w-48 h-48 mx-auto bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center">
                        <img src={product1.image} alt={product1.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                     </div>
                     <h3 className="font-bold text-xl text-gray-900">{product1.name}</h3>
                     <p className="text-purple-600 font-bold text-lg">₹{product1.price.toLocaleString()}</p>
                  </div>
               ) : (
                  <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl mt-6">
                     <p className="text-gray-400 text-sm">Select a phone to view</p>
                  </div>
               )}
            </div>

            {/* Mobile VS Badge */}
            <div className="md:hidden flex justify-center -my-4 relative z-10">
               <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">VS</div>
            </div>

            {/* Product 2 Selector */}
            <div className="space-y-4">
               <label className="block text-sm font-bold text-gray-700">Select Second Phone</label>
               <div className="relative">
                 <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium cursor-pointer"
                    onChange={(e) => setSelectedId2(e.target.value)}
                    value={selectedId2}
                 >
                    <option value="">-- Choose Device 2 --</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                 </select>
                 <FiSmartphone className="absolute right-4 top-4 text-gray-400" />
               </div>

               {/* Product 2 Preview */}
               {product2 ? (
                  <div className="mt-6 text-center animate-fade-in-up">
                     <div className="w-48 h-48 mx-auto bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center">
                        <img src={product2.image} alt={product2.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                     </div>
                     <h3 className="font-bold text-xl text-gray-900">{product2.name}</h3>
                     <p className="text-purple-600 font-bold text-lg">₹{product2.price.toLocaleString()}</p>
                  </div>
               ) : (
                  <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl mt-6">
                     <p className="text-gray-400 text-sm">Select a phone to view</p>
                  </div>
               )}
            </div>

         </div>
      </div>

      {/* 3. COMPARISON TABLE (Only shows if both selected) */}
      {product1 && product2 && (
         <div className="max-w-5xl mx-auto px-4 mt-16 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Detailed Comparison</h3>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-gray-100">
                     
                     {/* 1. Price */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 w-1/3 text-gray-500 font-medium flex items-center gap-2"><FiShoppingBag /> Price</td>
                        <td className={`p-4 md:p-6 w-1/3 font-bold text-lg ${product1.price < product2.price ? 'text-green-600' : 'text-gray-900'}`}>
                           ₹{product1.price.toLocaleString()}
                        </td>
                        <td className={`p-4 md:p-6 w-1/3 font-bold text-lg ${product2.price < product1.price ? 'text-green-600' : 'text-gray-900'}`}>
                           ₹{product2.price.toLocaleString()}
                        </td>
                     </tr>

                     {/* 2. Brand */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium">Brand</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product1.brand}</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product2.brand}</td>
                     </tr>

                     {/* 3. Display */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium flex items-center gap-2"><FiMonitor /> Display</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product1.display}</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product2.display}</td>
                     </tr>

                     {/* 4. RAM */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium flex items-center gap-2"><FiCpu /> RAM</td>
                        <td className={`p-4 md:p-6 font-bold ${product1.ram > product2.ram ? 'text-green-600' : 'text-gray-800'}`}>
                           {product1.ram} GB
                        </td>
                        <td className={`p-4 md:p-6 font-bold ${product2.ram > product1.ram ? 'text-green-600' : 'text-gray-800'}`}>
                           {product2.ram} GB
                        </td>
                     </tr>

                     {/* 5. Storage */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium">Storage</td>
                        <td className={`p-4 md:p-6 font-bold ${product1.storage > product2.storage ? 'text-green-600' : 'text-gray-800'}`}>
                           {product1.storage} GB
                        </td>
                        <td className={`p-4 md:p-6 font-bold ${product2.storage > product1.storage ? 'text-green-600' : 'text-gray-800'}`}>
                           {product2.storage} GB
                        </td>
                     </tr>

                     {/* 6. Camera */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium flex items-center gap-2"><FiCamera /> Camera</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product1.camera}</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product2.camera}</td>
                     </tr>

                     {/* 7. Battery */}
                     <tr className="hover:bg-purple-50/30 transition">
                        <td className="p-4 md:p-6 text-gray-500 font-medium flex items-center gap-2"><FiBattery /> Battery</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product1.battery}</td>
                        <td className="p-4 md:p-6 font-semibold text-gray-800">{product2.battery}</td>
                     </tr>

                     {/* Action Buttons */}
                     <tr className="bg-gray-50">
                        <td className="p-4 md:p-6"></td>
                        <td className="p-4 md:p-6">
                           <button 
                             onClick={() => addToCart(product1)}
                             className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
                           >
                              Add {product1.name}
                           </button>
                        </td>
                        <td className="p-4 md:p-6">
                           <button 
                             onClick={() => addToCart(product2)}
                             className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
                           >
                              Add {product2.name}
                           </button>
                        </td>
                     </tr>

                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* 4. CTA IF NOT SELECTED */}
      {(!product1 || !product2) && (
         <div className="text-center mt-20 opacity-50">
            <FiSmartphone className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400">Select two devices to unlock the comparison matrix.</p>
         </div>
      )}

    </div>
  );
};

export default Compare;