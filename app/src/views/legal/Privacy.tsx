import React from 'react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
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
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto leading-relaxed"
            >
              How we collect, use, and protect your personal information
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
              Akibeks Engineering Solutions ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you visit our website or use our services.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Company name and business information</li>
                    <li>Project details and specifications</li>
                    <li>Payment and billing information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>IP address, browser type, and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website information</li>
                    <li>Device identifiers and mobile network information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Construction project details and requirements</li>
                    <li>Site surveys and architectural plans</li>
                    <li>Progress photos and documentation</li>
                    <li>Quality assurance reports</li>
                    <li>Compliance and safety records</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Delivery</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Process and manage your construction projects</li>
                    <li>Provide quotes and cost estimates</li>
                    <li>Schedule and coordinate services</li>
                    <li>Communicate project updates</li>
                    <li>Handle billing and payments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Operations</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Improve our services and website</li>
                    <li>Conduct market research and analysis</li>
                    <li>Ensure compliance with regulations</li>
                    <li>Prevent fraud and maintain security</li>
                    <li>Fulfill legal obligations</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing and Disclosure</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We do not sell, trade, or rent your personal information to third parties. We may share your 
                  information only in the following circumstances:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">With Service Providers</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Subcontractors and suppliers</li>
                      <li>Payment processors</li>
                      <li>IT service providers</li>
                      <li>Professional advisors</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Requirements</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Compliance with laws and regulations</li>
                      <li>Response to legal requests</li>
                      <li>Protection of rights and safety</li>
                      <li>Business transfers or mergers</li>
                    </ul>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Encryption</h4>
                    <p className="text-sm text-gray-600">All data is encrypted in transit and at rest using industry-standard protocols.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Access Control</h4>
                    <p className="text-sm text-gray-600">Strict access controls limit who can view and process your information.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Regular Audits</h4>
                    <p className="text-sm text-gray-600">We conduct regular security assessments and vulnerability testing.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Rights</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your data</li>
                    <li>Restrict processing of your information</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Communication Preferences</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Opt-out of marketing communications</li>
                    <li>Update your contact preferences</li>
                    <li>Manage cookie settings</li>
                    <li>Control data sharing</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>To exercise your rights:</strong> Contact us at privacy@akibeks.co.ke or call +254-XXX-XXXXXX. 
                  We will respond to your request within 30 days.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We use cookies and similar technologies to enhance your experience on our website:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for website functionality and security.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us understand how visitors use our site.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Used to deliver relevant advertisements.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  You can manage your cookie preferences through your browser settings. Note that disabling 
                  certain cookies may affect website functionality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
              
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than Kenya. 
                We ensure appropriate safeguards are in place:
              </p>

              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Adequacy decisions by data protection authorities</li>
                <li>Standard contractual clauses</li>
                <li>Binding corporate rules</li>
                <li>Certification schemes</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
              
              <p className="text-gray-600 mb-4">
                We retain your personal information only as long as necessary:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Active Projects</h3>
                  <p className="text-gray-600">Information is retained for the duration of the project plus 7 years for warranty and legal purposes.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Marketing Data</h3>
                  <p className="text-gray-600">Marketing information is retained until you opt-out or for a maximum of 3 years of inactivity.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
              
              <p className="text-gray-600">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
                personal information from children. If you become aware that a child has provided us with personal 
                information, please contact us immediately.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
              
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>

              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our website</li>
                <li>Including notifications in our client portal</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;