import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Eye Icon State
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Backend URL சரியாக உள்ளதா என உறுதி செய்யவும்
      const res = await axios.post('https://smartphone-backend-rgjm.onrender.com/api/users/forgot-password', {
        email,
        newPassword
      });

      setMessage('Password Reset Successful! Redirecting to Login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Check Backend Route.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <FaLock className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and new password below.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleReset}>
          <div className="rounded-md shadow-sm -space-y-px">
            
            {/* Email Input */}
            <div className="mb-4">
              <label className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* New Password Input with FIXED EYE ICON */}
            <div className="mb-4">
              <label className="sr-only">New Password</label>
              <div className="relative">
                {/* Left Lock Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <FaLock className="text-gray-400" />
                </div>
                
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  // FIX 1: pl-10 (Left Padding) & pr-12 (Right Padding increased)
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                
                {/* EYE BUTTON (FIX 2: z-20 added to stay on top) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 cursor-pointer z-20"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          {message && <p className="text-green-600 text-sm text-center font-bold bg-green-50 p-2 rounded">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center font-bold bg-red-50 p-2 rounded">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Reset Password
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Link to="/login" className="flex items-center justify-center gap-2 font-medium text-purple-600 hover:text-purple-500">
               <FaArrowLeft size={12}/> Back to Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;