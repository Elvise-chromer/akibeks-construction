import React, { useState } from 'react';
import { HiX, HiMail, HiPhone, HiLocationMarker, HiCalendar, HiClock, HiUsers, HiClipboardList } from 'react-icons/hi';
import toast from 'react-hot-toast';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const jobs: Job[] = [
    {
      id: 1,
      title: "Construction Project Manager",
      department: "Project Management",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "5+ years",
      salary: "KES 150,000 - 250,000",
      description: "Lead construction projects from planning to completion, ensuring quality, timeline, and budget adherence.",
      requirements: [
        "Bachelor's degree in Construction Management or Civil Engineering",
        "5+ years of project management experience",
        "PMP certification preferred",
        "Strong leadership and communication skills",
        "Knowledge of construction regulations in Kenya"
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Health insurance for employee and family",
        "Professional development opportunities",
        "Company vehicle allowance",
        "Retirement savings plan"
      ]
    },
    {
      id: 2,
      title: "Site Supervisor",
      department: "Operations",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "3+ years",
      salary: "KES 80,000 - 120,000",
      description: "Oversee daily construction activities, ensure safety compliance, and coordinate with project teams.",
      requirements: [
        "Diploma in Construction or related field",
        "3+ years of site supervision experience",
        "NEMA and OSHA certifications",
        "Strong problem-solving abilities",
        "Fluent in English and Swahili"
      ],
      benefits: [
        "Health and dental insurance",
        "Transport allowance",
        "Safety training and certifications",
        "Career advancement opportunities",
        "Annual leave and sick days"
      ]
    },
    {
      id: 3,
      title: "Quantity Surveyor",
      department: "Estimation",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "4+ years",
      salary: "KES 100,000 - 180,000",
      description: "Prepare cost estimates, manage project budgets, and conduct quantity take-offs for construction projects.",
      requirements: [
        "Bachelor's degree in Quantity Surveying",
        "4+ years of QS experience in construction",
        "Proficiency in QS software (CostX, Buildsoft)",
        "Strong analytical and mathematical skills",
        "Membership in relevant professional bodies"
      ],
      benefits: [
        "Competitive salary package",
        "Professional membership fees covered",
        "Training in latest QS software",
        "Performance-based bonuses",
        "Flexible working arrangements"
      ]
    },
    {
      id: 4,
      title: "Electrical Technician",
      department: "Technical",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "2+ years",
      salary: "KES 60,000 - 90,000",
      description: "Install and maintain electrical systems in residential and commercial construction projects.",
      requirements: [
        "Certificate in Electrical Engineering",
        "2+ years of electrical installation experience",
        "Valid electrical license",
        "Knowledge of electrical codes and safety standards",
        "Ability to read electrical drawings"
      ],
      benefits: [
        "Health insurance coverage",
        "Safety equipment provided",
        "Continuous training programs",
        "Overtime compensation",
        "Tool allowance"
      ]
    },
    {
      id: 5,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "2+ years",
      salary: "KES 70,000 - 100,000",
      description: "Develop and execute marketing strategies to promote our construction services and build brand awareness.",
      requirements: [
        "Bachelor's degree in Marketing or Communications",
        "2+ years of marketing experience",
        "Digital marketing skills (SEO, social media, content)",
        "Excellent writing and communication skills",
        "Knowledge of the construction industry preferred"
      ],
      benefits: [
        "Creative work environment",
        "Marketing conference attendance",
        "Digital marketing tool subscriptions",
        "Performance bonuses",
        "Professional development budget"
      ]
    }
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setApplicationData({ ...applicationData, position: job.title });
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    toast.success('Application submitted successfully! We will contact you soon.');
    
    // Reset form and close modal
    setApplicationData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      coverLetter: ''
    });
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-300">
              Build your career with Kenya's leading construction company. We offer exciting 
              opportunities for growth and professional development.
            </p>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover rewarding career opportunities and become part of our dedicated team 
              of construction professionals.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-secondary-800">{job.title}</h3>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <HiLocationMarker className="h-4 w-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <HiClock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <HiUsers className="h-4 w-4 mr-2" />
                        <span className="text-sm">{job.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <HiClipboardList className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="btn-primary w-full lg:w-auto"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Company Benefits */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
              Why Work With Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <HiUsers className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">Great Team Culture</h4>
                <p className="text-gray-600 text-sm">Work with passionate professionals in a collaborative environment</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <HiClipboardList className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">Career Growth</h4>
                <p className="text-gray-600 text-sm">Continuous learning opportunities and clear advancement paths</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <HiCalendar className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">Work-Life Balance</h4>
                <p className="text-gray-600 text-sm">Flexible schedules and comprehensive benefits package</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-secondary-800">
                Apply for {selectedJob?.title}
              </h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleApplicationSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
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
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
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
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={6}
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;