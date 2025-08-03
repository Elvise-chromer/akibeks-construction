import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiPlay,
  HiShieldCheck,
  HiClock,
  HiUsers,
  HiStar,
  HiArrowRight,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiCheckCircle
} from 'react-icons/hi';

const Home: React.FC = () => {
  const features = [
    {
      icon: HiShieldCheck,
      title: 'Quality Assured',
      description: 'ISO certified processes and premium materials for lasting construction.'
    },
    {
      icon: HiClock,
      title: 'On-Time Delivery',
      description: 'Proven track record of completing projects within scheduled timelines.'
    },
    {
      icon: HiUsers,
      title: 'Expert Team',
      description: 'Skilled professionals with over 15 years of construction experience.'
    },
    {
      icon: HiStar,
      title: '5-Star Service',
      description: 'Exceptional customer service and post-construction support.'
    }
  ];

  const services = [
    {
      title: 'Residential Construction',
      description: 'Custom homes, apartments, and residential complexes built to perfection.',
      image: '/images/residential.jpg',
      link: '/services/residential'
    },
    {
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial developments.',
      image: '/images/commercial.jpg',
      link: '/services/commercial'
    },
    {
      title: 'Industrial Facilities',
      description: 'Warehouses, factories, and specialized industrial construction.',
      image: '/images/industrial.jpg',
      link: '/services/industrial'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Akibeks transformed our dream home into reality. Their attention to detail and professionalism exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'Our office complex was completed on time and within budget. The quality of work is outstanding.',
      rating: 5
    },
    {
      name: 'David Kamau',
      role: 'Developer',
      content: 'Working with Akibeks on multiple projects has been incredible. They deliver consistent quality every time.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Expert Team Members' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Reduced Size */}
      <section className="relative hero-height-small bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative container-custom h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="heading-xl"
                >
                  Building Your
                  <span className="block text-accent-400">Dreams Into Reality</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-body text-primary-100 max-w-lg"
                >
                  Kenya's premier construction company delivering exceptional building solutions 
                  across residential, commercial, and industrial sectors with over 15 years of excellence.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/quote" 
                  className="btn-primary btn-mobile bg-accent-500 hover:bg-accent-600 border-accent-500"
                >
                  Get Free Quote
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/portfolio" 
                  className="btn-outline btn-mobile border-white text-white hover:bg-white hover:text-primary-600"
                >
                  View Our Work
                </Link>
              </motion.div>

              {/* Quick Contact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-primary-500"
              >
                <a href="tel:+254123456789" className="flex items-center text-primary-100 hover:text-white transition-colors">
                  <HiPhone className="h-5 w-5 mr-2" />
                  <span className="text-sm">+254 123 456 789</span>
                </a>
                <a href="mailto:info@akibeks.co.ke" className="flex items-center text-primary-100 hover:text-white transition-colors">
                  <HiMail className="h-5 w-5 mr-2" />
                  <span className="text-sm">info@akibeks.co.ke</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-construction.jpg" 
                  alt="Akibeks Construction Projects"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                {/* Video Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group">
                    <HiPlay className="h-8 w-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                {/* Overlay Stats */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-white">500+</div>
                        <div className="text-xs text-primary-100">Projects</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">15+</div>
                        <div className="text-xs text-primary-100">Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding-small bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="heading-lg text-gray-900">Why Choose Akibeks Construction</h2>
            <p className="text-body-sm text-gray-600 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern technology to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid-auto-fit">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card card-mobile text-center group hover:border-primary-200"
              >
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-body-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding-small bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="heading-lg text-gray-900">Our Construction Services</h2>
            <p className="text-body-sm text-gray-600 max-w-2xl mx-auto">
              From residential homes to commercial complexes, we handle projects of all sizes with expertise
            </p>
          </motion.div>

          <div className="grid-auto-fit-large">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card group cursor-pointer"
              >
                <div className="relative h-48 sm:h-56 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="space-y-3">
                  <h3 className="heading-sm text-gray-900">{service.title}</h3>
                  <p className="text-body-sm text-gray-600">{service.description}</p>
                  <Link 
                    to={service.link} 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Learn More
                    <HiArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary">
              View All Services
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-small bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding-small bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="heading-lg text-gray-900">What Our Clients Say</h2>
            <p className="text-body-sm text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid-auto-fit-large">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card card-mobile"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-body-sm text-gray-600 italic mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-small bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="heading-lg">Ready to Start Your Project?</h2>
            <p className="text-body text-gray-300 max-w-2xl mx-auto">
              Get in touch with our expert team today for a free consultation and quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote" className="btn-primary bg-accent-500 hover:bg-accent-600">
                Get Free Quote
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;