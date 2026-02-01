import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../services/api';
import { 
  FiUser, FiMapPin, FiLock, FiSave, FiEdit3, FiLogOut, FiCamera, 
  FiEye, FiEyeOff 
} from "react-icons/fi";

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); 
  const [loading, setLoading] = useState(false);
  
  // --- Profile Image State ---
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // --- Password Visibility States ---
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '', // Image State Added
    address: { street: '', city: '', state: '', zip: '', phone: '' }
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load User Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setUser({
             name: data.name,
             email: data.email,
             avatar: data.avatar || '', // Load saved image
             address: data.address || { street: '', city: '', state: '', zip: '', phone: '' }
        });
        if(data.avatar) setPreviewImage(data.avatar);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // --- Handle Profile Image Selection & Conversion ---
  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File Size Check (Limit to 70KB because MongoDB has limits)
      if (file.size > 70000) {
        toast.error("Image is too large! Please select an image under 70KB.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Show Preview
        setUser({ ...user, avatar: reader.result }); // Save to State for Backend
        toast.success("Photo selected! Click 'Save Changes' to apply.");
      };
    }
  };

  // Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send user data (including avatar string) to backend
      await updateUserProfile(user);
      
      toast.success("Profile Updated Successfully! 🎉");
      
      // Update LocalStorage to keep Navbar updated
      const oldInfo = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.setItem("userInfo", JSON.stringify({ ...oldInfo, name: user.name, avatar: user.avatar }));
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update Failed. Image might be too large.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        return toast.error("New passwords do not match!");
    }
    setLoading(true);
    try {
      await updateUserPassword({ 
          oldPassword: passwordData.oldPassword, 
          newPassword: passwordData.newPassword 
      });
      toast.success("Password Changed! Please Login Again.");
      handleLogout();
    } catch (error) {
      toast.error(error.response?.data?.message || "Password Update Failed");
    } finally {
        setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-[#1a1c2e] text-white py-16 pb-24 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
         <h1 className="text-3xl font-bold relative z-10">My Account</h1>
         <p className="text-gray-400 relative z-10">Manage your profile, address and security settings</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">

          {/* 2. SIDEBAR NAVIGATION */}
          <div className="md:w-1/4">
             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 text-center border-b border-gray-100 bg-gray-50/50">
                    
                    {/* --- PROFILE IMAGE SECTION --- */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white font-bold shadow-lg border-4 border-white">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        
                        {/* Hidden File Input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            className="hidden" 
                            accept="image/*"
                        />

                        {/* Camera Button */}
                        <button 
                            onClick={handleImageClick}
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-purple-50 transition transform hover:scale-110"
                            title="Change Photo"
                        >
                             <FiCamera className="text-purple-600 text-sm" />
                        </button>
                    </div>

                    <h2 className="font-bold text-gray-900 text-xl">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                
                <nav className="p-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'profile' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FiUser /> Personal Info
                    </button>
                    <button 
                        onClick={() => setActiveTab('address')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'address' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FiMapPin /> My Address
                    </button>
                    <button 
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'security' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FiLock /> Security
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-red-500 hover:bg-red-50 mt-4"
                    >
                        <FiLogOut /> Logout
                    </button>
                </nav>
             </div>
          </div>

          {/* 3. CONTENT AREA */}
          <div className="md:w-3/4">
             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 min-h-[500px]">
                
                {/* --- TAB: PROFILE INFO --- */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate} className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <FiEdit3 className="text-purple-600" /> Edit Profile
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    value={user.name}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                />
                            </div>
                        </div>
                        
                        {/* Hidden Note for Image Saving */}
                        

                        <button disabled={loading} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg flex items-center gap-2">
                            {loading ? "Saving..." : <><FiSave /> Save Changes</>}
                        </button>
                    </form>
                )}

                {/* --- TAB: ADDRESS --- */}
                {activeTab === 'address' && (
                    <form onSubmit={handleProfileUpdate} className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <FiMapPin className="text-purple-600" /> Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                <input 
                                    type="text" 
                                    placeholder="123, Main Street, Apartment 4B"
                                    value={user.address.street}
                                    onChange={(e) => setUser({...user, address: {...user.address, street: e.target.value}})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                    <input 
                                        type="text" 
                                        placeholder="Chennai"
                                        value={user.address.city}
                                        onChange={(e) => setUser({...user, address: {...user.address, city: e.target.value}})}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                                    <input 
                                        type="text" 
                                        placeholder="Tamil Nadu"
                                        value={user.address.state}
                                        onChange={(e) => setUser({...user, address: {...user.address, state: e.target.value}})}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                                    <input 
                                        type="text" 
                                        placeholder="600028"
                                        value={user.address.zip}
                                        onChange={(e) => setUser({...user, address: {...user.address, zip: e.target.value}})}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input 
                                        type="text" 
                                        placeholder="+91 9876543210"
                                        value={user.address.phone}
                                        onChange={(e) => setUser({...user, address: {...user.address, phone: e.target.value}})}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>
                        <button disabled={loading} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg flex items-center gap-2">
                            {loading ? "Saving..." : <><FiSave /> Save Address</>}
                        </button>
                    </form>
                )}

                {/* --- TAB: SECURITY (WITH EYE TOGGLE) --- */}
                {activeTab === 'security' && (
                    <form onSubmit={handlePasswordUpdate} className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                           <FiLock className="text-purple-600" /> Change Password
                        </h2>
                        <div className="space-y-6 max-w-md">
                            
                            {/* Old Password */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                                <input 
                                    type={showOldPass ? "text" : "password"} 
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50 pr-10"
                                />
                                <button type="button" onClick={() => setShowOldPass(!showOldPass)} className="absolute right-3 top-[38px] text-gray-500 hover:text-purple-600">
                                    {showOldPass ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                                <input 
                                    type={showNewPass ? "text" : "password"} 
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50 pr-10"
                                />
                                <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-[38px] text-gray-500 hover:text-purple-600">
                                    {showNewPass ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                                <input 
                                    type={showConfirmPass ? "text" : "password"} 
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50 pr-10"
                                />
                                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-[38px] text-gray-500 hover:text-purple-600">
                                    {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                        </div>
                        <button disabled={loading} className="mt-6 bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-lg flex items-center gap-2">
                            {loading ? "Updating..." : <><FiLock /> Update Password</>}
                        </button>
                    </form>
                )}
                </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;