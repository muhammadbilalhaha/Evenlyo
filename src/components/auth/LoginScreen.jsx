import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { closeLoginScreen } from '../../features/ui/uiSlice';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (dummy for now)
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./bg.png"
          alt="Event background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">

            {/* LEFT: Welcome Text */}
            <div className="text-white text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to Evenlyo
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                New here? Register now to create your client account and join us!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 text-white font-semibold px-8 py-3.5 rounded-lg transition shadow-lg shadow-pink-500/30">
                  Client Register
                </button>
                <button className="border-2 border-brand-pink text-white hover:bg-brand-pink/20 font-semibold px-8 py-3.5 rounded-lg transition">
                  Login as Vendor
                </button>
              </div>
            </div>

            {/* RIGHT: Login Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md mx-auto w-full">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                Client Login
              </h2>
              <p className="text-sm text-gray-500 text-center mb-8">
                Welcome to Evenlyo. Please enter your credentials!
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <a href="#" className="text-sm text-brand-pink hover:underline font-medium">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 text-white font-semibold py-3.5 rounded-lg transition shadow-md shadow-pink-500/25"
                >
                  Client Login
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium">
                  Or continue with accounts
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google Button */}
              <button className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;