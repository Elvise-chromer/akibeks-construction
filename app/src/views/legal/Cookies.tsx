import React from 'react';
import { motion } from 'framer-motion';

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Cookie Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto leading-relaxed"
            >
              How we use cookies and similar technologies
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Last Updated: {new Date().toLocaleDateString()}</h2>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains how Akibeks Engineering Solutions ("we," "our," or "us") 
              uses cookies and similar technologies when you visit our website. It explains what 
              these technologies are, why we use them, and your rights to control our use of them.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Definition</h3>
                  <p className="text-blue-700">
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                    when you visit a website. They help the website remember information about your visit, 
                    which can make it easier to visit the site again and make the site more useful to you.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">How Cookies Work</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Stored in your browser when you visit our site</li>
                      <li>Send information back to our servers on future visits</li>
                      <li>Help us recognize you as a returning visitor</li>
                      <li>Remember your preferences and settings</li>
                      <li>Improve your overall user experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookie Characteristics</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Cannot access files on your device</li>
                      <li>Cannot install software or viruses</li>
                      <li>Are specific to the website that created them</li>
                      <li>Have expiration dates</li>
                      <li>Can be deleted by you at any time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Essential Cookies</h3>
                    <p className="text-green-700 text-sm mb-3">
                      These cookies are necessary for our website to function properly and cannot be disabled.
                    </p>
                    <ul className="list-disc pl-4 text-green-600 text-sm space-y-1">
                      <li>User authentication and login status</li>
                      <li>Shopping cart and checkout functionality</li>
                      <li>Security and fraud prevention</li>
                      <li>Load balancing and performance</li>
                      <li>Form submission and validation</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Functional Cookies</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      These cookies enable enhanced functionality and personalization features.
                    </p>
                    <ul className="list-disc pl-4 text-blue-600 text-sm space-y-1">
                      <li>Language and region preferences</li>
                      <li>User interface customizations</li>
                      <li>Remember your choices and settings</li>
                      <li>Chat widget functionality</li>
                      <li>Video and content preferences</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Analytics Cookies</h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                    <ul className="list-disc pl-4 text-yellow-600 text-sm space-y-1">
                      <li>Page views and traffic sources</li>
                      <li>User behavior and navigation patterns</li>
                      <li>Popular content and pages</li>
                      <li>Site performance and loading times</li>
                      <li>Error tracking and debugging</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Marketing Cookies</h3>
                    <p className="text-purple-700 text-sm mb-3">
                      These cookies are used to deliver relevant advertisements and track campaign effectiveness.
                    </p>
                    <ul className="list-disc pl-4 text-purple-600 text-sm space-y-1">
                      <li>Targeted advertising based on interests</li>
                      <li>Retargeting and remarketing campaigns</li>
                      <li>Social media integration</li>
                      <li>Campaign performance measurement</li>
                      <li>A/B testing for optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Duration</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Session Cookies</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Duration:</strong> Deleted when you close your browser
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Purpose:</strong> Maintain your session while browsing
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Examples:</strong> Login status, shopping cart contents, form data
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Persistent Cookies</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Duration:</strong> Remain until expiry date or manual deletion
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Purpose:</strong> Remember preferences across visits
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Examples:</strong> Language settings, user preferences, analytics data
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  We also use third-party services that may set their own cookies on your device. 
                  These services help us provide better functionality and analyze our website performance.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Google Analytics</h4>
                    <p className="text-gray-600 text-sm mb-2">Website traffic analysis and user behavior insights</p>
                    <p className="text-xs text-gray-500">Privacy Policy: <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline">Google Privacy</a></p>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Google Ads</h4>
                    <p className="text-gray-600 text-sm mb-2">Targeted advertising and conversion tracking</p>
                    <p className="text-xs text-gray-500">Privacy Policy: <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline">Google Privacy</a></p>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Social Media</h4>
                    <p className="text-gray-600 text-sm mb-2">Social sharing buttons and embedded content</p>
                    <p className="text-xs text-gray-500">Various privacy policies apply</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Third-party cookies are governed by the respective companies' privacy policies. 
                    We encourage you to review their policies for more information about their data practices.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Manage Cookies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    You can control and manage cookies through your browser settings. Here's how to access 
                    cookie settings in popular browsers:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Desktop Browsers</h4>
                      <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                        <li><strong>Firefox:</strong> Preferences → Privacy & Security</li>
                        <li><strong>Safari:</strong> Preferences → Privacy</li>
                        <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Browsers</h4>
                      <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li><strong>iOS Safari:</strong> Settings → Safari → Privacy & Security</li>
                        <li><strong>Android Chrome:</strong> Settings → Site settings → Cookies</li>
                        <li><strong>Firefox Mobile:</strong> Settings → Data Management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookie Management Options</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-green-800 mb-2">Accept All</h4>
                      <p className="text-green-600 text-sm">Allow all cookies for full functionality</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-yellow-800 mb-2">Essential Only</h4>
                      <p className="text-yellow-600 text-sm">Allow only necessary cookies</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-blue-800 mb-2">Custom Settings</h4>
                      <p className="text-blue-600 text-sm">Choose specific cookie categories</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-red-800 mb-2">Block All</h4>
                      <p className="text-red-600 text-sm">Disable all non-essential cookies</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact of Disabling Cookies</h2>
              
              <div className="space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">Important Notice</h3>
                  <p className="text-orange-700">
                    Disabling certain cookies may affect your experience on our website. 
                    Some features may not work properly or may not be available.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Essential Cookies Disabled</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Unable to log in to your account</li>
                      <li>Forms may not submit properly</li>
                      <li>Security features may not work</li>
                      <li>Site functionality may be limited</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Optional Cookies Disabled</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Loss of personalized experience</li>
                      <li>Preferences not remembered</li>
                      <li>Less relevant advertising</li>
                      <li>Limited analytics insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Tracking Technologies</h2>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  In addition to cookies, we may use other tracking technologies to enhance your experience:
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Web Beacons</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Small transparent images that help us track email opens and website usage.
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                      <li>Email marketing effectiveness</li>
                      <li>Page view tracking</li>
                      <li>User engagement measurement</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Local Storage</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Browser storage that allows websites to store data locally on your device.
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                      <li>Offline functionality</li>
                      <li>Faster loading times</li>
                      <li>Enhanced user experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Session Storage</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Temporary storage that exists only for the duration of your browser session.
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                      <li>Form data preservation</li>
                      <li>Navigation state</li>
                      <li>Temporary preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Consent Management</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Consent</h3>
                  <p className="text-gray-600 mb-4">
                    When you first visit our website, you'll see a cookie consent banner. 
                    You can choose to accept or decline non-essential cookies.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Consent Options</h4>
                    <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                      <li>Accept all cookies for the best experience</li>
                      <li>Customize your cookie preferences</li>
                      <li>Decline non-essential cookies</li>
                      <li>Learn more about each cookie category</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Changing Your Preferences</h3>
                  <p className="text-gray-600 mb-4">
                    You can change your cookie preferences at any time by:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Clicking the cookie preferences link in our footer</li>
                    <li>Accessing the cookie settings in your browser</li>
                    <li>Clearing your browser's cookie storage</li>
                    <li>Contacting us directly for assistance</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Change Notification</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Updates will be posted on this page</li>
                    <li>The "Last Updated" date will be revised</li>
                    <li>Significant changes may be highlighted</li>
                    <li>Email notifications for major updates</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, 
                please don't hesitate to contact us.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p>privacy@akibeks.co.ke</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p>+254-XXX-XXXXXX</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-500">
                <div className="flex justify-center space-x-6">
                  <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Manage Cookie Preferences
                  </button>
                  <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;