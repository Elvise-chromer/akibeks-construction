import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Please read these terms and conditions carefully before using our services.
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
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 mb-4">
                    By accessing and using the services provided by Akibeks Construction Ltd ("we," "us," or "our"), 
                    you accept and agree to be bound by the terms and provision of this agreement. If you do not 
                    agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">2. Services</h2>
                  <p className="text-gray-700 mb-4">
                    Akibeks Construction Ltd provides construction services including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Residential construction and renovation</li>
                    <li>Commercial building construction</li>
                    <li>Industrial construction projects</li>
                    <li>Interior design and finishing</li>
                    <li>Project management and consultation</li>
                    <li>Maintenance and repair services</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">3. Project Agreements</h2>
                  <p className="text-gray-700 mb-4">
                    All construction projects are subject to separate written agreements that specify:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Project scope and specifications</li>
                    <li>Timeline and milestones</li>
                    <li>Payment terms and schedule</li>
                    <li>Materials and labor costs</li>
                    <li>Change order procedures</li>
                    <li>Warranty provisions</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">4. Payment Terms</h2>
                  <p className="text-gray-700 mb-4">
                    Payment terms will be specified in individual project contracts. Generally:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Down payment may be required to commence work</li>
                    <li>Progress payments are due as specified in the contract</li>
                    <li>Final payment is due upon project completion and acceptance</li>
                    <li>Late payments may incur additional charges</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">5. Warranties and Guarantees</h2>
                  <p className="text-gray-700 mb-4">
                    We provide warranties on our workmanship as specified in individual contracts. 
                    Material warranties are provided by manufacturers. We are not responsible for 
                    normal wear and tear or damage caused by misuse, negligence, or acts of nature.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">6. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    Our liability is limited to the contract value of the specific project. We are not 
                    liable for indirect, consequential, or punitive damages. We maintain appropriate 
                    insurance coverage as required by law and industry standards.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">7. Force Majeure</h2>
                  <p className="text-gray-700 mb-4">
                    We are not liable for delays or failures caused by circumstances beyond our reasonable 
                    control, including but not limited to natural disasters, government actions, labor 
                    disputes, material shortages, or acts of God.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">8. Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    All designs, plans, and specifications created by us remain our intellectual property 
                    unless specifically transferred in writing. Clients receive usage rights for their 
                    specific project only.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">9. Dispute Resolution</h2>
                  <p className="text-gray-700 mb-4">
                    Any disputes arising from our services will be resolved through mediation and, if 
                    necessary, arbitration in accordance with Kenyan law. The jurisdiction for legal 
                    matters is Nairobi, Kenya.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">10. Modifications</h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to modify these terms at any time. Changes will be communicated 
                    to active clients and posted on our website. Continued use of our services constitutes 
                    acceptance of modified terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800 mb-4">11. Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Akibeks Construction Ltd</strong></p>
                    <p className="text-gray-700 mb-2">Kiambu Road, Nairobi</p>
                    <p className="text-gray-700 mb-2">P.O. Box 12345-00100, Nairobi, Kenya</p>
                    <p className="text-gray-700 mb-2">Email: info@akibeks.co.ke</p>
                    <p className="text-gray-700">Phone: +254 700 123 456</p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/privacy-policy"
                    className="btn-outline text-center"
                  >
                    Privacy Policy
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

export default TermsOfService;