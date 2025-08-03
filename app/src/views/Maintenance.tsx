import React, { useState } from 'react';
import { HiX, HiCog as HiWrench, HiShieldCheck, HiClock, HiCalendar, HiPhone, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

interface MaintenanceRequest {
  serviceType: string;
  urgency: string;
  propertyType: string;
  issueDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  contactName: string;
  email: string;
  phone: string;
  images: File[];
}

interface MaintenancePackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  popular?: boolean;
}

const Maintenance: React.FC = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<MaintenancePackage | null>(null);
  const [requestData, setRequestData] = useState<MaintenanceRequest>({
    serviceType: '',
    urgency: '',
    propertyType: '',
    issueDescription: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    contactName: '',
    email: '',
    phone: '',
    images: []
  });

  const maintenanceServices = [
    {
      id: 'plumbing',
      name: 'Plumbing Services',
      icon: HiWrench,
      description: 'Pipe repairs, drain cleaning, fixture installation',
      services: ['Leak repairs', 'Drain unclogging', 'Toilet repairs', 'Faucet installation', 'Water heater service']
    },
    {
      id: 'electrical',
      name: 'Electrical Services',
      icon: HiShieldCheck,
      description: 'Wiring, outlets, lighting, electrical troubleshooting',
      services: ['Outlet installation', 'Light fixture repair', 'Electrical panel service', 'Wiring repairs', 'Safety inspections']
    },
    {
      id: 'hvac',
      name: 'HVAC Services',
      icon: HiClock,
      description: 'Air conditioning, heating, ventilation systems',
      services: ['AC maintenance', 'Heating repair', 'Duct cleaning', 'Filter replacement', 'System installation']
    },
    {
      id: 'general',
      name: 'General Repairs',
      icon: HiWrench,
      description: 'Carpentry, painting, drywall, general fixes',
      services: ['Drywall repair', 'Painting touch-ups', 'Carpentry work', 'Door adjustments', 'Window repairs']
    },
    {
      id: 'roofing',
      name: 'Roofing Services',
      icon: HiShieldCheck,
      description: 'Roof repairs, gutter cleaning, waterproofing',
      services: ['Leak repairs', 'Gutter cleaning', 'Roof inspection', 'Shingle replacement', 'Waterproofing']
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      icon: HiExclamationCircle,
      description: '24/7 urgent repairs and emergency response',
      services: ['Water damage response', 'Power outages', 'Structural damage', 'Security repairs', 'Storm damage']
    }
  ];

  const maintenancePackages: MaintenancePackage[] = [
    {
      id: 'basic',
      name: 'Basic Maintenance',
      description: 'Essential maintenance services for residential properties',
      features: [
        'Quarterly HVAC filter replacement',
        'Annual plumbing inspection',
        'Electrical safety check',
        'Gutter cleaning (2x per year)',
        'Basic repairs (up to 2 hours per month)',
        'Emergency contact support'
      ],
      price: 'KES 15,000',
      duration: 'per year'
    },
    {
      id: 'premium',
      name: 'Premium Maintenance',
      description: 'Comprehensive maintenance for homes and small buildings',
      features: [
        'Monthly HVAC maintenance',
        'Quarterly plumbing & electrical inspection',
        'Preventive maintenance scheduling',
        'Priority emergency response',
        'Repairs (up to 4 hours per month)',
        '10% discount on additional services',
        'Annual property assessment'
      ],
      price: 'KES 25,000',
      duration: 'per year',
      popular: true
    },
    {
      id: 'commercial',
      name: 'Commercial Maintenance',
      description: 'Full-service maintenance for commercial properties',
      features: [
        'Weekly property inspections',
        'Preventive maintenance program',
        'Emergency response (24/7)',
        'Dedicated maintenance team',
        'Unlimited basic repairs',
        'Compliance inspections',
        'Detailed reporting and documentation',
        'Vendor management'
      ],
      price: 'KES 50,000',
      duration: 'per year'
    }
  ];

  const urgencyLevels = [
    { id: 'low', name: 'Low Priority', description: 'Can wait 1-2 weeks', color: 'text-green-600' },
    { id: 'medium', name: 'Medium Priority', description: 'Needs attention within a few days', color: 'text-yellow-600' },
    { id: 'high', name: 'High Priority', description: 'Urgent - needs attention within 24 hours', color: 'text-orange-600' },
    { id: 'emergency', name: 'Emergency', description: 'Immediate attention required', color: 'text-red-600' }
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestData.contactName || !requestData.email || !requestData.phone || !requestData.serviceType) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Maintenance request submitted! We will contact you shortly.');
    
    // Reset form
    setRequestData({
      serviceType: '',
      urgency: '',
      propertyType: '',
      issueDescription: '',
      location: '',
      preferredDate: '',
      preferredTime: '',
      contactName: '',
      email: '',
      phone: '',
      images: []
    });
    setShowRequestModal(false);
  };

  const handlePackageSelect = (pkg: MaintenancePackage) => {
    setSelectedPackage(pkg);
    setShowPackageModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setRequestData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Maintenance Services
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Keep your property in perfect condition with our comprehensive maintenance 
              services. From emergency repairs to preventive maintenance programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn-primary"
              >
                Request Service
              </button>
              <a href="tel:+254700123456" className="btn-outline">
                Emergency: +254 700 123 456
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
              Our Maintenance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional maintenance services to keep your property functioning optimally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maintenanceServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-100 text-primary-600 rounded-lg p-3">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-800">{service.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.services.map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-700">
                      <HiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => {
                    setRequestData(prev => ({ ...prev, serviceType: service.id }));
                    setShowRequestModal(true);
                  }}
                  className="w-full btn-outline"
                >
                  Request Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Packages */}
      <div className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
              Maintenance Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive maintenance packages designed to keep 
              your property in excellent condition year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenancePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-lg shadow-lg border-2 p-8 ${
                  pkg.popular ? 'border-primary-600' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-primary-600">
                    {pkg.price}
                    <span className="text-sm text-gray-500 font-normal">/{pkg.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <HiCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className={`w-full ${
                    pkg.popular ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Services Banner */}
      <div className="bg-red-600 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <HiExclamationCircle className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">Emergency Services Available 24/7</h3>
                <p className="text-red-100">Urgent repairs and emergency response</p>
              </div>
            </div>
            <a
              href="tel:+254700123456"
              className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Call Emergency Line
            </a>
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-secondary-800">
                Request Maintenance Service
              </h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleRequestSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    required
                    value={requestData.serviceType}
                    onChange={(e) => setRequestData({ ...requestData, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select service type</option>
                    {maintenanceServices.map((service) => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={requestData.urgency}
                    onChange={(e) => setRequestData({ ...requestData, urgency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select urgency</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={requestData.propertyType}
                    onChange={(e) => setRequestData({ ...requestData, propertyType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={requestData.location}
                    onChange={(e) => setRequestData({ ...requestData, location: e.target.value })}
                    placeholder="Property address or area"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={requestData.preferredDate}
                    onChange={(e) => setRequestData({ ...requestData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={requestData.preferredTime}
                    onChange={(e) => setRequestData({ ...requestData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={requestData.contactName}
                    onChange={(e) => setRequestData({ ...requestData, contactName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={requestData.email}
                    onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={requestData.phone}
                    onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Description
                </label>
                <textarea
                  rows={4}
                  value={requestData.issueDescription}
                  onChange={(e) => setRequestData({ ...requestData, issueDescription: e.target.value })}
                  placeholder="Please describe the issue or maintenance needed..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {showPackageModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-secondary-800">
                {selectedPackage.name} Package
              </h3>
              <button
                onClick={() => setShowPackageModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600">
                  {selectedPackage.price}
                  <span className="text-sm text-gray-500 font-normal">/{selectedPackage.duration}</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Contact us to discuss this package and customize it for your needs.
                </p>
                <div className="flex gap-4">
                  <a href="/contact" className="btn-primary flex-1">
                    Contact Sales
                  </a>
                  <a href="tel:+254700123456" className="btn-outline flex-1">
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;