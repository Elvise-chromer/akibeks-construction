import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiPhone } from 'react-icons/hi';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className="text-8xl md:text-9xl font-bold text-primary-600 mb-4">
            404
          </div>
          
          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 text-lg"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <HiHome className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <HiPhone className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-primary-600 hover:text-primary-700">About Us</Link>
              <Link to="/services" className="text-primary-600 hover:text-primary-700">Services</Link>
              <Link to="/portfolio" className="text-primary-600 hover:text-primary-700">Portfolio</Link>
              <Link to="/blog" className="text-primary-600 hover:text-primary-700">Blog</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;