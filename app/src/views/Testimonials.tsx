import React, { useState } from 'react';
import { HiStar, HiX } from 'react-icons/hi';
import { FaQuoteLeft as HiQuoteLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  rating: number;
  content: string;
  project: string;
  date: string;
}

const Testimonials: React.FC = () => {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [testimonialData, setTestimonialData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    project: '',
    rating: 5,
    content: ''
  });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Kimani",
      title: "Homeowner",
      company: "Private Client",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "Akibeks Construction exceeded our expectations in every way. They built our dream home in Karen with exceptional attention to detail and quality. The project was completed on time and within budget. Their professional team made the entire process stress-free.",
      project: "Luxury Villa in Karen",
      date: "March 2024"
    },
    {
      id: 2,
      name: "John Mwangi",
      title: "CEO",
      company: "TechHub Kenya",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "We needed a modern office space that would reflect our company's innovative spirit. Akibeks delivered beyond our expectations. The construction quality is outstanding, and they incorporated all our technological requirements seamlessly.",
      project: "Corporate Office Complex",
      date: "January 2024"
    },
    {
      id: 3,
      name: "Mary Wanjiku",
      title: "Interior Designer",
      company: "Elegant Spaces Ltd",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "As an interior designer, I work with many contractors, but Akibeks stands out for their craftsmanship and reliability. They understand design requirements and execute them perfectly. I've collaborated with them on multiple projects with excellent results.",
      project: "Residential Renovations",
      date: "February 2024"
    },
    {
      id: 4,
      name: "David Ochieng",
      title: "Managing Director",
      company: "Savanna Manufacturing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "Our industrial facility required specialized construction expertise. Akibeks demonstrated exceptional knowledge of industrial building requirements and safety standards. The facility has been operational for over a year with no issues.",
      project: "Manufacturing Plant",
      date: "December 2023"
    },
    {
      id: 5,
      name: "Grace Nyong'o",
      title: "Property Developer",
      company: "Urban Developments",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "Akibeks has been our go-to construction partner for multiple projects. Their consistency in quality, adherence to timelines, and professional project management make them invaluable to our business. Highly recommended!",
      project: "Multiple Commercial Projects",
      date: "Ongoing Partnership"
    },
    {
      id: 6,
      name: "Peter Kariuki",
      title: "Facility Manager",
      company: "Westgate Shopping Mall",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      content: "The renovation of our shopping mall was a complex project that required minimal disruption to ongoing business. Akibeks planned and executed the work brilliantly, coordinating with tenants and maintaining high safety standards throughout.",
      project: "Shopping Mall Renovation",
      date: "November 2023"
    }
  ];

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!testimonialData.name || !testimonialData.content || !testimonialData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    toast.success('Thank you for your feedback! Your testimonial has been submitted for review.');
    
    // Reset form and close modal
    setTestimonialData({
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      project: '',
      rating: 5,
      content: ''
    });
    setShowSubmissionModal(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <HiStar
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-300">
              Hear what our satisfied clients have to say about our construction services 
              and project delivery excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {totalReviews}+
              </div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                100%
              </div>
              <p className="text-gray-600">Project Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Real experiences from real clients who trusted us with their construction projects.
            </p>
            <button
              onClick={() => setShowSubmissionModal(true)}
              className="btn-primary"
            >
              Share Your Experience
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-secondary-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-primary-600">{testimonial.company}</p>
                  </div>
                  <HiQuoteLeft className="h-8 w-8 text-primary-200 flex-shrink-0" />
                </div>
                
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-secondary-700">
                    Project: {testimonial.project}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join our growing list of satisfied clients. Let us bring your construction 
              vision to life with our expertise and commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Free Quote
              </a>
              <a href="/projects" className="btn-outline">
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-secondary-800">
                Share Your Experience
              </h3>
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitTestimonial} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialData.name}
                    onChange={(e) => setTestimonialData({ ...testimonialData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={testimonialData.title}
                    onChange={(e) => setTestimonialData({ ...testimonialData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={testimonialData.company}
                    onChange={(e) => setTestimonialData({ ...testimonialData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={testimonialData.email}
                    onChange={(e) => setTestimonialData({ ...testimonialData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={testimonialData.phone}
                    onChange={(e) => setTestimonialData({ ...testimonialData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={testimonialData.project}
                    onChange={(e) => setTestimonialData({ ...testimonialData, project: e.target.value })}
                    placeholder="e.g., Home renovation, Office construction"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setTestimonialData({ ...testimonialData, rating: star })}
                      className="focus:outline-none"
                    >
                      <HiStar
                        className={`h-8 w-8 ${
                          star <= testimonialData.rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-300 transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Testimonial *
                </label>
                <textarea
                  rows={6}
                  required
                  value={testimonialData.content}
                  onChange={(e) => setTestimonialData({ ...testimonialData, content: e.target.value })}
                  placeholder="Share your experience working with Akibeks Construction..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowSubmissionModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Submit Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;