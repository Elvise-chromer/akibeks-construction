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
  FiUser,
  FiPhone,
  FiMapPin,
  FiUserPlus,
  FiCheck,
  FiX,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../lib/AuthContext';

// Form validation schema
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  company: yup.string().optional(),
  position: yup.string().optional(),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
  marketingEmails: yup.boolean().default(false)
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuthContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      agreeToTerms: false,
      marketingEmails: false
    }
  });

  const watchedFields = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Register user
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        company: data.company,
        position: data.position,
        marketingEmails: data.marketingEmails
      });
      
      toast.success('Account created successfully! Welcome to Akibeks!');
      navigate('/login');
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      // Implement Google OAuth
      toast.info('Google OAuth integration coming soon!');
    } catch (error) {
      toast.error('Google registration failed');
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

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(watchedFields.password || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
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
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
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
              <p className="text-sm text-blue-600 font-medium">Engineering Solutions</p>
            </div>
          </Link>
          
          <motion.div variants={itemVariants} className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-gray-600">Join our community of construction professionals</p>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                {step > 1 ? <FiCheck className="w-4 h-4" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:block">Personal Info</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200 rounded">
              <div 
                className={`h-full bg-blue-600 rounded transition-all duration-300 ${
                  step >= 2 ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                {step > 2 ? <FiCheck className="w-4 h-4" /> : '2'}
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:block">Security</span>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('firstName')}
                          type="text"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.firstName 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300'
                          }`}
                          placeholder="John"
                        />
                        {watchedFields.firstName && !errors.firstName && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FiCheck className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <FiX className="w-4 h-4 mr-1" />
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('lastName')}
                          type="text"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.lastName 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300'
                          }`}
                          placeholder="Doe"
                        />
                        {watchedFields.lastName && !errors.lastName && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FiCheck className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <FiX className="w-4 h-4 mr-1" />
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

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
                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="john.doe@example.com"
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

                  {/* Phone Field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="+254 700 000 000"
                      />
                      {watchedFields.phone && !errors.phone && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <FiCheck className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <FiX className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Optional Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        {...register('company')}
                        type="text"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your Company"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                        Position (Optional)
                      </label>
                      <input
                        {...register('position')}
                        type="text"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your Position"
                      />
                    </motion.div>
                  </div>

                  {/* Next Button */}
                  <motion.div variants={itemVariants}>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Continue
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
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
                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.password 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Create a strong password"
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
                    
                    {/* Password Strength Indicator */}
                    {watchedFields.password && (
                      <div className="mt-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded ${
                                passwordStrength >= level
                                  ? passwordStrength === 1
                                    ? 'bg-red-500'
                                    : passwordStrength === 2
                                    ? 'bg-yellow-500'
                                    : passwordStrength === 3
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Password strength: {
                            passwordStrength === 1 ? 'Weak' :
                            passwordStrength === 2 ? 'Fair' :
                            passwordStrength === 3 ? 'Good' :
                            passwordStrength === 4 ? 'Strong' :
                            passwordStrength === 5 ? 'Very Strong' : 'Enter password'
                          }
                        </p>
                      </div>
                    )}
                    
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

                  {/* Confirm Password Field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiShield className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.confirmPassword 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <FiX className="w-4 h-4 mr-1" />
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Terms and Conditions */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-start">
                      <input
                        {...register('agreeToTerms')}
                        id="agreeToTerms"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 flex items-center"
                      >
                        <FiX className="w-4 h-4 mr-1" />
                        {errors.agreeToTerms.message}
                      </motion.p>
                    )}

                    <div className="flex items-start">
                      <input
                        {...register('marketingEmails')}
                        id="marketingEmails"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                        I would like to receive marketing emails about new projects and updates
                      </label>
                    </div>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading || !isValid}
                      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FiUserPlus className="w-5 h-5 mr-2" />
                          Create Account
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <FiArrowLeft className="w-4 h-4 mr-2" />
                      Back to previous step
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Registration - Only show on step 1 */}
            {step === 1 && (
              <>
                {/* Divider */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </motion.div>

                {/* Google Registration */}
                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleGoogleRegister}
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <FcGoogle className="w-5 h-5 mr-2" />
                    Sign up with Google
                  </button>
                </motion.div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center text-sm text-gray-500">
          <p>© 2024 Akibeks Engineering Solutions. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;