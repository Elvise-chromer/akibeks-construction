import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiShoppingBag, FiBook, FiStar, FiCheckCircle, FiArrowRight, FiTruck, FiShield, FiClock, FiDollarSign } from 'react-icons/fi';

const CommercialServices: React.FC = () => {
  const services = [
    {
      icon: FiMapPin,
      title: "Office Buildings",
      description: "Modern office complexes and corporate headquarters designed for productivity and growth",
      features: ["Open floor plan design", "Advanced HVAC systems", "High-speed internet infrastructure", "Sustainable building practices"]
    },
    {
      icon: FiShoppingBag,
      title: "Retail Spaces",
      description: "Shopping centers, malls, and retail outlets optimized for customer experience",
      features: ["Strategic layout planning", "Modern POS integration", "Customer flow optimization", "Security and surveillance systems"]
    },
    {
      icon: FiBook,
      title: "Educational Facilities",
      description: "Schools, universities, and training centers built for learning excellence",
      features: ["Classroom acoustics", "Technology integration", "Safety and security systems", "Flexible learning spaces"]
    },
    {
      icon: FiStar,
      title: "Hospitality",
      description: "Hotels, restaurants, and entertainment venues that create memorable experiences",
      features: ["Guest-centric design", "Commercial kitchen facilities", "Sound insulation", "Accessibility compliance"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Market Analysis & Planning",
      description: "Comprehensive market research and strategic planning for your commercial project"
    },
    {
      step: "02", 
      title: "Design & Engineering",
      description: "Collaborative design process with 3D modeling and engineering optimization"
    },
    {
      step: "03",
      title: "Permits & Approvals",
      description: "Navigate complex commercial regulations and obtain all necessary approvals"
    },
    {
      step: "04",
      title: "Construction & Delivery",
      description: "Efficient construction with minimal business disruption and on-time delivery"
    }
  ];

  const projectTypes = [
    {
      category: "Office & Corporate",
      projects: ["Corporate headquarters", "Business parks", "Coworking spaces", "Medical offices"]
    },
    {
      category: "Retail & Commercial", 
      projects: ["Shopping centers", "Standalone stores", "Food courts", "Service centers"]
    },
    {
      category: "Hospitality & Entertainment",
      projects: ["Hotels & resorts", "Restaurants & cafes", "Entertainment venues", "Conference centers"]
    },
    {
      category: "Institutional",
      projects: ["Educational facilities", "Healthcare buildings", "Government buildings", "Religious facilities"]
    }
  ];

  const advantages = [
    {
      icon: FiDollarSign,
      title: "Cost-Effective Solutions",
      description: "Optimized designs that maximize value while minimizing construction costs"
    },
    {
      icon: FiClock,
      title: "Fast-Track Delivery",
      description: "Accelerated construction schedules to get your business operational quickly"
    },
    {
      icon: FiShield,
      title: "Code Compliance",
      description: "Expert knowledge of commercial building codes and safety regulations"
    },
    {
      icon: FiTruck,
      title: "Turnkey Solutions",
      description: "Complete project management from concept to occupancy"
    }
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
              Commercial Construction Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Building the future of Kenyan business with state-of-the-art commercial construction
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
                Get Commercial Quote
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Commercial Projects
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
              Our Commercial Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From corporate headquarters to retail destinations, we create commercial spaces that drive business success and enhance customer experiences.
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
              Our Commercial Construction Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures commercial projects are delivered on time, within budget, and to the highest quality standards.
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

      {/* Project Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Project Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have extensive experience across all sectors of commercial construction, delivering projects that meet specific industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectTypes.map((type, index) => (
              <motion.div
                key={type.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.category}</h3>
                <ul className="space-y-2">
                  {type.projects.map((project, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {project}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Akibeks for Commercial Construction?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commercial construction expertise ensures your business project succeeds from planning to grand opening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <advantage.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Commercial Construction Expertise
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                With decades of commercial construction experience, we understand the unique challenges and requirements of business construction projects.
              </p>
              <div className="space-y-4">
                {[
                  "Licensed commercial contractors",
                  "Experienced project management",
                  "Quality materials and finishes",
                  "Code compliance expertise",
                  "Safety-first construction practices",
                  "Post-construction support"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commercial Construction Specialties</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainable Building</h4>
                  <p className="text-gray-600">Green building practices and LEED certification support</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technology Integration</h4>
                  <p className="text-gray-600">Smart building systems and advanced infrastructure</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Design-Build Services</h4>
                  <p className="text-gray-600">Integrated design and construction for streamlined delivery</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Value Engineering</h4>
                  <p className="text-gray-600">Cost optimization without compromising quality or functionality</p>
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
              Ready to Build Your Commercial Project?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Partner with Akibeks to create a commercial space that enhances your business success and serves your customers exceptionally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Request Commercial Quote
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Discuss Your Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommercialServices;