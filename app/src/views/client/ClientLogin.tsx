import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiMail, HiEye, HiEyeOff, HiShieldCheck, HiLockClosed,
  HiUser, HiPhone, HiKey, HiFingerPrint, HiDeviceMobile
} from 'react-icons/hi';
import { useAuthContext } from '../../lib';
import toast from 'react-hot-toast';

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/client/dashboard');
    }
  }, [user, navigate]);

  // Handle account lockout timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && lockTimeRemaining > 0) {
      timer = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTimeRemaining]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast.error(`Account locked. Try again in ${Math.ceil(lockTimeRemaining / 60)} minutes.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Mock API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate login failure for demo
      if (formData.email === 'demo@fail.com') {
        throw new Error('Invalid credentials');
      }

      toast.success('Login successful! Welcome to your dashboard.');
      navigate('/client/dashboard');
    } catch (error) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimeRemaining(1800); // 30 minutes
        toast.error('Too many failed attempts. Account locked for 30 minutes.');
      } else {
        toast.error(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg"
          >
            <HiUser className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Portal</h1>
          <p className="text-gray-600">Access your projects and manage your account</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Account Lockout Warning */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <HiLockClosed className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Account Temporarily Locked</h3>
                  <p className="text-sm text-red-600 mt-1">
                    Too many failed login attempts. Try again in {formatTime(lockTimeRemaining)}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  disabled={loading || isLocked}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                  disabled={loading || isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading || isLocked}
                >
                  {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  disabled={loading || isLocked}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/client/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <HiShieldCheck className="w-4 h-4 mr-2" />
                  Sign In to Portal
                </>
              )}
            </button>

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && loginAttempts < 5 && !isLocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <HiKey className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-yellow-700">
                    {loginAttempts} failed attempt{loginAttempts !== 1 ? 's' : ''}. 
                    {5 - loginAttempts} remaining before account lock.
                  </p>
                </div>
              </motion.div>
            )}
          </form>

          {/* Additional Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              {/* Quick Access Features */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">New to our platform?</p>
                <Link
                  to="/client/register"
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  <HiUser className="w-4 h-4 mr-1" />
                  Create Client Account
                </Link>
              </div>

              {/* Help Links */}
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <Link to="/support" className="hover:text-gray-700 transition-colors">
                  Support
                </Link>
                <Link to="/contact" className="hover:text-gray-700 transition-colors">
                  Contact
                </Link>
                <Link to="/privacy" className="hover:text-gray-700 transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center text-sm text-gray-500 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
            <HiFingerPrint className="w-4 h-4 mr-2 text-green-500" />
            <span>Your connection is secured with 256-bit SSL encryption</span>
          </div>
        </motion.div>

        {/* Alternative Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help Accessing Your Account?</h3>
            <div className="space-y-2">
              <Link
                to="/client/account-recovery"
                className="block text-sm text-blue-600 hover:text-blue-700"
              >
                Account Recovery Center
              </Link>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <HiPhone className="w-4 h-4 mr-1" />
                <span>Call Support: +254-700-000000</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Main Site */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-6 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Main Website
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientLogin;