import React, { useEffect } from "react";

const Sidebar = ({
  products,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRam,
  setSelectedRam,
  selectedStorage,
  setSelectedStorage,
  selectedColors,
  setSelectedColors,
  selectedCamera,
  setSelectedCamera,
  selectedBattery,
  setSelectedBattery,
  minRating,
  setMinRating,
  minDiscount,
  setMinDiscount,
  isSidebarOpen,
  setIsSidebarOpen
}) => {

  const safeProducts = Array.isArray(products) ? products : [];
  
  // Extract Unique Values
  const brands = [...new Set(safeProducts.map(p => p.brand))].sort();
  const ramOptions = [...new Set(safeProducts.map(p => p.ram))].sort((a, b) => a - b);
  const storageOptions = [...new Set(safeProducts.map(p => p.storage))].sort((a, b) => a - b);
  const colorOptions = [...new Set(safeProducts.map(p => p.color))].sort();
  
  // Camera & Battery Options
  const cameraOptions = [...new Set(safeProducts.map(p => p.camera))].filter(Boolean).sort();
  const batteryOptions = [...new Set(safeProducts.map(p => p.battery))].filter(Boolean).sort();

  // Price Calculation
  const minPrice = safeProducts.length ? Math.min(...safeProducts.map(p => p.price)) : 0;
  const maxPrice = safeProducts.length ? Math.max(...safeProducts.map(p => p.price)) : 0;

  useEffect(() => {
    // Only set defaults if range is at 0,0 (initial load)
    if (priceRange[0] === 0 && priceRange[1] === 0 && minPrice && maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, priceRange, setPriceRange]);

  // RESET ALL FILTERS FUNCTION
  const handleResetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedRam(null);
    setSelectedStorage(null);
    setSelectedColors([]);
    setSelectedCamera([]);
    setSelectedBattery([]);
    setMinRating(0);
    setMinDiscount(0);
  };

  return (
    <>
      {/* MOBILE OVERLAY (Backdrop Blur Effect) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* SIDEBAR CONTAINER */}
      <div
        className={`
          bg-white w-[280px] flex flex-col z-40 transition-transform duration-300 ease-in-out border-r border-gray-100
          fixed top-0 left-0 h-full shadow-2xl lg:shadow-none
          lg:translate-x-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:rounded-xl lg:border lg:ml-4 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        
        {/* HEADER SECTION (Sticky Title & Reset) */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
             <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Filters</h2>
             <span className="text-xs text-gray-400 font-medium">{safeProducts.length} Products</span>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={handleResetFilters}
               className="text-xs font-bold text-purple-600 hover:text-purple-800 uppercase tracking-wide transition"
             >
               Reset
             </button>
             <button 
               className="lg:hidden w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600 transition" 
               onClick={() => setIsSidebarOpen(false)}
             > ✕ </button>
          </div>
        </div>

        {/* SCROLLABLE FILTER CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-7 custom-scrollbar pb-20">
          
          {/* 1. PRICE FILTER */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-4 flex justify-between">
               Price Range
               <span className="text-purple-600 text-xs normal-case font-bold bg-purple-50 px-2 py-0.5 rounded">
                 ₹{priceRange[1].toLocaleString()}
               </span>
            </h3>
            <div className="px-2">
               <input 
                 type="range" 
                 min={minPrice} 
                 max={maxPrice} 
                 value={priceRange[1] || maxPrice}
                 onChange={(e) => setPriceRange([minPrice, Number(e.target.value)])}
                 className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
               />
               <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
                 <span>₹{minPrice.toLocaleString()}</span>
                 <span>₹{maxPrice.toLocaleString()}</span>
               </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 2. BRAND FILTER */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Brands</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition cursor-pointer"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => setSelectedBrands(
                        selectedBrands.includes(brand) 
                          ? selectedBrands.filter(b => b !== brand) 
                          : [...selectedBrands, brand]
                      )}
                    />
                  </div>
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-purple-700 transition">{brand}</span> 
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 3. CAMERA & BATTERY (Grid Layout) */}
          <div className="grid grid-cols-2 gap-4">
             {/* Camera */}
             {cameraOptions.length > 0 && (
                <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Camera</h3>
                   <div className="space-y-2">
                     {cameraOptions.map((cam) => (
                       <label key={cam} className="flex items-center cursor-pointer hover:opacity-80">
                         <input 
                           type="checkbox" 
                           className="h-3 w-3 rounded text-purple-600 focus:ring-0 cursor-pointer"
                           checked={selectedCamera.includes(cam)}
                           onChange={() => setSelectedCamera(
                             selectedCamera.includes(cam) ? selectedCamera.filter(c => c !== cam) : [...selectedCamera, cam]
                           )}
                         /> 
                         <span className="ml-2 text-xs text-gray-600">{cam}</span> 
                       </label>
                     ))}
                   </div>
                </div>
             )}

             {/* Battery */}
             {batteryOptions.length > 0 && (
                <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Battery</h3>
                   <div className="space-y-2">
                     {batteryOptions.map((bat) => (
                       <label key={bat} className="flex items-center cursor-pointer hover:opacity-80">
                         <input 
                           type="checkbox" 
                           className="h-3 w-3 rounded text-purple-600 focus:ring-0 cursor-pointer"
                           checked={selectedBattery.includes(bat)}
                           onChange={() => setSelectedBattery(
                             selectedBattery.includes(bat) ? selectedBattery.filter(b => b !== bat) : [...selectedBattery, bat]
                           )}
                         /> 
                         <span className="ml-2 text-xs text-gray-600">{bat}</span> 
                       </label>
                     ))}
                   </div>
                </div>
             )}
          </div>

          <hr className="border-gray-100" />

          {/* 4. RAM & STORAGE (Pill Style) */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Configuration</h3>
            
            {/* RAM */}
            <div className="mb-4">
               <span className="text-xs text-gray-400 font-bold mb-2 block">RAM</span>
               <div className="flex flex-wrap gap-2">
                  {ramOptions.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(selectedRam === ram ? null : ram)}
                      className={`
                        px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200
                        ${selectedRam === ram 
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:bg-purple-50'}
                      `}
                    >
                      {ram} GB
                    </button>
                  ))}
               </div>
            </div>

            {/* Storage */}
            <div>
               <span className="text-xs text-gray-400 font-bold mb-2 block">Storage</span>
               <div className="flex flex-wrap gap-2">
                  {storageOptions.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(selectedStorage === storage ? null : storage)}
                      className={`
                        px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200
                        ${selectedStorage === storage 
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:bg-purple-50'}
                      `}
                    >
                      {storage} GB
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 5. COLORS (Enhanced Badges) */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColors(
                    selectedColors.includes(color)
                      ? selectedColors.filter(c => c !== color)
                      : [...selectedColors, color]
                  )}
                  className={`
                    px-3 py-1 text-xs border rounded-full transition-all duration-200 flex items-center gap-1
                    ${selectedColors.includes(color) 
                      ? 'bg-gray-800 text-white border-gray-800 ring-2 ring-offset-1 ring-gray-300' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}
                  `}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedColors.includes(color) ? 'bg-white' : 'bg-gray-300'}`}></span>
                  {color}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* 6. OTHER FILTERS (Cards) */}
          <div>
             <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Special Filters</h3>
             <div className="space-y-2">
                {/* Rating Card */}
                <div 
                   onClick={() => setMinRating(minRating === 4 ? 0 : 4)}
                   className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${minRating === 4 ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                   <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="text-sm font-medium text-gray-700">4★ & above</span>
                   </div>
                   <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${minRating === 4 ? 'bg-yellow-500 border-yellow-500' : 'border-gray-400'}`}>
                      {minRating === 4 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                   </div>
                </div>

                {/* Discount Card */}
                <div 
                   onClick={() => setMinDiscount(minDiscount === 20 ? 0 : 20)}
                   className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${minDiscount === 20 ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                   <div className="flex items-center gap-2">
                      <span className="text-green-600 text-lg">🏷️</span>
                      <span className="text-sm font-medium text-gray-700">Min 20% Off</span>
                   </div>
                   <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${minDiscount === 20 ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                      {minDiscount === 20 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;