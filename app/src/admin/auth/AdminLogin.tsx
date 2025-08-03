import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiEye, 
  HiEyeOff, 
  HiLockClosed, 
  HiMail,
  HiShieldCheck,
  HiDeviceMobile
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  twoFactorCode?: string;
  rememberMe: boolean;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    twoFactorCode: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (requires2FA && (!formData.twoFactorCode || formData.twoFactorCode.length !== 6)) {
      setError('Please enter a valid 6-digit authentication code');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account is temporarily locked due to multiple failed attempts');
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          twoFactorCode: formData.twoFactorCode,
          rememberMe: formData.rememberMe
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requires2FA && !requires2FA) {
          setRequires2FA(true);
          setError('Please enter your 2FA code sent to your device');
        } else {
          // Store authentication token
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user));
          
          // Navigate to admin dashboard
          navigate('/admin/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
        setLoginAttempts(prev => prev + 1);
        
        // Lock account after 5 failed attempts
        if (loginAttempts >= 4) {
          setIsLocked(true);
          setError('Account locked due to multiple failed attempts. Please contact support.');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/admin/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <HiShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">
            Secure access to Akibeks Construction admin panel
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <HiLockClosed className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">
              This is a secure admin area. All activities are logged and monitored.
            </p>
          </div>
        </div>

        {/* Login Form */}
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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="admin@akibeks.co.ke"
                disabled={isLoading}
              />
            </div>
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? (
                  <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* 2FA Code Field */}
          {requires2FA && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 mb-2">
                Two-Factor Authentication Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiDeviceMobile className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="twoFactorCode"
                  name="twoFactorCode"
                  type="text"
                  maxLength={6}
                  value={formData.twoFactorCode}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-center tracking-widest text-lg"
                  placeholder="000000"
                  disabled={isLoading}
                />
              </div>
            </motion.div>
          )}

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isLocked}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${
              isLoading || isLocked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : requires2FA ? (
              'Verify & Sign In'
            ) : (
              'Sign In to Admin Portal'
            )}
          </button>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-red-600 hover:text-red-500 transition-colors"
              disabled={isLoading}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        {/* Security Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <HiShieldCheck className="w-4 h-4 mr-1" />
            Protected by enterprise-grade security
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;