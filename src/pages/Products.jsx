import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api"; 

const Products = ({ addToCart, search, isSidebarOpen, setIsSidebarOpen, wishlistItems, toggleWishlist }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- PAGINATION STATE (புதிதாக சேர்க்கப்பட்டது) ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // ஒரு பக்கத்திற்கு 12 பொருட்கள்

  // --- FILTER STATES ---
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchProducts();
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products", error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.brand.toLowerCase().includes(search.toLowerCase()) || 
                          product.color.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRam = selectedRam === null || product.ram === selectedRam;
    const matchesStorage = selectedStorage === null || product.storage === selectedStorage;
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    const discount = product.mrp ? ((product.mrp - product.price) / product.mrp) * 100 : 0;
    const matchesDiscount = discount >= minDiscount;
    const productRating = product.ratings || 0; // ratings இல்லையென்றால் 0 என வைக்கவும்
    const matchesRating = productRating >= minRating;
    const matchesCamera = selectedCamera.length === 0 || (product.camera && selectedCamera.includes(product.camera));
    const matchesBattery = selectedBattery.length === 0 || (product.battery && selectedBattery.includes(product.battery));

    return matchesSearch && matchesBrand && matchesPrice && matchesRam && 
           matchesStorage && matchesColor && matchesDiscount && matchesRating &&
           matchesCamera && matchesBattery;
  });

  // --- PAGINATION LOGIC (Filter ஆன பிறகு கணக்கிட வேண்டும்) ---
  
  // 1. Filter மாறினால் Page 1-க்கு செல்ல வேண்டும்
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedBrands, selectedRam, selectedStorage, selectedColors, minRating, minDiscount, selectedCamera, selectedBattery, priceRange]);

  // 2. Index Calculation
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // 3. Current Page Products (Slice method)
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 4. Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 5. Total Pages Calculation
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // --- RESET FILTERS ---
  const clearFilter = (type, value) => {
    if (type === 'rating') setMinRating(0);
    if (type === 'camera') setSelectedCamera(prev => prev.filter(c => c !== value));
    if (type === 'battery') setSelectedBattery(prev => prev.filter(b => b !== value));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 relative"> 
      
      <Sidebar
        products={products}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedRam={selectedRam}
        setSelectedRam={setSelectedRam}
        selectedStorage={selectedStorage}
        setSelectedStorage={setSelectedStorage}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        minRating={minRating}
        setMinRating={setMinRating}
        minDiscount={minDiscount}
        setMinDiscount={setMinDiscount}
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        selectedBattery={selectedBattery}
        setSelectedBattery={setSelectedBattery}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                Mobile Phones
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  {filteredProducts.length} items
                </span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Check out the latest smartphones with best offers.</p>
            </div>
            
            <button 
              className="lg:hidden w-full md:w-auto bg-white border border-gray-300 hover:border-purple-500 text-gray-700 px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition font-medium"
              onClick={() => setIsSidebarOpen(true)}
            >
              Filter & Sort
            </button>
          </div>

          {/* ACTIVE FILTERS UI */}
          {(minRating > 0 || selectedCamera.length > 0 || selectedBattery.length > 0) && (
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
               <span className="text-sm font-semibold text-gray-500 self-center">Active Filters:</span>
               {minRating > 0 && (
                 <button onClick={() => clearFilter('rating')} className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-100 transition">
                   ★ {minRating}+ <span className="ml-1 text-yellow-600 font-bold">×</span>
                 </button>
               )}
               {selectedCamera.map(c => (
                 <button key={c} onClick={() => clearFilter('camera', c)} className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition">
                   📷 {c} <span className="ml-1 text-blue-600 font-bold">×</span>
                 </button>
               ))}
               {selectedBattery.map(b => (
                 <button key={b} onClick={() => clearFilter('battery', b)} className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-100 transition">
                   🔋 {b} <span className="ml-1 text-green-600 font-bold">×</span>
                 </button>
               ))}
            </div>
          )}

          {/* PRODUCT GRID */}
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow border border-gray-100 animate-pulse h-[380px] flex flex-col">
                     <div className="bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                     <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  </div>
                ))}
             </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
               <div className="text-6xl mb-4 opacity-50">🔍</div>
               <h3 className="text-xl text-gray-800 font-bold mb-2">No products found</h3>
               <p className="text-gray-500 max-w-md mx-auto">Try clearing filters.</p>
               <button onClick={() => window.location.reload()} className="mt-6 text-purple-600 font-semibold hover:underline">Clear all filters</button>
            </div>
          ) : (
            <>
              {/* Products Display - Only Current Page Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    addToCart={addToCart} 
                    wishlistItems={wishlistItems}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>

              {/* --- PAGINATION CONTROLS (Flipkart Style) --- */}
              {filteredProducts.length > productsPerPage && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  
                  {/* PREVIOUS BUTTON */}
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                  >
                    Previous
                  </button>

                  {/* PAGE NUMBERS */}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition ${
                        currentPage === i + 1 
                          ? "bg-purple-600 text-white shadow-lg scale-110" 
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {/* NEXT BUTTON */}
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;