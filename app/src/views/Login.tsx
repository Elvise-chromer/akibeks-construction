import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEye, 
  FiEyeOff, 
  FiMail, 
  FiLock, 
  FiLogIn, 
  FiUserPlus,
  FiCheck,
  FiX,
  FiArrowLeft,
  FiShield,
  FiUser
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../lib/AuthContext';

// Form validation schemas
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false)
});

const twoFASchema = yup.object().shape({
  token: yup
    .string()
    .length(6, '2FA code must be 6 digits')
    .matches(/^\d+$/, '2FA code must contain only numbers')
    .required('2FA code is required')
});

type LoginFormData = yup.InferType<typeof loginSchema>;
type TwoFAFormData = yup.InferType<typeof twoFASchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [tempLoginData, setTempLoginData] = useState<any>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });

  const {
    register: register2FA,
    handleSubmit: handleSubmit2FA,
    formState: { errors: errors2FA },
    setValue: setValue2FA,
    watch: watch2FA
  } = useForm<TwoFAFormData>({
    resolver: yupResolver(twoFASchema),
    mode: 'onChange'
  });

  const watchedFields = watch();
  const watched2FA = watch2FA();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock 2FA requirement for demo
      if (data.email === 'admin@akibeks.com') {
        setShow2FA(true);
        setTempLoginData(data);
        toast.success('Please enter your 2FA code');
      } else {
        // Regular login
        await login(data.email, data.password, data.rememberMe);
        
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
        
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      setLoginAttempts(prev => prev + 1);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit2FA = async (data: TwoFAFormData) => {
    setIsLoading(true);
    try {
      // Simulate 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.token === '123456') {
        await login(tempLoginData.email, tempLoginData.password, tempLoginData.rememberMe);
        
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
        
        toast.success('Successfully authenticated!');
      } else {
        throw new Error('Invalid 2FA code');
      }
    } catch (error: any) {
      toast.error('Invalid 2FA code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Implement Google OAuth
      toast.info('Google OAuth integration coming soon!');
    } catch (error) {
      toast.error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-md w-full space-y-8"
      >
        {/* Logo and Header */}
        <motion.div variants={itemVariants} className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/akibeks-logo.svg" 
                alt="Akibeks Logo"
                className="w-10 h-10"
              />
            </motion.div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">AKIBEKS</h1>
              <p className="text-sm text-orange-600 font-medium">Engineering Solutions</p>
            </div>
          </Link>
          
          <motion.div variants={itemVariants} className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {show2FA ? 'Two-Factor Authentication' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-gray-600">
              {show2FA 
                ? 'Enter the 6-digit code from your authenticator app'
                : 'Sign in to your account to continue'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Login Forms */}
        <AnimatePresence mode="wait">
          {!show2FA ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {watchedFields.email && !errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <FiCheck className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <FiX className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.password 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <FiX className="w-4 h-4 mr-1" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      {...register('rememberMe')}
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-500 font-medium"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isLoading || !isValid}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiLogIn className="w-5 h-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </motion.div>

                {/* Google Login */}
                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                  >
                    <FcGoogle className="w-5 h-5 mr-2" />
                    Sign in with Google
                  </button>
                </motion.div>
              </form>

              {/* Sign Up Link */}
              <motion.div variants={itemVariants} className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                  >
                    Sign up now
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="2fa"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
            >
              <form onSubmit={handleSubmit2FA(onSubmit2FA)} className="space-y-6">
                <motion.div variants={itemVariants} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiShield className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    We've sent a verification code to your authenticator app
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    {...register2FA('token')}
                    type="text"
                    maxLength={6}
                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono tracking-widest ${
                      errors2FA.token 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="000000"
                    autoComplete="one-time-code"
                  />
                  {errors2FA.token && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center justify-center"
                    >
                      <FiX className="w-4 h-4 mr-1" />
                      {errors2FA.token.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || !watched2FA.token || watched2FA.token.length !== 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5 mr-2" />
                        Verify Code
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShow2FA(false);
                      setTempLoginData(null);
                      reset();
                    }}
                    className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center text-sm text-gray-500">
          <p>© 2024 Akibeks Engineering Solutions. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;