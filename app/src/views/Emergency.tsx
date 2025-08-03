import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiPhone, 
  HiClock, 
  HiLightningBolt, 
  HiShieldCheck,
  HiLocationMarker,
  HiUsers,
  HiCheckCircle,
  HiExclamationCircle,
  HiChat,
  HiMail,
  HiSupport,
  HiStar,
  HiGlobe
} from 'react-icons/hi';

const Emergency: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const emergencyServices = [
    {
      id: 'structural',
      title: 'Structural Emergency',
      description: 'Critical structural issues, foundation problems, and building safety concerns',
      icon: HiExclamationCircle,
      responseTime: '30 minutes',
      examples: ['Structural collapse', 'Foundation cracks', 'Wall instability', 'Roof damage']
    },
    {
      id: 'water-damage',
      title: 'Water Damage',
      description: 'Flooding, pipe bursts, and water-related construction emergencies',
      icon: HiLightningBolt,
      responseTime: '45 minutes',
      examples: ['Burst pipes', 'Flooding', 'Roof leaks', 'Water infiltration']
    },
    {
      id: 'safety',
      title: 'Safety Hazards',
      description: 'Immediate safety threats requiring urgent professional intervention',
      icon: HiShieldCheck,
      responseTime: '20 minutes',
      examples: ['Electrical hazards', 'Gas leaks', 'Unstable structures', 'Site accidents']
    },
    {
      id: 'weather',
      title: 'Weather Damage',
      description: 'Storm damage, wind damage, and weather-related construction emergencies',
      icon: HiGlobe,
      responseTime: '60 minutes',
      examples: ['Storm damage', 'Wind damage', 'Fallen trees', 'Debris removal']
    }
  ];

  const responseFeatures = [
    {
      icon: HiClock,
      title: '24/7 Availability',
      description: 'Round-the-clock emergency response team ready to assist'
    },
    {
      icon: HiLightningBolt,
      title: 'Rapid Response',
      description: 'Average response time of 30 minutes within Nairobi metropolitan area'
    },
    {
      icon: HiUsers,
      title: 'Expert Team',
      description: 'Certified emergency response specialists with 10+ years experience'
    },
    {
      icon: HiShieldCheck,
      title: 'Fully Insured',
      description: 'Comprehensive insurance coverage for all emergency operations'
    }
  ];

  const coverageAreas = [
    { area: 'Nairobi CBD', responseTime: '15-30 min' },
    { area: 'Westlands', responseTime: '20-35 min' },
    { area: 'Karen', responseTime: '25-40 min' },
    { area: 'Kiambu', responseTime: '30-45 min' },
    { area: 'Thika', responseTime: '45-60 min' },
    { area: 'Machakos', responseTime: '60-75 min' }
  ];

  const testimonials = [
    {
      name: 'Sarah Wanjiku',
      position: 'Property Manager',
      company: 'Elite Properties',
      content: 'Akibeks responded to our structural emergency within 20 minutes. Their quick action prevented a major disaster.',
      rating: 5,
      image: '/images/testimonials/sarah.jpg'
    },
    {
      name: 'David Kimani',
      position: 'Facility Manager',
      company: 'Corporate Towers',
      content: 'Outstanding emergency service! They handled our flooding issue professionally and efficiently at 2 AM.',
      rating: 5,
      image: '/images/testimonials/david.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <HiLightningBolt className="w-4 h-4 mr-2" />
                EMERGENCY HOTLINE: +254 700 EMERGENCY
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              24/7 Emergency Services
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Immediate response for construction emergencies, structural issues, and urgent repairs across Kenya
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:+254700123456"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <HiPhone className="w-5 h-5" />
                <span>CALL NOW: +254 700 123 456</span>
              </a>
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                WhatsApp Emergency
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-red-100 text-sm mb-2">Average Response Time</p>
              <div className="text-3xl font-bold">30 MINUTES</div>
              <p className="text-red-100 text-sm">Within Nairobi Metropolitan Area</p>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
        </div>
      </section>

      {/* Emergency Contact Bar */}
      <section className="bg-red-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg">EMERGENCY CONTACT METHODS</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="tel:+254700123456" className="flex items-center space-x-2 hover:text-red-200">
                <HiPhone className="w-5 h-5" />
                <span>+254 700 123 456</span>
              </a>
              <a href="mailto:emergency@akibeks.com" className="flex items-center space-x-2 hover:text-red-200">
                <HiMail className="w-5 h-5" />
                <span>emergency@akibeks.com</span>
              </a>
              <a href="https://wa.me/254700123456" className="flex items-center space-x-2 hover:text-red-200">
                <HiChat className="w-5 h-5" />
                <span>WhatsApp 24/7</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Emergency Services We Handle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional emergency response for all types of construction and structural emergencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-200">
                    <service.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800 font-semibold">Response Time</p>
                    <p className="text-red-600 font-bold">{service.responseTime}</p>
                  </div>
                  
                  {selectedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-200 pt-4 mt-4"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <HiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Features */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Emergency Service?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, reliable, and rapid emergency response when you need it most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {responseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Coverage Areas</h2>
              <p className="text-lg text-gray-600 mb-8">
                We provide emergency construction services across Kenya with fastest response times in major urban areas.
              </p>
              
              <div className="space-y-4">
                {coverageAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <HiLocationMarker className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-gray-900">{area.area}</span>
                    </div>
                    <span className="text-gray-600 font-medium">{area.responseTime}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-xl">
                <h3 className="font-bold text-red-800 mb-2">Outside Coverage Area?</h3>
                <p className="text-red-700 text-sm">
                  We still respond to emergencies outside our primary coverage areas. 
                  Contact us for estimated response times to your location.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/images/emergency/coverage-map.jpg"
                alt="Service coverage map"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Emergency Response Coverage</p>
                <p className="text-xs opacity-90">Real-time tracking available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Process */}
      <section className="bg-gray-100 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Emergency Response Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and efficient emergency response process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Call or Message',
                description: 'Contact us via phone, WhatsApp, or email describing the emergency',
                icon: HiPhone
              },
              {
                step: '02',
                title: 'Assessment',
                description: 'Our team assesses the situation and dispatches appropriate specialists',
                icon: HiSupport
              },
              {
                step: '03',
                title: 'Rapid Response',
                description: 'Emergency team arrives on-site with necessary equipment and materials',
                icon: HiLightningBolt
              },
              {
                step: '04',
                title: 'Resolution',
                description: 'We resolve the emergency and provide recommendations for permanent solutions',
                icon: HiCheckCircle
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-red-200 transform translate-x-4" />
                )}
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                  STEP {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Response Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from clients who trusted us during their emergencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <cite className="font-semibold text-gray-900">{testimonial.name}</cite>
                    <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="bg-red-50 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Safety Tips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important safety measures to take before our emergency team arrives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Structural Issues',
                tips: [
                  'Evacuate the affected area immediately',
                  'Turn off utilities if safe to do so',
                  'Do not attempt repairs yourself',
                  'Keep people away from the danger zone'
                ]
              },
              {
                title: 'Water Damage',
                tips: [
                  'Turn off main water supply',
                  'Switch off electricity in affected areas',
                  'Remove valuable items from water',
                  'Document damage with photos'
                ]
              },
              {
                title: 'General Safety',
                tips: [
                  'Call emergency services if life-threatening',
                  'Stay calm and call our emergency line',
                  'Provide clear location information',
                  'Wait for professional assistance'
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-3">
                      <HiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't Wait - Get Emergency Help Now!
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Every minute counts in an emergency. Our expert team is standing by 24/7 to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:+254700123456"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <HiPhone className="w-6 h-6" />
                <span>EMERGENCY HOTLINE</span>
              </a>
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                WhatsApp 24/7
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-red-100 mb-2">For non-emergency inquiries:</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact" className="text-white hover:text-red-200 underline">
                  Contact Us
                </Link>
                <Link to="/quote" className="text-white hover:text-red-200 underline">
                  Request Quote
                </Link>
                <a href="mailto:info@akibeks.com" className="text-white hover:text-red-200 underline">
                  info@akibeks.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Emergency;