import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
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
              Terms of Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Terms and conditions for using our services and website
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
              These Terms of Service ("Terms") govern your relationship with Akibeks Engineering Solutions 
              ("Company," "we," "our," or "us"). By accessing our website or engaging our services, 
              you agree to be bound by these Terms.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  By accessing and using our website or services, you accept and agree to be bound by the 
                  terms and provision of this agreement.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to notify us immediately of any unauthorized use</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Services Description</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Construction Services</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Residential construction and renovation</li>
                    <li>Commercial building construction</li>
                    <li>Industrial facility development</li>
                    <li>Maintenance and repair services</li>
                    <li>Emergency construction services</li>
                    <li>Project management and consultation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Digital Services</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Client portal access</li>
                    <li>Project tracking and reporting</li>
                    <li>Document management</li>
                    <li>Online quotation system</li>
                    <li>Digital communication tools</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> All services are subject to availability, location, and our capacity to deliver.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Obligations and Conduct</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Permitted Use</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Use services for lawful purposes only</li>
                    <li>Provide accurate project information</li>
                    <li>Respect intellectual property rights</li>
                    <li>Maintain security of login credentials</li>
                    <li>Comply with all applicable laws</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Prohibited Activities</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Unauthorized access to systems</li>
                    <li>Sharing confidential information</li>
                    <li>Interfering with service operations</li>
                    <li>Posting harmful or offensive content</li>
                    <li>Violating third-party rights</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Service Agreements and Contracts</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Contract Formation</h3>
                  <p className="text-gray-600 mb-4">
                    Construction services are governed by separate written contracts that include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Detailed scope of work and specifications</li>
                    <li>Project timeline and milestones</li>
                    <li>Payment terms and schedule</li>
                    <li>Materials and labor provisions</li>
                    <li>Change order procedures</li>
                    <li>Warranty and guarantee terms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Quote Validity</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Quotes are valid for 30 days from issue date</li>
                      <li>Prices subject to change based on material costs</li>
                      <li>Final pricing confirmed upon contract signing</li>
                      <li>Additional work requires written approval</li>
                    </ul>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Payment Terms</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Schedule</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Initial deposit: 30% upon contract signing</li>
                    <li>Progress payments: As per milestone completion</li>
                    <li>Final payment: Upon project completion</li>
                    <li>Retention: 10% held for warranty period</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Methods</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Bank transfer (preferred)</li>
                    <li>Certified checks</li>
                    <li>Mobile money payments</li>
                    <li>Credit card (processing fees apply)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400">
                <p className="text-red-800 text-sm">
                  <strong>Late Payment:</strong> A service charge of 2% per month will be applied to overdue amounts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Warranties and Guarantees</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Construction Warranty</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Structural Work</h4>
                      <p className="text-sm text-gray-600">10 years warranty on structural elements</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">General Construction</h4>
                      <p className="text-sm text-gray-600">2 years warranty on workmanship</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Materials</h4>
                      <p className="text-sm text-gray-600">Manufacturer warranty applies</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Warranty Exclusions</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Normal wear and tear</li>
                    <li>Damage from misuse or neglect</li>
                    <li>Natural disasters and acts of God</li>
                    <li>Modifications by third parties</li>
                    <li>Failure to follow maintenance guidelines</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Liability and Indemnification</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-600 mb-4">
                    Our liability is limited to the contract value. We are not liable for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of profits or business opportunities</li>
                    <li>Delays beyond our reasonable control</li>
                    <li>Third-party actions or negligence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Insurance Coverage</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Professional Liability</h4>
                      <p className="text-sm text-gray-600">Comprehensive professional indemnity insurance</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Public Liability</h4>
                      <p className="text-sm text-gray-600">Third-party injury and property damage coverage</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Intellectual Property</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  All intellectual property rights in our designs, methodologies, and digital services remain our property.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Rights</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Proprietary construction methodologies</li>
                      <li>Digital platform and tools</li>
                      <li>Marketing and promotional materials</li>
                      <li>Company branding and trademarks</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Rights</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Right to use completed structures</li>
                      <li>Access to project documentation</li>
                      <li>Architectural plans for your property</li>
                      <li>Maintenance and operation manuals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Force Majeure</h2>
              
              <p className="text-gray-600 mb-4">
                We are not liable for delays or failures due to circumstances beyond our reasonable control, including:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Natural Events</h4>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    <li>Earthquakes, floods, storms</li>
                    <li>Extreme weather conditions</li>
                    <li>Natural disasters</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Human Events</h4>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    <li>War, terrorism, civil unrest</li>
                    <li>Government actions</li>
                    <li>Labor strikes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Other Events</h4>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    <li>Pandemics or health emergencies</li>
                    <li>Supplier failures</li>
                    <li>Utility outages</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Dispute Resolution</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Resolution Process</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Direct Negotiation</h4>
                      <p className="text-sm text-gray-600">Good faith discussions between parties</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Mediation</h4>
                      <p className="text-sm text-gray-600">Third-party mediated resolution</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Arbitration</h4>
                      <p className="text-sm text-gray-600">Binding arbitration in Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Governing Law</h4>
                  <p className="text-gray-600 text-sm">
                    These terms are governed by the laws of Kenya. Any disputes will be resolved in Kenyan courts.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Termination</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">By Client</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>30 days written notice required</li>
                    <li>Payment for work completed</li>
                    <li>Material and equipment charges</li>
                    <li>Reasonable termination costs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">By Company</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Non-payment of invoices</li>
                    <li>Breach of contract terms</li>
                    <li>Unsafe working conditions</li>
                    <li>Client misconduct</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Amendments and Updates</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  We reserve the right to update these terms at any time. Changes will be communicated through:
                </p>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Email notification to registered users</li>
                  <li>Website announcement banner</li>
                  <li>Client portal notifications</li>
                  <li>Updated terms posted on our website</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Continued use of our services after changes constitutes acceptance of the updated terms.</strong>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-6">
                For questions about these Terms of Service, please contact us:
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

export default Terms;