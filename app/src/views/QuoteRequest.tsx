import React, { useState } from 'react';
import { HiCheckCircle, HiClipboardList, HiHome, HiOfficeBuilding, HiCog, HiColorSwatch, HiCalculator, HiCalendar } from 'react-icons/hi';
import toast from 'react-hot-toast';

interface QuoteFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  
  // Project Information
  projectType: string;
  projectLocation: string;
  propertyType: string;
  projectSize: string;
  timeline: string;
  budget: string;
  
  // Specific Services
  services: string[];
  
  // Project Details
  description: string;
  hasPlans: boolean;
  needsDesign: boolean;
  
  // Additional Information
  preferredContact: string;
  preferredTime: string;
  attachments: File[];
}

const QuoteRequest: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectLocation: '',
    propertyType: '',
    projectSize: '',
    timeline: '',
    budget: '',
    services: [],
    description: '',
    hasPlans: false,
    needsDesign: false,
    preferredContact: 'email',
    preferredTime: 'morning',
    attachments: []
  });

  const projectTypes = [
    { id: 'residential', name: 'Residential Construction', icon: HiHome, description: 'Homes, apartments, villas' },
    { id: 'commercial', name: 'Commercial Building', icon: HiOfficeBuilding, description: 'Offices, shops, warehouses' },
    { id: 'industrial', name: 'Industrial Projects', icon: HiCog, description: 'Factories, processing plants' },
    { id: 'renovation', name: 'Renovation & Remodeling', icon: HiColorSwatch, description: 'Updates, extensions, repairs' }
  ];

  const availableServices = [
    'Foundation Work',
    'Structural Construction',
    'Roofing',
    'Electrical Installation',
    'Plumbing',
    'Interior Finishing',
    'Exterior Finishing',
    'HVAC Systems',
    'Flooring',
    'Painting',
    'Landscaping',
    'Project Management',
    'Architectural Design',
    'Permit Processing'
  ];

  const budgetRanges = [
    'Under KES 500,000',
    'KES 500,000 - 1,000,000',
    'KES 1,000,000 - 2,500,000',
    'KES 2,500,000 - 5,000,000',
    'KES 5,000,000 - 10,000,000',
    'Over KES 10,000,000'
  ];

  const timelineOptions = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 1 year',
    'Flexible'
  ];

  const handleInputChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.projectType && formData.projectLocation);
      case 3:
        return formData.services.length > 0;
      case 4:
        return !!formData.description;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      // Here you would typically send the data to your backend
      toast.success('Quote request submitted successfully! We will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        projectLocation: '',
        propertyType: '',
        projectSize: '',
        timeline: '',
        budget: '',
        services: [],
        description: '',
        hasPlans: false,
        needsDesign: false,
        preferredContact: 'email',
        preferredTime: 'morning',
        attachments: []
      });
      setCurrentStep(5);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step ? (
              <HiCheckCircle className="h-6 w-6" />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div className={`h-1 w-16 mx-2 ${
              currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-secondary-800 mb-6">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
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
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company/Organization (Optional)
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-secondary-800 mb-6">Project Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Project Type *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                formData.projectType === type.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => handleInputChange('projectType', type.id)}
            >
              <div className="flex items-center space-x-3">
                <type.icon className={`h-6 w-6 ${
                  formData.projectType === type.id ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <div>
                  <h4 className="font-medium text-secondary-800">{type.name}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Location *
          </label>
          <input
            type="text"
            required
            value={formData.projectLocation}
            onChange={(e) => handleInputChange('projectLocation', e.target.value)}
            placeholder="e.g., Nairobi, Karen"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select property type</option>
            <option value="single-family">Single Family Home</option>
            <option value="multi-family">Multi-Family Building</option>
            <option value="apartment">Apartment Complex</option>
            <option value="office">Office Building</option>
            <option value="retail">Retail Space</option>
            <option value="warehouse">Warehouse</option>
            <option value="industrial">Industrial Facility</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Size
          </label>
          <input
            type="text"
            value={formData.projectSize}
            onChange={(e) => handleInputChange('projectSize', e.target.value)}
            placeholder="e.g., 3,000 sq ft, 5 bedrooms"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-secondary-800 mb-6">Services Required *</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableServices.map((service) => (
          <div
            key={service}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              formData.services.includes(service)
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => handleServiceToggle(service)}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 border rounded ${
                formData.services.includes(service)
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300'
              }`}>
                {formData.services.includes(service) && (
                  <HiCheckCircle className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="text-sm font-medium">{service}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasPlans"
            checked={formData.hasPlans}
            onChange={(e) => handleInputChange('hasPlans', e.target.checked)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="hasPlans" className="text-sm font-medium text-gray-700">
            I have architectural plans/drawings
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="needsDesign"
            checked={formData.needsDesign}
            onChange={(e) => handleInputChange('needsDesign', e.target.checked)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="needsDesign" className="text-sm font-medium text-gray-700">
            I need design services
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-secondary-800 mb-6">Project Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          rows={6}
          required
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Please describe your project in detail, including specific requirements, preferences, and any special considerations..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Files (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <HiClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click to upload plans, drawings, or reference images</p>
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, JPG, PNG, DWG (Max 10MB each)</p>
          </label>
        </div>
        
        {formData.attachments.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Uploaded Files:</h4>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          <select
            value={formData.preferredContact}
            onChange={(e) => handleInputChange('preferredContact', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="in-person">In-Person Meeting</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best Time to Contact
          </label>
          <select
            value={formData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="morning">Morning (8AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 5PM)</option>
            <option value="evening">Evening (5PM - 8PM)</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center py-12">
      <HiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-secondary-800 mb-4">
        Quote Request Submitted Successfully!
      </h3>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Thank you for choosing Akibeks Construction. We have received your quote request 
        and will review it carefully. Our team will contact you within 24 hours to discuss 
        your project and provide a detailed quote.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentStep(1)}
          className="btn-outline"
        >
          Submit Another Request
        </button>
        <a href="/" className="btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-gray-300">
              Tell us about your construction project and receive a detailed quote 
              within 24 hours. No obligations, completely free.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Form Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {currentStep < 5 && renderStepIndicator()}
              
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              
              {currentStep < 5 && (
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button onClick={nextStep} className="btn-primary">
                      Next
                    </button>
                  ) : (
                    <button onClick={handleSubmit} className="btn-primary">
                      Submit Quote Request
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;