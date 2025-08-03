import React from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiShield, FiInfo, FiToggleLeft, FiToggleRight, FiCircle } from 'react-icons/fi';

const CookiePolicy: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-white/10 p-4 rounded-full">
              <FiCircle size={48} />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            {...fadeInUp}
          >
            Cookie Policy
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            Learn how Akibeks Engineering Solutions uses cookies to enhance your browsing experience and provide our services effectively.
          </motion.p>
          
          <motion.div 
            className="text-sm text-blue-200 mt-6"
            {...fadeInUp}
          >
            Last updated: {new Date().toLocaleDateString()}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Introduction */}
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <FiInfo className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">What Are Cookies?</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences, understand how you use our site, and provide you with a better, more personalized experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At Akibeks Engineering Solutions, we use cookies responsibly and transparently. This policy explains what cookies we use, why we use them, and how you can control them.
            </p>
          </motion.section>

          {/* Types of Cookies */}
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <FiSettings className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Types of Cookies We Use</h2>
            </div>

            <div className="grid gap-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Purpose:</strong> Authentication, security, load balancing<br />
                    <strong>Duration:</strong> Session or up to 30 days<br />
                    <strong>Can be disabled:</strong> No (required for site functionality)
                  </p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Functional Cookies</h3>
                <p className="text-gray-600 mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your language preferences or login information.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Purpose:</strong> User preferences, language settings, form data<br />
                    <strong>Duration:</strong> Up to 12 months<br />
                    <strong>Can be disabled:</strong> Yes (may affect functionality)
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Purpose:</strong> Website analytics, performance monitoring<br />
                    <strong>Duration:</strong> Up to 2 years<br />
                    <strong>Can be disabled:</strong> Yes
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 mb-3">
                  These cookies are used to track visitors across websites to display relevant and engaging advertisements for users.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Purpose:</strong> Advertising, remarketing, social media integration<br />
                    <strong>Duration:</strong> Up to 1 year<br />
                    <strong>Can be disabled:</strong> Yes
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Cookie Management */}
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <FiShield className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">How to Manage Cookies</h2>
            </div>

            <div className="space-y-6">
              {/* Browser Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Browser Settings</h3>
                <p className="text-gray-600 mb-4">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Chrome</h4>
                    <p className="text-sm text-gray-600">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Firefox</h4>
                    <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                    <p className="text-sm text-gray-600">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Edge</h4>
                    <p className="text-sm text-gray-600">Settings → Site permissions → Cookies and site data</p>
                  </div>
                </div>
              </div>

              {/* Cookie Consent */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Consent Management</h3>
                <p className="text-gray-600 mb-4">
                  When you first visit our website, you'll see a cookie banner that allows you to choose which types of cookies you accept. You can change your preferences at any time.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">Cookie Preferences</h4>
                      <p className="text-sm text-blue-700">Manage your cookie settings for this website</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Manage Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Third-Party Cookies */}
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Cookies</h2>
            
            <p className="text-gray-600 mb-6">
              Some of our pages may contain content from third-party services, which may set their own cookies. These include:
            </p>

            <div className="grid gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-red-600 font-bold text-xs">YT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">YouTube</h4>
                  <p className="text-sm text-gray-600">Embedded videos for project showcases and company content</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xs">GA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Google Analytics</h4>
                  <p className="text-sm text-gray-600">Website traffic analysis and user behavior insights</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-xs">GM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Google Maps</h4>
                  <p className="text-sm text-gray-600">Interactive maps showing project locations and office address</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section 
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold mb-4">Questions About Our Cookie Policy?</h2>
            <p className="text-blue-100 mb-6">
              If you have any questions about how we use cookies or this Cookie Policy, please don't hesitate to contact us.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-blue-100">privacy@akibeks.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-blue-100">+254 700 123 456</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-blue-500">
              <p className="text-sm text-blue-200">
                This Cookie Policy is part of our Privacy Policy and Terms of Service. By using our website, you agree to the use of cookies as described in this policy.
              </p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;