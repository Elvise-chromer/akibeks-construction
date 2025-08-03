import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUser, FiFileText, FiMessageCircle, FiCalendar, FiCamera, FiDownload, FiClock, FiDollarSign, FiMapPin, FiBell, FiSettings, FiLogOut, FiSearch, FiFilter, FiEye, FiPaperclip } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  budget: number;
  location: string;
  description: string;
  images: string[];
  documents: Document[];
  milestones: Milestone[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
  category: 'contract' | 'permit' | 'blueprint' | 'invoice' | 'other';
}

interface Milestone {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  description: string;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'message' | 'update' | 'alert';
}

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    setProjects([
      {
        id: '1',
        title: 'Modern Family Home Construction',
        status: 'in-progress',
        progress: 65,
        startDate: '2024-01-15',
        estimatedCompletion: '2024-06-30',
        budget: 850000,
        location: 'Nairobi, Kenya',
        description: 'A modern 4-bedroom family home with contemporary design features.',
        images: ['/images/project1.jpg', '/images/project1-2.jpg'],
        documents: [
          { id: '1', name: 'Construction Contract.pdf', type: 'PDF', size: '2.4 MB', uploadedDate: '2024-01-10', category: 'contract' },
          { id: '2', name: 'Building Permit.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2024-01-12', category: 'permit' },
        ],
        milestones: [
          { id: '1', title: 'Foundation Complete', status: 'completed', dueDate: '2024-02-15', description: 'Foundation and basement work' },
          { id: '2', title: 'Structural Framework', status: 'completed', dueDate: '2024-03-20', description: 'Main structure and framework' },
          { id: '3', title: 'Roofing & External Walls', status: 'in-progress', dueDate: '2024-04-25', description: 'Roofing and external wall construction' },
        ]
      },
      {
        id: '2',
        title: 'Commercial Office Renovation',
        status: 'planning',
        progress: 15,
        startDate: '2024-03-01',
        estimatedCompletion: '2024-08-15',
        budget: 420000,
        location: 'Westlands, Nairobi',
        description: 'Complete renovation of a 3-story commercial office building.',
        images: ['/images/project2.jpg'],
        documents: [
          { id: '3', name: 'Design Proposal.pdf', type: 'PDF', size: '5.6 MB', uploadedDate: '2024-02-28', category: 'blueprint' },
        ],
        milestones: [
          { id: '4', title: 'Design Approval', status: 'in-progress', dueDate: '2024-03-15', description: 'Final design approval and permits' },
        ]
      }
    ]);

    setMessages([
      { id: '1', sender: 'Project Manager', message: 'Roofing work will begin next week as scheduled.', timestamp: '2024-01-20 10:30', type: 'update' },
      { id: '2', sender: 'System', message: 'New document uploaded: Progress Report Q1.pdf', timestamp: '2024-01-19 14:45', type: 'alert' },
      { id: '3', sender: 'Site Engineer', message: 'Foundation inspection completed successfully. Moving to next phase.', timestamp: '2024-01-18 09:15', type: 'message' },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{projects.filter(p => p.status === 'in-progress').length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiClock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{projects.filter(p => p.status === 'completed').length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Investment</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FiBell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">New Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{messages.filter(m => m.type === 'alert').length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-4">
            {messages.slice(0, 3).map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  message.type === 'alert' ? 'bg-red-100 text-red-600' :
                  message.type === 'update' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <FiMessageCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                  <p className="text-sm text-gray-600">{message.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('messages')}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View all messages →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('projects')}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiFileText className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">View Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <FiDownload className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Documents</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FiMessageCircle className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Messages</span>
            </button>
            <Link
              to="/contact"
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <FiUser className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <p className="font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Est. Completion:</span>
                  <p className="font-medium text-gray-900">{new Date(project.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <FiEye className="w-4 h-4 inline mr-2" />
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiMessageCircle className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Documents</h3>
          <div className="space-y-4">
            {projects.flatMap(project => 
              project.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiPaperclip className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.size} • {doc.category} • {doc.uploadedDate}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <FiDownload className="w-4 h-4 inline mr-2" />
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages & Updates</h3>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  message.type === 'alert' ? 'bg-red-100 text-red-600' :
                  message.type === 'update' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <FiMessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{message.sender}</p>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-600">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, John Doe</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <FiBell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FiSettings className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FiLogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FiUser },
              { id: 'projects', label: 'Projects', icon: FiFileText },
              { id: 'documents', label: 'Documents', icon: FiDownload },
              { id: 'messages', label: 'Messages', icon: FiMessageCircle },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'messages' && renderMessages()}
      </main>
    </div>
  );
};

export default ClientPortal;