import React, { useState } from 'react';
import { HiX, HiChevronLeft, HiChevronRight, HiLocationMarker, HiCalendar } from 'react-icons/hi';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - In real app, this would come from your backend
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Villa Construction",
      category: "residential",
      location: "Karen, Nairobi",
      date: "2024",
      description: "Modern 5-bedroom villa with contemporary design and premium finishes."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Office Complex",
      category: "commercial",
      location: "Westlands, Nairobi",
      date: "2023",
      description: "10-story office building with modern amenities and sustainable design features."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Modern Kitchen Renovation",
      category: "interior",
      location: "Kileleshwa, Nairobi",
      date: "2024",
      description: "Complete kitchen makeover with custom cabinetry and marble countertops."
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Industrial Warehouse",
      category: "industrial",
      location: "Mombasa Road, Nairobi",
      date: "2023",
      description: "Large-scale warehouse facility with advanced loading systems."
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Family Townhouse",
      category: "residential",
      location: "Runda, Nairobi",
      date: "2024",
      description: "Elegant 4-bedroom townhouse with garden and modern amenities."
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Shopping Mall Construction",
      category: "commercial",
      location: "Thika Road, Nairobi",
      date: "2023",
      description: "Multi-level shopping center with parking facilities and entertainment areas."
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Bathroom Suite",
      category: "interior",
      location: "Lavington, Nairobi",
      date: "2024",
      description: "Premium bathroom renovation with marble tiles and modern fixtures."
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Manufacturing Plant",
      category: "industrial",
      location: "Athi River, Kenya",
      date: "2023",
      description: "State-of-the-art manufacturing facility with quality control systems."
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Executive Penthouse",
      category: "residential",
      location: "Kilimani, Nairobi",
      date: "2024",
      description: "Luxury penthouse with panoramic city views and premium finishes."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: images.length },
    { id: 'residential', name: 'Residential', count: images.filter(img => img.category === 'residential').length },
    { id: 'commercial', name: 'Commercial', count: images.filter(img => img.category === 'commercial').length },
    { id: 'interior', name: 'Interior Design', count: images.filter(img => img.category === 'interior').length },
    { id: 'industrial', name: 'Industrial', count: images.filter(img => img.category === 'industrial').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openImageModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const maxIndex = filteredImages.length - 1;
    let newIndex = currentImageIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : maxIndex;
    } else {
      newIndex = currentImageIndex < maxIndex ? currentImageIndex + 1 : 0;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Project Gallery
            </h1>
            <p className="text-xl text-gray-300">
              Explore our portfolio of completed construction projects across Kenya. 
              From residential homes to commercial buildings and industrial facilities.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
              Our Work Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the quality and craftsmanship that defines our construction projects.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                onClick={() => openImageModal(image, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <HiLocationMarker className="h-4 w-4 mr-1" />
                    <span>{image.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <HiCalendar className="h-4 w-4 mr-1" />
                    <span>{image.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <span className="bg-primary-600 px-3 py-1 rounded-full text-sm capitalize">
                  {selectedImage.category}
                </span>
              </div>
              <button
                onClick={closeImageModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <HiX className="h-8 w-8" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <HiChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <HiChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Info */}
            <div className="bg-black bg-opacity-50 text-white p-4 rounded-lg mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <HiLocationMarker className="h-4 w-4 mr-2" />
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center">
                    <HiCalendar className="h-4 w-4 mr-2" />
                    <span>{selectedImage.date}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm">{selectedImage.description}</p>
                </div>
              </div>
              
              {filteredImages.length > 1 && (
                <div className="mt-4 text-center text-sm">
                  Image {currentImageIndex + 1} of {filteredImages.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;