import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck,
  HiUsers,
  HiCog,
  HiTrendingUp,
  HiHeart,
  HiLightBulb,
  HiGlobe,
  HiStar
} from 'react-icons/hi';

const About: React.FC = () => {
  const values = [
    {
      icon: HiShieldCheck,
      title: 'Quality First',
      description: 'We never compromise on quality. Every project meets the highest standards of craftsmanship and durability.'
    },
    {
      icon: HiHeart,
      title: 'Client Focused',
      description: 'Our clients are at the heart of everything we do. We build lasting relationships through exceptional service.'
    },
    {
      icon: HiLightBulb,
      title: 'Innovation',
      description: 'We embrace new technologies and methods to deliver cutting-edge construction solutions.'
    },
    {
      icon: HiGlobe,
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible construction practices for a better future.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Team Members' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  const team = [
    {
      name: 'John Akibeks',
      role: 'Founder & CEO',
      image: '/images/team/john.jpg',
      description: 'Civil Engineer with 20+ years experience in construction management.'
    },
    {
      name: 'Sarah Mwangi',
      role: 'Project Manager',
      image: '/images/team/sarah.jpg',
      description: 'Expert in residential and commercial construction project management.'
    },
    {
      name: 'David Kimani',
      role: 'Lead Architect',
      image: '/images/team/david.jpg',
      description: 'Award-winning architect specializing in sustainable design solutions.'
    },
    {
      name: 'Grace Wanjiku',
      role: 'Operations Director',
      image: '/images/team/grace.jpg',
      description: 'Operations expert ensuring smooth project execution and delivery.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="hero-height-small bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="heading-xl">
                Building Kenya's
                <span className="block text-accent-400">Future Together</span>
              </h1>
              <p className="text-body text-primary-100 max-w-lg">
                For over 15 years, Akibeks Construction has been at the forefront of Kenya's 
                construction industry, delivering exceptional projects that stand the test of time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-accent-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-primary-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about-hero.jpg" 
                  alt="Akibeks Construction Team"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Our Mission</h3>
                    <p className="text-sm text-primary-100">
                      To deliver exceptional construction solutions that exceed expectations
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="heading-lg text-gray-900">Our Story</h2>
              <div className="space-y-4 text-body-sm text-gray-600">
                <p>
                  Founded in 2010 by John Akibeks, our company began with a simple vision: 
                  to transform Kenya's construction landscape through quality, innovation, and integrity.
                </p>
                <p>
                  Starting with small residential projects in Nairobi, we have grown to become 
                  one of Kenya's most trusted construction companies, handling everything from 
                  luxury homes to large commercial complexes.
                </p>
                <p>
                  Today, with over 500 completed projects and a team of 50+ skilled professionals, 
                  we continue to push the boundaries of what's possible in construction while 
                  maintaining our commitment to excellence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(2).map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img 
                  src="/images/company-history-1.jpg" 
                  alt="Early projects" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="/images/company-history-2.jpg" 
                  alt="Modern projects" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="heading-sm text-gray-900 mb-3">Key Milestones</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">2010 - Company founded in Nairobi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">2015 - Expanded to commercial projects</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">2020 - 500th project completed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">2024 - Industry leadership recognized</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="heading-lg text-gray-900">Our Core Values</h2>
            <p className="text-body-sm text-gray-600 max-w-2xl mx-auto">
              These values guide every decision we make and every project we undertake
            </p>
          </motion.div>

          <div className="grid-auto-fit">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card card-mobile text-center group hover:border-primary-200"
              >
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-3">{value.title}</h3>
                <p className="text-body-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="heading-lg text-gray-900">Meet Our Leadership Team</h2>
            <p className="text-body-sm text-gray-600 max-w-2xl mx-auto">
              Our experienced team brings together decades of construction expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-body-sm text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="heading-lg">Certifications & Recognition</h2>
            <p className="text-body text-primary-100 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
              {[
                { icon: HiStar, label: 'ISO 9001 Certified' },
                { icon: HiShieldCheck, label: 'Safety Excellence Award' },
                { icon: HiTrendingUp, label: 'Best Construction Company 2023' },
                { icon: HiUsers, label: 'Top Employer Kenya' }
              ].map((cert, index) => (
                <motion.div
                  key={cert.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <cert.icon className="h-8 w-8 text-accent-400" />
                  </div>
                  <p className="text-sm text-primary-100">{cert.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="heading-lg">Ready to Work with Us?</h2>
            <p className="text-body text-gray-300 max-w-2xl mx-auto">
              Let's discuss your construction project and how we can bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary bg-accent-500 hover:bg-accent-600">
                Get in Touch
              </a>
              <a href="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900">
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;