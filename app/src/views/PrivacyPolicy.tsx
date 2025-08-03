import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    Akibeks Construction Ltd ("we," "us," or "our") respects your privacy and is committed 
                    to protecting your personal information. This Privacy Policy explains how we collect, 
                    use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">2. Information We Collect</h2>
                  
                  <h3 className="text-lg font-semibold text-secondary-700 mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-4">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Contact us through our website or phone</li>
                    <li>Request a quote or consultation</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Fill out forms on our website</li>
                    <li>Engage our construction services</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-secondary-700 mb-3">Information Collected Automatically</h3>
                  <p className="text-gray-700 mb-4">
                    When you visit our website, we may automatically collect:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Provide and improve our construction services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Send you project updates and communications</li>
                    <li>Process payments and manage contracts</li>
                    <li>Improve our website and user experience</li>
                    <li>Comply with legal obligations</li>
                    <li>Send marketing communications (with your consent)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share 
                    your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>With contractors and suppliers necessary for project completion</li>
                    <li>With professional service providers (lawyers, accountants, insurers)</li>
                    <li>When required by law or court order</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>With your explicit consent</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">5. Data Security</h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information against unauthorized access, alteration, disclosure, or destruction. 
                    However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">6. Data Retention</h2>
                  <p className="text-gray-700 mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes 
                    outlined in this Privacy Policy, comply with legal obligations, resolve disputes, 
                    and enforce our agreements. Project-related information may be retained for warranty 
                    and legal purposes as required by Kenyan law.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">7. Your Rights</h2>
                  <p className="text-gray-700 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Access and review your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Withdraw consent for marketing communications</li>
                    <li>Request data portability</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">8. Cookies and Tracking</h2>
                  <p className="text-gray-700 mb-4">
                    Our website uses cookies and similar tracking technologies to enhance your browsing 
                    experience, analyze website traffic, and understand where our visitors are coming from. 
                    You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">9. Third-Party Links</h2>
                  <p className="text-gray-700 mb-4">
                    Our website may contain links to third-party websites. We are not responsible for the 
                    privacy practices or content of these external sites. We encourage you to review their 
                    privacy policies before providing any personal information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">10. Children's Privacy</h2>
                  <p className="text-gray-700 mb-4">
                    Our services are not directed to children under 18 years of age. We do not knowingly 
                    collect personal information from children under 18. If you believe we have collected 
                    information from a child under 18, please contact us immediately.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">11. Changes to This Policy</h2>
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any material 
                    changes by posting the new Privacy Policy on our website and updating the "Last updated" 
                    date. Your continued use of our services constitutes acceptance of the revised policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">12. Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions or concerns about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Akibeks Construction Ltd</strong></p>
                    <p className="text-gray-700 mb-2">Privacy Officer</p>
                    <p className="text-gray-700 mb-2">Kiambu Road, Nairobi</p>
                    <p className="text-gray-700 mb-2">P.O. Box 12345-00100, Nairobi, Kenya</p>
                    <p className="text-gray-700 mb-2">Email: privacy@akibeks.co.ke</p>
                    <p className="text-gray-700">Phone: +254 700 123 456</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/terms-of-service"
                    className="btn-outline text-center"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-primary text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;