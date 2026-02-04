import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaTimes, FaMobileAlt, FaGamepad, FaCamera, FaBatteryFull } from 'react-icons/fa';

const SmartFinder = ({ products, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: '',
    useCase: '',
    brand: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  // படி 1: பட்ஜெட்டைத் தேர்ந்தெடுப்பது
  const handleBudget = (range) => {
    setPreferences({ ...preferences, budget: range });
    setStep(2);
  };

  // படி 2: பயன்பாட்டைத் (Use Case) தேர்ந்தெடுப்பது
  const handleUseCase = (type) => {
    setPreferences({ ...preferences, useCase: type });
    setStep(3);
  };

  // படி 3: பிராண்ட் மற்றும் முடிவு (Result)
  const handleBrand = (brand) => {
    const finalPreferences = { ...preferences, brand };
    setPreferences(finalPreferences);
    findMatches(finalPreferences);
    setStep(4);
  };

  // --- THE MAIN LOGIC (மூளை) ---
  const findMatches = (prefs) => {
    let filtered = products.filter(product => {
      // 1. Price Filter
      let priceMatch = false;
      if (prefs.budget === 'low') priceMatch = product.price < 15000;
      else if (prefs.budget === 'mid') priceMatch = product.price >= 15000 && product.price <= 30000;
      else if (prefs.budget === 'high') priceMatch = product.price > 30000;
      
      // 2. Brand Filter
      let brandMatch = prefs.brand === 'Any' ? true : product.brand.toLowerCase() === prefs.brand.toLowerCase();

      return priceMatch && brandMatch;
    });

    // 3. Use Case Sorting (Optional Logic)
    if (prefs.useCase === 'gaming') {
        // Gaming என்றால் RAM அதிகமாக உள்ளதை முதலில் காட்டு
        filtered.sort((a, b) => b.ram - a.ram);
    } else if (prefs.useCase === 'camera') {
        // Camera என்றால் கேமரா சிறப்பானதை காட்டு (Assuming logic)
        filtered.sort((a, b) => b.price - a.price); // Usually higher price = better camera
    }

    setRecommendations(filtered.slice(0, 3)); // Top 3 results
  };

  const resetFinder = () => {
    setStep(1);
    setPreferences({ budget: '', useCase: '', brand: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-bounce-in">
        
        {/* Header */}
        <div className="bg-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <FaRobot size={24} />
                <h2 className="text-lg font-bold">AI Smartphone Finder</h2>
            </div>
            <button onClick={onClose} className="hover:bg-purple-700 p-1 rounded-full"><FaTimes /></button>
        </div>

        {/* Body */}
        <div className="p-6 min-h-[300px] flex flex-col justify-center">
            
            {/* --- STEP 1: BUDGET --- */}
            {step === 1 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">What is your Budget? 💰</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => handleBudget('low')} className="finder-btn">Budget Friendly (Under ₹15,000)</button>
                        <button onClick={() => handleBudget('mid')} className="finder-btn">Mid Range (₹15,000 - ₹30,000)</button>
                        <button onClick={() => handleBudget('high')} className="finder-btn">Flagship / Premium (Above ₹30,000)</button>
                    </div>
                </div>
            )}

            {/* --- STEP 2: USE CASE --- */}
            {step === 2 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">What is your primary use? 📱</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleUseCase('gaming')} className="finder-card">
                            <FaGamepad size={30} className="text-purple-600 mb-2" /> Gaming
                        </button>
                        <button onClick={() => handleUseCase('camera')} className="finder-card">
                            <FaCamera size={30} className="text-pink-600 mb-2" /> Photography
                        </button>
                        <button onClick={() => handleUseCase('battery')} className="finder-card">
                            <FaBatteryFull size={30} className="text-green-600 mb-2" /> Battery Life
                        </button>
                        <button onClick={() => handleUseCase('all')} className="finder-card">
                            <FaMobileAlt size={30} className="text-blue-600 mb-2" /> All Rounder
                        </button>
                    </div>
                </div>
            )}

            {/* --- STEP 3: BRAND --- */}
            {step === 3 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">Any Brand Preference? 🏷️</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleBrand('Samsung')} className="finder-btn">Samsung</button>
                        <button onClick={() => handleBrand('Apple')} className="finder-btn">Apple (iPhone)</button>
                        <button onClick={() => handleBrand('Xiaomi')} className="finder-btn">Xiaomi / Redmi</button>
                        <button onClick={() => handleBrand('Any')} className="finder-btn bg-gray-800 text-white hover:bg-black">Any Brand</button>
                    </div>
                </div>
            )}

            {/* --- STEP 4: RESULTS --- */}
            {step === 4 && (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Here are the Best Matches! 🎉</h3>
                    
                    {recommendations.length > 0 ? (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {recommendations.map(product => (
                                <div key={product._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border hover:shadow-md transition cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                                    <img src={product.images?.[0]?.url || product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="text-left">
                                        <h4 className="font-bold text-sm text-gray-900">{product.name}</h4>
                                        <p className="text-purple-600 font-bold">₹{product.price}</p>
                                    </div>
                                    <button className="ml-auto text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">View</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 py-4">
                            <p>Oops! No phones found in this specific range.</p>
                            <button onClick={resetFinder} className="mt-4 text-purple-600 font-bold underline">Try Again</button>
                        </div>
                    )}
                    
                    <button onClick={onClose} className="mt-6 w-full py-3 bg-gray-200 rounded-xl font-bold hover:bg-gray-300">Close</button>
                </div>
            )}
        </div>
      </div>
      
      {/* Styles for this component only */}
      <style>{`
        .finder-btn { @apply p-3 border-2 border-gray-100 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all; }
        .finder-card { @apply flex flex-col items-center justify-center p-4 border-2 border-gray-100 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all shadow-sm; }
      `}</style>
    </div>
  );
};

export default SmartFinder;