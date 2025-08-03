import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiCalendar, 
  HiLocationMarker, 
  HiCurrencyDollar, 
  HiClock, 
  HiUsers, 
  HiStar,
  HiArrowLeft,
  HiPhone,
  HiMail,
  HiShare,
  HiDownload,
  HiHeart,
  HiEye,
  HiCheckCircle,
  HiPlay
} from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  budget: string;
  duration: string;
  client: string;
  status: 'completed' | 'ongoing' | 'planning';
  images: string[];
  features: string[];
  specifications: {
    area: string;
    floors: string;
    rooms?: string;
    style: string;
  };
  challenges: string[];
  solutions: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
    rating: number;
  };
  gallery: {
    before: string[];
    progress: string[];
    after: string[];
  };
  relatedProjects: string[];
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryTab, setGalleryTab] = useState<'before' | 'progress' | 'after'>('after');
  const [isLiked, setIsLiked] = useState(false);
  const [views, setViews] = useState(0);

  // Mock project data - replace with API call
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProject: Project = {
        id: id || '1',
        title: 'Luxury Residential Complex - Westlands',
        description: 'A premium 5-story residential complex featuring modern apartments with state-of-the-art amenities, sustainable design, and panoramic city views.',
        category: 'Residential',
        location: 'Westlands, Nairobi',
        completionDate: 'March 2024',
        budget: 'KSh 850M',
        duration: '18 months',
        client: 'Westlands Property Developers',
        status: 'completed',
        images: [
          '/images/projects/westlands-1.jpg',
          '/images/projects/westlands-2.jpg',
          '/images/projects/westlands-3.jpg',
          '/images/projects/westlands-4.jpg',
          '/images/projects/westlands-5.jpg'
        ],
        features: [
          'Smart home automation systems',
          'Rooftop swimming pool and gym',
          'Underground parking for 200 vehicles',
          'Solar panel installation',
          'Rainwater harvesting system',
          '24/7 security with CCTV surveillance',
          'High-speed elevator systems',
          'Landscaped gardens and recreational areas'
        ],
        specifications: {
          area: '25,000 sqm',
          floors: '5 floors',
          rooms: '120 apartments (2-4 bedrooms)',
          style: 'Modern Contemporary'
        },
        challenges: [
          'Limited construction space in urban environment',
          'Integration of sustainable technology',
          'Managing construction during rainy season',
          'Coordinating with multiple utility providers'
        ],
        solutions: [
          'Implemented vertical construction methodology',
          'Partnered with leading green technology providers',
          'Developed weather-adaptive construction schedule',
          'Established dedicated utility coordination team'
        ],
        testimonial: {
          text: "Akibeks Construction exceeded our expectations. The attention to detail, quality of work, and professional project management made this one of our most successful developments.",
          author: "John Kimani",
          position: "CEO, Westlands Property Developers",
          rating: 5
        },
        gallery: {
          before: ['/images/projects/before-1.jpg', '/images/projects/before-2.jpg'],
          progress: ['/images/projects/progress-1.jpg', '/images/projects/progress-2.jpg', '/images/projects/progress-3.jpg'],
          after: ['/images/projects/after-1.jpg', '/images/projects/after-2.jpg', '/images/projects/after-3.jpg']
        },
        relatedProjects: ['2', '3', '4']
      };
      
      setProject(mockProject);
      setViews(Math.floor(Math.random() * 5000) + 1000);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = project?.title || 'Akibeks Construction Project';
    
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
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

        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={project.images[selectedImage]}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Image Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  selectedImage === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Project Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'completed' ? 'bg-green-100 text-green-800' :
              project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="section-padding-small">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <HiEye className="w-4 h-4" />
                      <span className="text-sm">{views.toLocaleString()} views</span>
                    </div>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <HiHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{project.description}</p>
                
                {/* Share Buttons */}
                <div className="flex items-center space-x-4 mt-6">
                  <span className="text-gray-700 font-medium">Share:</span>
                  <div className="flex space-x-2">
                    {[
                      { icon: FaFacebook, platform: 'facebook', color: 'text-blue-600' },
                      { icon: FaTwitter, platform: 'twitter', color: 'text-blue-400' },
                      { icon: FaLinkedin, platform: 'linkedin', color: 'text-blue-700' },
                      { icon: FaWhatsapp, platform: 'whatsapp', color: 'text-green-600' }
                    ].map(({ icon: Icon, platform, color }) => (
                      <button
                        key={platform}
                        onClick={() => handleShare(platform)}
                        className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ${color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <HiLocationMarker className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="block text-sm text-gray-500">Location</span>
                      <span className="font-semibold text-gray-900">{project.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiCalendar className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="block text-sm text-gray-500">Completion Date</span>
                      <span className="font-semibold text-gray-900">{project.completionDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiCurrencyDollar className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="block text-sm text-gray-500">Budget</span>
                      <span className="font-semibold text-gray-900">{project.budget}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <HiClock className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="block text-sm text-gray-500">Duration</span>
                      <span className="font-semibold text-gray-900">{project.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiUsers className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="block text-sm text-gray-500">Client</span>
                      <span className="font-semibold text-gray-900">{project.client}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <HiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Challenges</h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-red-700">{challenge}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Solutions</h3>
                  <ul className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="text-green-700">{solution}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Project Gallery</h3>
                  <div className="flex space-x-2">
                    {(['before', 'progress', 'after'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setGalleryTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          galleryTab === tab
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.gallery[galleryTab].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${galleryTab} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="bg-primary-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    {[...Array(project.testimonial.rating)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-4 italic">
                    "{project.testimonial.text}"
                  </blockquote>
                  <div>
                    <cite className="font-semibold text-gray-900">{project.testimonial.author}</cite>
                    <p className="text-gray-600">{project.testimonial.position}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in Similar Work?</h3>
                  <p className="text-gray-600 mb-6">Get a free consultation for your construction project.</p>
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

                {/* Download Brochure */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Project Brochure</h3>
                  <p className="text-gray-600 text-sm mb-4">Download detailed project information and specifications.</p>
                  <button className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <HiDownload className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
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

                {/* Related Projects */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Projects</h3>
                  <div className="space-y-4">
                    {project.relatedProjects.slice(0, 3).map((relatedId) => (
                      <Link
                        key={relatedId}
                        to={`/projects/${relatedId}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={`/images/projects/thumb-${relatedId}.jpg`}
                            alt="Related project"
                            className="w-16 h-16 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                              Sample Project {relatedId}
                            </h4>
                            <p className="text-sm text-gray-600">Residential</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/projects"
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                  >
                    View All Projects
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have trusted us with their construction needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your Free Quote
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;