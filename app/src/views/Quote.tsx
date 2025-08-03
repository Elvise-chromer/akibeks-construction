import React, { useState } from 'react';
import { HiCalculator, HiMail, HiPhone, HiUser, HiOfficeBuilding } from 'react-icons/hi';

const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote request submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-height-small bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container-custom h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="heading-1 mb-4">Request a Quote</h1>
            <p className="text-body-large mb-8">
              Get a detailed estimate for your construction project. Our team will review your requirements and provide a comprehensive quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8 text-center">
                <HiCalculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="heading-2 mb-4">Project Quote Request</h2>
                <p className="text-gray-600">
                  Please provide detailed information about your project so we can give you an accurate estimate.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input pl-10"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input pl-10"
                        placeholder="+254-700-000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <div className="relative">
                      <HiOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input pl-10"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Construction</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="industrial">Industrial Facility</option>
                      <option value="renovation">Renovation/Remodeling</option>
                      <option value="maintenance">Maintenance Services</option>
                      <option value="consultation">Consultation Only</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1m">Under KSh 1M</option>
                      <option value="1m-5m">KSh 1M - 5M</option>
                      <option value="5m-10m">KSh 5M - 10M</option>
                      <option value="10m-50m">KSh 10M - 50M</option>
                      <option value="50m-100m">KSh 50M - 100M</option>
                      <option value="over-100m">Over KSh 100M</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="over-1year">Over 1 year</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="City, County, Kenya"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Please provide detailed information about your project including size, specifications, special requirements, and any other relevant details..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Submit Quote Request
                  </button>
                  <p className="text-sm text-gray-600 mt-4">
                    We'll review your request and get back to you within 24 hours with a detailed quote.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-8">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Review & Analysis</h3>
                <p className="text-gray-600">
                  Our team reviews your requirements and conducts a preliminary analysis of your project.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Site Consultation</h3>
                <p className="text-gray-600">
                  We schedule a site visit (if needed) to better understand your project requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Detailed Quote</h3>
                <p className="text-gray-600">
                  You receive a comprehensive quote with timeline, costs, and project specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;