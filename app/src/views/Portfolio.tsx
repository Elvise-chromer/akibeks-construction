import React, { useState, useMemo } from 'react';
import { 
  FaFilter, 
  FaSearch, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaCalendar, 
  FaRuler,
  FaDollarSign,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaBuilding,
  FaHome,
  FaIndustry,
  FaClock
} from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completedDate: string;
  area: string;
  budget: string;
  images: string[];
  client: string;
  duration: string;
  featured: boolean;
  status: 'completed' | 'ongoing' | 'planned';
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Westlands Executive Apartments',
      description: 'Modern luxury residential complex featuring 120 units with state-of-the-art amenities including swimming pool, gym, and 24/7 security.',
      category: 'Residential',
      location: 'Westlands, Nairobi',
      completedDate: '2023-12-15',
      area: '15,000 sq ft',
      budget: 'KES 250M',
      client: 'Westlands Development Ltd',
      duration: '18 months',
      featured: true,
      status: 'completed',
      images: [
        '/projects/westlands-apartments-1.jpg',
        '/projects/westlands-apartments-2.jpg',
        '/projects/westlands-apartments-3.jpg',
        '/projects/westlands-apartments-4.jpg'
      ]
    },
    {
      id: '2',
      title: 'Nairobi Business Center',
      description: 'Class A commercial office building with 20 floors, modern elevators, central air conditioning, and underground parking.',
      category: 'Commercial',
      location: 'CBD, Nairobi',
      completedDate: '2023-10-30',
      area: '50,000 sq ft',
      budget: 'KES 800M',
      client: 'Nairobi Commercial Properties',
      duration: '24 months',
      featured: true,
      status: 'completed',
      images: [
        '/projects/business-center-1.jpg',
        '/projects/business-center-2.jpg',
        '/projects/business-center-3.jpg'
      ]
    },
    {
      id: '3',
      title: 'Kisumu Manufacturing Plant',
      description: 'Industrial facility for food processing with specialized equipment installation, quality control laboratories, and waste management systems.',
      category: 'Industrial',
      location: 'Kisumu',
      completedDate: '2023-08-20',
      area: '25,000 sq ft',
      budget: 'KES 400M',
      client: 'East Africa Foods Ltd',
      duration: '15 months',
      featured: false,
      status: 'completed',
      images: [
        '/projects/manufacturing-plant-1.jpg',
        '/projects/manufacturing-plant-2.jpg'
      ]
    },
    {
      id: '4',
      title: 'Karen Family Villa',
      description: 'Luxury family home with 5 bedrooms, swimming pool, landscaped gardens, and smart home automation systems.',
      category: 'Residential',
      location: 'Karen, Nairobi',
      completedDate: '2023-11-10',
      area: '8,500 sq ft',
      budget: 'KES 120M',
      client: 'Private Client',
      duration: '12 months',
      featured: false,
      status: 'completed',
      images: [
        '/projects/karen-villa-1.jpg',
        '/projects/karen-villa-2.jpg',
        '/projects/karen-villa-3.jpg'
      ]
    },
    {
      id: '5',
      title: 'Mombasa Hotel Resort',
      description: 'Beachfront hotel with 200 rooms, conference facilities, spa, multiple restaurants, and direct beach access.',
      category: 'Commercial',
      location: 'Mombasa',
      completedDate: '2024-03-15',
      area: '80,000 sq ft',
      budget: 'KES 1.2B',
      client: 'Coastal Hospitality Group',
      duration: '30 months',
      featured: true,
      status: 'ongoing',
      images: [
        '/projects/mombasa-hotel-1.jpg',
        '/projects/mombasa-hotel-2.jpg',
        '/projects/mombasa-hotel-3.jpg',
        '/projects/mombasa-hotel-4.jpg'
      ]
    },
    {
      id: '6',
      title: 'Eldoret Warehouse Complex',
      description: 'Multi-purpose warehouse and distribution center with loading docks, office spaces, and climate-controlled storage areas.',
      category: 'Industrial',
      location: 'Eldoret',
      completedDate: '2024-01-20',
      area: '30,000 sq ft',
      budget: 'KES 180M',
      client: 'Kenya Logistics Hub',
      duration: '10 months',
      featured: false,
      status: 'completed',
      images: [
        '/projects/warehouse-complex-1.jpg',
        '/projects/warehouse-complex-2.jpg'
      ]
    }
  ];

  const categories = ['all', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  const featuredProjects = projects.filter(project => project.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Residential':
        return <FaHome className="w-5 h-5" />;
      case 'Commercial':
        return <FaBuilding className="w-5 h-5" />;
      case 'Industrial':
        return <FaIndustry className="w-5 h-5" />;
      default:
        return <FaBuilding className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
         onClick={() => openProjectModal(project)}>
      <div className="relative overflow-hidden h-64">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
                  ${project.title}
                </text>
              </svg>
            `)}`
          }}
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <FaEye className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">View Details</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendar className="w-4 h-4" />
            <span>{formatDate(project.completedDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRuler className="w-4 h-4" />
            <span>{project.area}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Discover our impressive collection of completed and ongoing construction projects across Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500 w-5 h-5" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <span className="text-gray-600">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && selectedCategory === 'all' && !searchTerm && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Showcase of our most impressive and innovative construction achievements
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'All Projects'}
            </h2>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any projects matching your search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
              <button
                onClick={closeProjectModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div>
                <div className="relative mb-4">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100%" height="100%" fill="#f3f4f6"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
                            ${selectedProject.title}
                          </text>
                        </svg>
                      `)}`
                    }}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                      >
                        <FaArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                      >
                        <FaArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {selectedProject.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedProject.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all duration-200 ${
                          index === currentImageIndex ? 'ring-2 ring-primary-600' : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100%" height="100%" fill="#f3f4f6"/>
                              <text x="50%" y="50%" font-family="Arial" font-size="10" fill="#9ca3af" text-anchor="middle" dy=".3em">
                                ${index + 1}
                              </text>
                            </svg>
                          `)}`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                  </span>
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    {getCategoryIcon(selectedProject.category)}
                    <span>{selectedProject.category}</span>
                  </span>
                </div>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{selectedProject.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaCalendar className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Completed</div>
                        <div className="font-medium">{formatDate(selectedProject.completedDate)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaRuler className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Area</div>
                        <div className="font-medium">{selectedProject.area}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaDollarSign className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="font-medium">{selectedProject.budget}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaBuilding className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Client</div>
                        <div className="font-medium">{selectedProject.client}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaClock className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{selectedProject.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>View Case Study</span>
                  </button>
                  <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your construction needs and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Get Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;