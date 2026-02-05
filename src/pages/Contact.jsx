import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; // Better alerts
import { FiMapPin, FiPhone, FiMail, FiSend, FiClock, FiMessageCircle, FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // FAQ Toggle State
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
        toast.success("Message Sent Successfully! We will contact you soon. 🚀");
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. HERO SECTION (Matches Footer/Navbar Color) */}
      <div className="relative bg-[#1a1c2e] text-white py-20 md:py-28 text-center overflow-hidden">
         {/* Abstract Background Shapes */}
         <div className="absolute top-0 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 animate-pulse"></div>
         <div className="absolute bottom-0 right-10 w-64 h-64 bg-pink-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 animate-pulse delay-1000"></div>
         
         <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Have a question about a product, order, or just want to say hi? <br className="hidden md:block"/>
              We'd love to hear from you. Our team is ready to assist you 24/7.
            </p>
         </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: CONTACT INFO CARDS */}
            <div className="space-y-6">
                
                {/* Info Card */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FiMessageCircle className="text-purple-600" /> Contact Details
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-xl flex-shrink-0">
                                <FiMail />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">Email Us</p>
                                <p className="text-gray-800 font-medium hover:text-purple-600 transition cursor-pointer">support@smartphonestore.com</p>
                                <p className="text-gray-800 font-medium hover:text-purple-600 transition cursor-pointer">sales@smartphonestore.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 text-xl flex-shrink-0">
                                <FiPhone />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">Call Us</p>
                                <p className="text-gray-800 font-medium">+91 87789 32087</p>
                                <p className="text-xs text-gray-400">Mon - Sat, 9am - 6pm</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                                <FiMapPin />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">Visit Us</p>
                                <p className="text-gray-800 font-medium">123, Muthaliyar Street, <br/>  Thurgalaya Road, Thiruvarur - 610001.</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-green-500 transition transform hover:scale-110"><FaWhatsapp size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-pink-600 transition transform hover:scale-110"><FaInstagram size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"><FaTwitter size={24} /></a>
                    </div>
                </div>

                {/* Business Hours (New Feature) */}
                <div className="bg-[#1a1c2e] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FiClock /> Business Hours
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex justify-between border-b border-gray-700 pb-2"><span>Monday - Friday</span> <span>9:00 AM - 8:00 PM</span></li>
                        <li className="flex justify-between border-b border-gray-700 pb-2"><span>Saturday</span> <span>10:00 AM - 6:00 PM</span></li>
                        <li className="flex justify-between text-pink-400 font-bold"><span>Sunday</span> <span>Closed</span></li>
                    </ul>
                </div>
            </div>

            {/* MIDDLE COLUMN: CONTACT FORM */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                                <input 
                                    type="text" name="name" required 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                                    placeholder="John Doe"
                                    value={formData.name} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <input 
                                    type="email" name="email" required 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                                    placeholder="john@example.com"
                                    value={formData.email} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                            <input 
                                type="text" name="subject" required 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                                placeholder="Order Inquiry / Product Support"
                                value={formData.subject} onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                            <textarea 
                                name="message" rows="5" required 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition resize-none"
                                placeholder="How can we help you today?"
                                value={formData.message} onChange={handleChange}
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                <> <FiSend /> Send Message </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* 3. MAP & FAQ SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            
            {/* GOOGLE MAP */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[400px]">
               <iframe 
                 title="map"
                 src="https://maps.google.com/maps?q=Muthaliyar+Street,+Thiruvarur,+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, borderRadius: '1rem' }} 
                 allowFullScreen="" 
                 loading="lazy"
               ></iframe>
            </div>

            {/* FAQ ACCORDION (Modern) */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <FiHelpCircle className="text-purple-600" /> Frequently Asked Questions
               </h3>
               
               <div className="space-y-4">
                 {[
                   { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, COD is available for most locations within India. You can check availability by entering your pincode at checkout." },
                   { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for defective items. Please ensure the product is unused and has original tags." },
                   { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping is available for select cities and takes 1-2 days." },
                   { q: "Are the products 100% original?", a: "Absolutely! We source directly from manufacturers (Apple, Samsung, etc.) to ensure 100% authenticity." }
                 ].map((item, index) => (
                   <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                     <button 
                       onClick={() => toggleFaq(index)}
                       className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition font-bold text-gray-800 text-left"
                     >
                       {item.q}
                       <FiChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-purple-600' : 'text-gray-400'}`} />
                     </button>
                     <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 p-4 border-t border-gray-200' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                       <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;