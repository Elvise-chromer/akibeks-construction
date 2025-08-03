import React from 'react';
import { motion } from 'framer-motion';
import { HiCog, HiLightningBolt, HiShieldCheck, HiChartBar, HiAdjustments, HiChip } from 'react-icons/hi';
import SEO from '../../components/SEO';

const EngineeringServices: React.FC = () => {
  const services = [
    {
      title: "Structural Engineering",
      description: "Comprehensive structural analysis, design, and engineering for all types of construction projects.",
      icon: HiCog,
      features: [
        "Structural analysis and design",
        "Foundation engineering",
        "Seismic design and retrofitting",
        "Load calculations and modeling",
        "Structural integrity assessments"
      ]
    },
    {
      title: "Mechanical Engineering",
      description: "HVAC systems, mechanical equipment, and industrial machinery design and installation.",
      icon: HiAdjustments,
      features: [
        "HVAC system design and installation",
        "Industrial machinery design",
        "Mechanical equipment specification",
        "Energy efficiency optimization",
        "Maintenance and repair services"
      ]
    },
    {
      title: "Electrical Engineering",
      description: "Electrical systems design, power distribution, and automation solutions.",
      icon: HiLightningBolt,
      features: [
        "Electrical system design",
        "Power distribution networks",
        "Automation and control systems",
        "Energy management solutions",
        "Electrical safety compliance"
      ]
    },
    {
      title: "Civil Engineering",
      description: "Infrastructure design, roads, bridges, and public works engineering.",
      icon: HiChartBar,
      features: [
        "Road and highway design",
        "Bridge and tunnel engineering",
        "Water and sewage systems",
        "Urban planning and development",
        "Environmental engineering"
      ]
    },
    {
      title: "Systems Integration",
      description: "Smart building systems, automation, and integrated technology solutions.",
      icon: HiChip,
      features: [
        "Building automation systems",
        "Smart building integration",
        "IoT and sensor networks",
        "Energy management systems",
        "Technology consulting"
      ]
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive quality control, testing, and compliance engineering services.",
      icon: HiShieldCheck,
      features: [
        "Quality control programs",
        "Testing and certification",
        "Regulatory compliance",
        "Safety standards implementation",
        "Performance monitoring"
      ]
    }
  ];

  const expertise = [
    { area: "Structural Analysis", percentage: 95 },
    { area: "Mechanical Systems", percentage: 90 },
    { area: "Electrical Design", percentage: 88 },
    { area: "Civil Infrastructure", percentage: 92 },
    { area: "Systems Integration", percentage: 85 },
    { area: "Quality Assurance", percentage: 98 }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Engineering Services - Akibeks Engineering Solutions"
        description="Comprehensive engineering services including structural, mechanical, electrical, and civil engineering. Expert systems integration and quality assurance."
        keywords="engineering services, structural engineering, mechanical engineering, electrical engineering, civil engineering, systems integration, Kenya"
        canonical="/services/engineering"
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Engineering Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Innovative engineering solutions that drive progress and ensure excellence
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Quality Assurance</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Engineering Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive engineering solutions across all disciplines with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Engineering Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized knowledge and experience across all engineering disciplines
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{item.area}</span>
                  <span className="text-primary-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary-600 h-3 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Engineering Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to engineering excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Requirements Analysis",
                description: "Understanding client needs and project requirements"
              },
              {
                step: "02",
                title: "Design & Planning",
                description: "Creating detailed engineering designs and specifications"
              },
              {
                step: "03",
                title: "Implementation",
                description: "Executing engineering solutions with precision"
              },
              {
                step: "04",
                title: "Testing & Validation",
                description: "Ensuring quality and performance standards"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Engineer Your Success?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your engineering needs and create innovative solutions together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => window.location.href = '/contact'}
              >
                Get Engineering Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                onClick={() => window.location.href = '/quote-request'}
              >
                Request Engineering Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringServices;