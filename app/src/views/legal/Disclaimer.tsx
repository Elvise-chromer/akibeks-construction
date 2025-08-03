import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer: React.FC = () => {
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
              Disclaimer
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Legal disclaimers and limitations of liability
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
              This disclaimer governs your use of Akibeks Engineering Solutions' website and services. 
              By accessing our website or engaging our services, you acknowledge and agree to the 
              terms set forth in this disclaimer.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">General Information Disclaimer</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notice</h3>
                  <p className="text-yellow-700">
                    The information on this website is provided for general informational purposes only. 
                    While we strive to keep the information up to date and correct, we make no representations 
                    or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                    suitability, or availability of the website or the information contained on the website.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Website Content</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Project images and descriptions are for illustrative purposes</li>
                    <li>Specifications and features may vary by location and project</li>
                    <li>Pricing information is subject to change without notice</li>
                    <li>Service availability may vary by geographic location</li>
                    <li>Timeline estimates are approximate and may vary</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Advice</h3>
                  <p className="text-gray-600">
                    Information on this website should not be considered as professional construction, 
                    legal, financial, or safety advice. Always consult with qualified professionals 
                    before making decisions related to construction projects.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Liability Limits</h3>
                  <p className="text-red-700">
                    In no event will Akibeks Engineering Solutions, nor its directors, employees, partners, 
                    agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, 
                    consequential, or similar damages arising from your use of our website or services.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Excluded Damages</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Loss of profits or revenue</li>
                      <li>Loss of business opportunities</li>
                      <li>Data loss or corruption</li>
                      <li>Business interruption</li>
                      <li>Personal injury (except as legally required)</li>
                      <li>Emotional distress</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Maximum Liability</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm mb-2">
                        Our total liability for any claim arising from our services is limited to:
                      </p>
                      <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                        <li>The amount paid for the specific service</li>
                        <li>Or KES 1,000,000, whichever is lower</li>
                      </ul>
                    </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Availability and Performance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Availability</h3>
                  <p className="text-gray-600 mb-4">
                    We strive to maintain website availability but cannot guarantee uninterrupted access:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Scheduled maintenance may temporarily interrupt service</li>
                    <li>Technical issues may cause unexpected downtime</li>
                    <li>Third-party service dependencies may affect availability</li>
                    <li>Network or server outages beyond our control</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Security</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      While we implement security measures to protect your data, we cannot guarantee 
                      absolute security. You acknowledge that any information transmitted is at your own risk.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Construction Services Disclaimer</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Variations</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Site conditions may require design modifications</li>
                    <li>Material availability may affect project timelines</li>
                    <li>Weather conditions may cause delays</li>
                    <li>Regulatory requirements may change during construction</li>
                    <li>Underground utilities may not be accurately mapped</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Third-Party Dependencies</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Subcontractors</h4>
                      <p className="text-gray-600 text-sm">
                        While we carefully select subcontractors, we cannot be held liable for their actions 
                        beyond the scope of our direct oversight.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Suppliers</h4>
                      <p className="text-gray-600 text-sm">
                        Material quality and delivery schedules depend on supplier performance, 
                        which may be beyond our direct control.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Regulatory Compliance</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      We strive to comply with all applicable building codes and regulations. 
                      However, regulatory requirements may change, and final compliance verification 
                      is the responsibility of relevant authorities.
                    </p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">External Links and Third-Party Content</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our website may contain links to external websites and third-party content. 
                  These links are provided for convenience only.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">External Links</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>We do not endorse linked websites</li>
                      <li>We are not responsible for external content</li>
                      <li>Third-party privacy policies apply</li>
                      <li>External site availability may vary</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">User-Generated Content</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Reviews and testimonials are user opinions</li>
                      <li>We cannot verify all user submissions</li>
                      <li>Content may not reflect our current services</li>
                      <li>We reserve the right to moderate content</li>
                    </ul>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property Disclaimer</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Copyright and Trademarks</h3>
                  <p className="text-gray-600 mb-4">
                    All content on this website is protected by copyright and trademark laws:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Images, text, and designs are our intellectual property</li>
                    <li>Third-party trademarks are acknowledged</li>
                    <li>Unauthorized use may result in legal action</li>
                    <li>Fair use provisions apply where legally applicable</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Copyright Infringement</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      If you believe any content infringes your copyright, please contact us immediately 
                      with details of the alleged infringement for prompt investigation and resolution.
                    </p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Environmental and Safety Considerations</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Environmental Impact</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Environmental assessments are based on available information</li>
                    <li>Site conditions may reveal unforeseen environmental issues</li>
                    <li>Compliance with environmental regulations is ongoing</li>
                    <li>Climate change may affect long-term performance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Measures</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Construction Sites</h4>
                      <p className="text-red-700 text-sm">
                        Construction sites are inherently dangerous. Unauthorized access is prohibited 
                        and may result in injury or legal consequences.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Safety Compliance</h4>
                      <p className="text-green-700 text-sm">
                        We follow industry safety standards, but cannot eliminate all risks 
                        associated with construction activities.
                      </p>
                    </div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jurisdictional Limitations</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  This disclaimer is governed by Kenyan law. Some jurisdictions may not allow certain 
                  limitations of liability or warranty disclaimers.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Variations</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Local laws may override certain disclaimer provisions</li>
                    <li>Consumer protection laws may provide additional rights</li>
                    <li>International projects may be subject to local regulations</li>
                    <li>Statutory warranties may apply regardless of disclaimers</li>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Disclaimer</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We reserve the right to modify this disclaimer at any time. Changes will be effective 
                  immediately upon posting to our website.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Notification Process</h3>
                  <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                    <li>Updates will be posted on our website</li>
                    <li>Significant changes may be communicated via email</li>
                    <li>Continued use constitutes acceptance of changes</li>
                    <li>Previous versions will be archived for reference</li>
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
              <h2 className="text-2xl font-bold mb-4">Legal Consultation</h2>
              <p className="mb-6">
                If you have questions about this disclaimer or need legal advice regarding our services, 
                please consult with qualified legal professionals or contact us directly.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p>legal@akibeks.co.ke</p>
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

export default Disclaimer;