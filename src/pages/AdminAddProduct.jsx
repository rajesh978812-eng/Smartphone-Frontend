import React, { useState } from 'react';
import { createProduct } from '../services/api';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', mrp: '', color: '',
    ram: '', storage: '', display: '', camera: '', battery: '', // Default மதிப்புகளை நீக்கிவிட்டேன், நீங்களே டைப் செய்யலாம்
    image: '', description: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert("Product Added Successfully! 🎉");
      setFormData({ name: '', brand: '', price: '', mrp: '', color: '', ram: '', storage: '', display: '', camera: '', battery: '', image: '', description: '' });
    } catch (error) {
      alert("Failed to add product. Check console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Smartphone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Product Name (e.g., iPhone 15)" onChange={handleChange} value={formData.name} className="p-3 border rounded-lg w-full" required />
          <input name="brand" placeholder="Brand (e.g., Apple)" onChange={handleChange} value={formData.brand} className="p-3 border rounded-lg w-full" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" placeholder="Selling Price (₹)" onChange={handleChange} value={formData.price} className="p-3 border rounded-lg w-full" required />
          <input name="mrp" type="number" placeholder="MRP Price (₹)" onChange={handleChange} value={formData.mrp} className="p-3 border rounded-lg w-full" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <input name="ram" type="number" placeholder="RAM (GB)" onChange={handleChange} value={formData.ram} className="p-3 border rounded-lg w-full" required />
            <input name="storage" type="number" placeholder="Storage (GB)" onChange={handleChange} value={formData.storage} className="p-3 border rounded-lg w-full" required />
        </div>

        {/* --- புதிதாக சேர்க்கப்பட்ட Camera & Battery Inputs --- */}
        <div className="grid grid-cols-2 gap-4">
            <input name="camera" placeholder="Camera (e.g., 50MP)" onChange={handleChange} value={formData.camera} className="p-3 border rounded-lg w-full" required />
            <input name="battery" placeholder="Battery (e.g., 5000mAh)" onChange={handleChange} value={formData.battery} className="p-3 border rounded-lg w-full" required />
        </div>

        <input name="image" placeholder="Image URL (Right click image -> Copy Address)" onChange={handleChange} value={formData.image} className="p-3 border rounded-lg w-full" required />
        <p className="text-xs text-gray-500">Tip: Use an image link from Google or your assets folder path.</p>

        <textarea name="description" placeholder="Product Description..." onChange={handleChange} value={formData.description} className="p-3 border rounded-lg w-full h-24" required />

        <div className="grid grid-cols-2 gap-4">
            <input name="color" placeholder="Color" onChange={handleChange} value={formData.color} className="p-3 border rounded-lg w-full" required />
            <input name="display" placeholder="Display (e.g., 6.1 inch OLED)" onChange={handleChange} value={formData.display} className="p-3 border rounded-lg w-full" required />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition">
          🚀 Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;