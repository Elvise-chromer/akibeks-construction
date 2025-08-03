import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiCurrencyDollar, 
  HiClock, 
  HiShieldCheck, 
  HiStar,
  HiArrowLeft,
  HiPhone,
  HiMail,
  HiDownload,
  HiCheckCircle,
  HiPlay,
  HiLightBulb,
  HiCog,
  HiUsers,
  HiCalendar,
  HiTrendingUp,
  HiChat,
  HiHeart
} from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricing: {
    starting: string;
    description: string;
  };
  duration: string;
  features: string[];
  process: {
    title: string;
    description: string;
    icon: string;
  }[];
  benefits: string[];
  images: string[];
  gallery: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    text: string;
    author: string;
    position: string;
    company: string;
    rating: number;
    image: string;
  }[];
  relatedServices: string[];
  included: string[];
  addOns: {
    name: string;
    description: string;
    price: string;
  }[];
  portfolio: {
    id: string;
    title: string;
    image: string;
    category: string;
  }[];
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'portfolio' | 'faq'>('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Mock service data - replace with API call
  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockService: Service = {
        id: id || 'residential',
        title: 'Residential Construction',
        shortDescription: 'Custom homes, apartments, and residential complexes built to perfection.',
        fullDescription: 'Our residential construction service combines innovative design with superior craftsmanship to create homes that stand the test of time. From single-family homes to large residential complexes, we handle every aspect of the construction process with meticulous attention to detail and commitment to quality.',
        category: 'Construction',
        pricing: {
          starting: 'KSh 45,000/m²',
          description: 'Starting price varies based on design complexity, materials, and location'
        },
        duration: '6-18 months',
        features: [
          'Custom architectural design',
          'Premium construction materials',
          'Project management included',
          'Quality assurance testing',
          'Post-construction support',
          'Warranty coverage',
          'Regular progress updates',
          'Environmental compliance'
        ],
        process: [
          {
            title: 'Consultation & Planning',
            description: 'Initial consultation to understand your vision and requirements',
            icon: 'chat'
          },
          {
            title: 'Design & Approval',
            description: 'Architectural design and obtaining necessary permits',
            icon: 'lightbulb'
          },
          {
            title: 'Construction',
            description: 'Professional construction with regular quality checks',
            icon: 'cog'
          },
          {
            title: 'Completion & Handover',
            description: 'Final inspection and project handover with documentation',
            icon: 'check'
          }
        ],
        benefits: [
          'Increased property value',
          'Energy-efficient design',
          'Customized to your needs',
          'Professional project management',
          'Quality materials and workmanship',
          'Timely project completion',
          'Comprehensive warranty',
          'Ongoing support'
        ],
        images: [
          '/images/services/residential-1.jpg',
          '/images/services/residential-2.jpg',
          '/images/services/residential-3.jpg',
          '/images/services/residential-4.jpg'
        ],
        gallery: [
          '/images/gallery/res-1.jpg',
          '/images/gallery/res-2.jpg',
          '/images/gallery/res-3.jpg',
          '/images/gallery/res-4.jpg',
          '/images/gallery/res-5.jpg',
          '/images/gallery/res-6.jpg'
        ],
        faqs: [
          {
            question: 'How long does a typical residential construction project take?',
            answer: 'The duration depends on the size and complexity of the project. A single-family home typically takes 6-12 months, while larger residential complexes may take 12-18 months.'
          },
          {
            question: 'Do you provide architectural design services?',
            answer: 'Yes, we offer complete architectural design services as part of our residential construction package. Our team of experienced architects will work with you to create a design that meets your specific needs and preferences.'
          },
          {
            question: 'What permits and approvals do you handle?',
            answer: 'We handle all necessary permits and approvals including building permits, environmental impact assessments, and utility connections. Our team ensures full compliance with local building codes and regulations.'
          },
          {
            question: 'Do you offer warranty on your construction work?',
            answer: 'Yes, we provide comprehensive warranty coverage for all our construction work. The warranty period varies depending on the specific components and systems, typically ranging from 1-10 years.'
          },
          {
            question: 'Can I make changes during construction?',
            answer: 'Minor changes can be accommodated during construction, though they may affect the timeline and cost. We recommend finalizing all design decisions before construction begins to avoid delays.'
          }
        ],
        testimonials: [
          {
            text: "Akibeks Construction transformed our vision into reality. The attention to detail and quality of work exceeded our expectations.",
            author: "Sarah Wanjiku",
            position: "Homeowner",
            company: "Nairobi",
            rating: 5,
            image: "/images/testimonials/sarah.jpg"
          },
          {
            text: "Professional team, excellent communication, and delivered on time. Highly recommend their residential construction services.",
            author: "David Mutua",
            position: "Property Developer",
            company: "Kiambu County",
            rating: 5,
            image: "/images/testimonials/david.jpg"
          }
        ],
        relatedServices: ['commercial', 'interior-design', 'renovations'],
        included: [
          'Site preparation and excavation',
          'Foundation and structural work',
          'Roofing and weatherproofing',
          'Electrical and plumbing installation',
          'Interior finishing',
          'Exterior landscaping (basic)',
          'Final cleaning',
          'Project documentation'
        ],
        addOns: [
          {
            name: 'Premium Interior Package',
            description: 'High-end finishes, custom cabinetry, and luxury fixtures',
            price: '+KSh 15,000/m²'
          },
          {
            name: 'Smart Home Integration',
            description: 'Home automation system with smart controls',
            price: '+KSh 8,000/m²'
          },
          {
            name: 'Solar Panel Installation',
            description: 'Complete solar energy system with battery backup',
            price: '+KSh 12,000/m²'
          },
          {
            name: 'Swimming Pool',
            description: 'Custom swimming pool with filtration system',
            price: 'From KSh 2.5M'
          }
        ],
        portfolio: [
          {
            id: '1',
            title: 'Luxury Villa - Karen',
            image: '/images/portfolio/villa-karen.jpg',
            category: 'Residential'
          },
          {
            id: '2',
            title: 'Modern Apartments - Westlands',
            image: '/images/portfolio/apartments-westlands.jpg',
            category: 'Residential'
          },
          {
            id: '3',
            title: 'Family Home - Runda',
            image: '/images/portfolio/home-runda.jpg',
            category: 'Residential'
          }
        ]
      };
      
      setService(mockService);
      setLoading(false);
    };

    fetchService();
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = service?.title || 'Akibeks Construction Service';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  const getProcessIcon = (iconName: string) => {
    switch (iconName) {
      case 'chat': return HiChat;
      case 'lightbulb': return HiLightBulb;
      case 'cog': return HiCog;
      case 'check': return HiCheckCircle;
      default: return HiCog;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
          >
            <HiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={service.images[selectedImage]}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  {service.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{service.title}</h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed">{service.shortDescription}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/quote"
                    className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+254700123456"
                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-200"
                  >
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Image Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {service.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  selectedImage === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="section-padding-small">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Quick Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <HiCurrencyDollar className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Starting Price</h3>
                  <p className="text-2xl font-bold text-primary-600">{service.pricing.starting}</p>
                  <p className="text-sm text-gray-600 mt-1">{service.pricing.description}</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <HiClock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-2xl font-bold text-primary-600">{service.duration}</p>
                  <p className="text-sm text-gray-600 mt-1">Typical project timeline</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <HiShieldCheck className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
                  <p className="text-2xl font-bold text-primary-600">5-10 Years</p>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive coverage</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  {[
                    { key: 'overview', label: 'Overview' },
                    { key: 'process', label: 'Process' },
                    { key: 'portfolio', label: 'Portfolio' },
                    { key: 'faq', label: 'FAQ' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === key
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Overview</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{service.fullDescription}</p>
                  </div>

                  {/* Features */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <HiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <HiTrendingUp className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.included.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <HiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Optional Add-ons</h3>
                    <div className="grid gap-4">
                      {service.addOns.map((addon, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{addon.name}</h4>
                            <p className="text-gray-600 text-sm">{addon.description}</p>
                          </div>
                          <span className="font-bold text-primary-600 whitespace-nowrap ml-4">{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Our Process</h3>
                  <div className="space-y-6">
                    {service.process.map((step, index) => {
                      const IconComponent = getProcessIcon(step.icon);
                      return (
                        <div key={index} className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-sm">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {index + 1}. {step.title}
                            </h4>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Related Projects</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.portfolio.map((project) => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.id}`}
                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <span className="text-sm text-primary-600 font-medium">{project.category}</span>
                          <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                            {project.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link
                      to="/projects"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Projects →
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                        >
                          <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                          <div className={`transform transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              <div className="space-y-6 mt-12">
                <h3 className="text-2xl font-bold text-gray-900">What Our Clients Say</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-4 italic">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <cite className="font-semibold text-gray-900">{testimonial.author}</cite>
                          <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started Today</h3>
                  <p className="text-gray-600 mb-6">Ready to begin your construction project? Get a free consultation and quote.</p>
                  <div className="space-y-3">
                    <Link
                      to="/quote"
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 text-center block"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:+254700123456"
                      className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center block flex items-center justify-center space-x-2"
                    >
                      <HiPhone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+254700123456"
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    >
                      <HiPhone className="w-5 h-5" />
                      <span>+254 700 123 456</span>
                    </a>
                    <a
                      href="mailto:info@akibeks.com"
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    >
                      <HiMail className="w-5 h-5" />
                      <span>info@akibeks.com</span>
                    </a>
                  </div>
                </div>

                {/* Download Brochure */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Service Brochure</h3>
                  <p className="text-gray-600 text-sm mb-4">Download detailed service information and pricing guide.</p>
                  <button className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <HiDownload className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                {/* Share Service */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Service</h3>
                  <div className="flex justify-center space-x-3">
                    {[
                      { icon: FaFacebook, platform: 'facebook', color: 'text-blue-600' },
                      { icon: FaTwitter, platform: 'twitter', color: 'text-blue-400' },
                      { icon: FaLinkedin, platform: 'linkedin', color: 'text-blue-700' },
                      { icon: FaWhatsapp, platform: 'whatsapp', color: 'text-green-600' }
                    ].map(({ icon: Icon, platform, color }) => (
                      <button
                        key={platform}
                        onClick={() => handleShare(platform)}
                        className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ${color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {service.relatedServices.map((relatedId) => (
                      <Link
                        key={relatedId}
                        to={`/services/${relatedId}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h4 className="font-medium text-gray-900 hover:text-primary-600">
                          {relatedId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="text-sm text-gray-600">Construction services</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/services"
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Transform your vision into reality with our expert construction services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your Free Quote
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;