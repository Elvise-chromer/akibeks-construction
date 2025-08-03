import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiTruck, FiSettings, FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const IndustrialServices: React.FC = () => {
  const services = [
    {
      icon: FiHome,
      title: "Manufacturing Facilities",
      description: "State-of-the-art production facilities designed for efficiency and scalability",
      features: ["Clean room construction", "Heavy machinery foundations", "Specialized ventilation systems", "Quality control areas"]
    },
    {
      icon: FiTruck,
      title: "Warehousing & Distribution",
      description: "Large-scale storage and logistics facilities optimized for modern supply chains",
      features: ["High-bay storage", "Loading dock systems", "Automated storage solutions", "Climate-controlled sections"]
    },
    {
      icon: FiSettings,
      title: "Processing Plants",
      description: "Specialized facilities for chemical, food, and pharmaceutical processing",
      features: ["Corrosion-resistant materials", "Contamination control", "Process piping systems", "Safety containment"]
    },
    {
      icon: FiShield,
      title: "Utility & Infrastructure",
      description: "Critical infrastructure projects including power plants and treatment facilities",
      features: ["Power generation facilities", "Water treatment plants", "Waste management systems", "Telecommunications infrastructure"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Site Assessment & Planning",
      description: "Comprehensive evaluation of site conditions, soil analysis, and regulatory requirements"
    },
    {
      step: "02", 
      title: "Engineering & Design",
      description: "Detailed structural and systems design optimized for industrial operations"
    },
    {
      step: "03",
      title: "Permitting & Compliance",
      description: "Navigate complex industrial regulations and obtain all necessary permits"
    },
    {
      step: "04",
      title: "Construction & Integration",
      description: "Precise construction with seamless integration of specialized equipment and systems"
    }
  ];

  const capabilities = [
    "Heavy foundation work and concrete structures",
    "Steel frame construction and erection",
    "Specialized HVAC and ventilation systems",
    "Industrial electrical and automation systems",
    "Fire suppression and safety systems",
    "Environmental containment solutions",
    "Material handling systems integration",
    "Quality assurance and testing protocols"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Industrial Construction Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Specialized industrial construction for manufacturing, warehousing, and processing facilities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Industrial Quote
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Industrial Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Industrial Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From manufacturing plants to distribution centers, we deliver industrial facilities that meet the highest standards of functionality and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Industrial Construction Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures every industrial project meets technical specifications and operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl font-bold text-primary-600 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FiArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Industrial Capabilities
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our team brings decades of industrial construction experience, specialized equipment, and cutting-edge techniques to every project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Akibeks for Industrial Construction?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <FiShield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Safety First Approach</h4>
                    <p className="text-gray-600">Rigorous safety protocols and industry-leading safety record</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <FiSettings className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Expertise</h4>
                    <p className="text-gray-600">Specialized knowledge in industrial systems and processes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                                         <FiHome className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Operational Understanding</h4>
                    <p className="text-gray-600">Deep understanding of industrial operations and requirements</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Industrial Facility?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Contact us today to discuss your industrial construction project and discover how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Request Quote
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IndustrialServices;