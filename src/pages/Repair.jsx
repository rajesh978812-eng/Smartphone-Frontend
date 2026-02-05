import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiTool, FiSmartphone, FiBattery, FiCpu, FiDroplet, FiCheckCircle, FiClock, FiCalendar } from "react-icons/fi";

const Repair = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    model: '',
    issue: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend தேவையில்லை, சும்மா Popup காட்டலாம்
    toast.success(`Service Request Booked for ${formData.model}! 🛠️`);
    setFormData({ name: '', phone: '', model: '', issue: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative bg-[#1a1c2e] text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-30"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
             Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mobile Repair</span>
           </h1>
           <p className="text-gray-400 text-lg mb-8">
             Broken Screen? Battery Issues? We fix it all. Book an appointment online and skip the queue.
           </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 2. SERVICES LIST (Cards) */}
            <div className="grid grid-cols-2 gap-4">
                <ServiceCard icon={<FiSmartphone />} title="Screen Replacement" price="₹1,200+" />
                <ServiceCard icon={<FiBattery />} title="Battery Issues" price="₹800+" />
                <ServiceCard icon={<FiDroplet />} title="Water Damage" price="₹1,500+" />
                <ServiceCard icon={<FiCpu />} title="Software/ Motherboard" price="₹500+" />
            </div>

            {/* 3. BOOKING FORM */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FiCalendar className="text-purple-600" /> Book Appointment
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                            <input 
                                required
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                            <input 
                                required
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="+91 98765..."
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Device Model</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="e.g., iPhone 13, Samsung S21"
                            value={formData.model}
                            onChange={(e) => setFormData({...formData, model: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Issue Description</label>
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
                            value={formData.issue}
                            onChange={(e) => setFormData({...formData, issue: e.target.value})}
                        >
                            <option value="">Select Issue</option>
                            <option value="Screen">Broken Screen</option>
                            <option value="Battery">Battery Draining</option>
                            <option value="Charging">Charging Port</option>
                            <option value="Other">Other Issue</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Preferred Date</label>
                        <input 
                            required
                            type="date" 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>

                    <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg flex justify-center items-center gap-2 mt-4">
                        <FiCheckCircle /> Confirm Booking
                    </button>
                </form>
            </div>
        </div>

        {/* 4. PROCESS STEPS */}
        <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Step number="1" title="Book Online" desc="Select your device and issue details." />
                <Step number="2" title="Drop / Pickup" desc="Visit store or choose home pickup." />
                <Step number="3" title="Fast Repair" desc="Get your device fixed in 60 mins." />
            </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---
const ServiceCard = ({ icon, title, price }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition hover:-translate-y-1 group">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition">
            {icon}
        </div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">Starts from <span className="font-bold text-gray-900">{price}</span></p>
    </div>
);

const Step = ({ number, title, desc }) => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-white border-4 border-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">
            {number}
        </div>
        <h4 className="font-bold text-lg text-gray-900">{title}</h4>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">{desc}</p>
    </div>
);

export default Repair;