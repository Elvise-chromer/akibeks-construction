import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlus, HiSearch, HiFilter, HiDownload, HiEye, HiPencil, HiTrash,
  HiUsers, HiCalendar, HiClock, HiDocumentText, HiPhotograph,
  HiChartBar, HiCheckCircle, HiExclamationCircle, HiInformationCircle,
  HiArrowUp, HiArrowDown, HiX, HiUpload, HiTag, HiLocationMarker
} from 'react-icons/hi';
import { useAuthContext } from '../../../lib';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'construction' | 'renovation' | 'maintenance' | 'consultation';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  location: string;
  teamMembers: TeamMember[];
  milestones: Milestone[];
  documents: Document[];
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
  category: 'before' | 'progress' | 'after' | 'documentation';
}

const ProjectManagement: React.FC = () => {
  const { user } = useAuthContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'startDate' | 'priority' | 'progress'>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Downtown Office Complex',
        description: 'Modern 12-story office building with sustainable features',
        status: 'active',
        priority: 'high',
        type: 'construction',
        clientName: 'MetroCorp Ltd',
        clientEmail: 'contact@metrocorp.com',
        clientPhone: '+254-700-123456',
        startDate: '2024-01-15',
        endDate: '2024-12-15',
        budget: 25000000,
        progress: 45,
        location: 'Nairobi CBD, Kenya',
        teamMembers: [
          { id: '1', name: 'John Doe', role: 'Project Manager', email: 'john@akibeks.com' },
          { id: '2', name: 'Jane Smith', role: 'Architect', email: 'jane@akibeks.com' },
          { id: '3', name: 'Mike Johnson', role: 'Site Engineer', email: 'mike@akibeks.com' }
        ],
        milestones: [
          { id: '1', title: 'Foundation Complete', description: 'Complete foundation work', dueDate: '2024-03-15', completed: true, completedAt: '2024-03-10' },
          { id: '2', title: 'Structure to 6th Floor', description: 'Complete structure up to 6th floor', dueDate: '2024-06-15', completed: true, completedAt: '2024-06-10' },
          { id: '3', title: 'Structure Complete', description: 'Complete full structure', dueDate: '2024-09-15', completed: false },
          { id: '4', title: 'Interior Finishing', description: 'Complete interior works', dueDate: '2024-11-15', completed: false }
        ],
        documents: [
          { id: '1', name: 'Architectural Drawings.pdf', type: 'pdf', size: 5242880, uploadedAt: '2024-01-10', uploadedBy: 'Jane Smith', url: '#' },
          { id: '2', name: 'Structural Plans.dwg', type: 'dwg', size: 2097152, uploadedAt: '2024-01-12', uploadedBy: 'Mike Johnson', url: '#' }
        ],
        images: [
          { id: '1', url: '/api/placeholder/300/200', caption: 'Site before construction', uploadedAt: '2024-01-15', category: 'before' },
          { id: '2', url: '/api/placeholder/300/200', caption: 'Foundation progress', uploadedAt: '2024-03-10', category: 'progress' }
        ],
        createdAt: '2024-01-10',
        updatedAt: '2024-11-20'
      },
      {
        id: '2',
        title: 'Residential Villa Renovation',
        description: 'Complete renovation of luxury villa in Karen',
        status: 'planning',
        priority: 'medium',
        type: 'renovation',
        clientName: 'Sarah Williams',
        clientEmail: 'sarah.williams@email.com',
        clientPhone: '+254-722-987654',
        startDate: '2024-02-01',
        endDate: '2024-08-01',
        budget: 8500000,
        progress: 0,
        location: 'Karen, Nairobi',
        teamMembers: [
          { id: '4', name: 'Alice Brown', role: 'Interior Designer', email: 'alice@akibeks.com' },
          { id: '5', name: 'Bob Wilson', role: 'Project Coordinator', email: 'bob@akibeks.com' }
        ],
        milestones: [
          { id: '5', title: 'Design Approval', description: 'Client approval of renovation designs', dueDate: '2024-01-30', completed: false },
          { id: '6', title: 'Demolition Phase', description: 'Complete demolition of old structures', dueDate: '2024-03-15', completed: false }
        ],
        documents: [],
        images: [],
        createdAt: '2024-01-05',
        updatedAt: '2024-01-20'
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'startDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openModal = (type: 'view' | 'edit' | 'create', project?: Project) => {
    setModalType(type);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        // TODO: Replace with actual API call
        console.log('Deleting project:', projectId);
        
        // Remove from local state for now
        setProjects(projects.filter(p => p.id !== projectId));
        
        // Show success message (you can replace with toast notification)
        alert('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600">Manage and track all your construction projects</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2">
            <HiDownload className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => openModal('create')}
            className="btn-primary flex items-center gap-2"
          >
            <HiPlus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, clients, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Types</option>
            <option value="construction">Construction</option>
            <option value="renovation">Renovation</option>
            <option value="maintenance">Maintenance</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="form-select w-auto"
          >
            <option value="startDate">Start Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="progress">Progress</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {sortOrder === 'asc' ? <HiArrowUp className="w-4 h-4" /> : <HiArrowDown className="w-4 h-4" />}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <HiLocationMarker className="w-3 h-3" />
                        {project.location}
                      </div>
                      <div className="text-sm text-gray-500">{project.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.clientName}</div>
                      <div className="text-sm text-gray-500">{project.clientEmail}</div>
                      <div className="text-sm text-gray-500">{project.clientPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(project.budget)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatDate(project.startDate)}</div>
                    <div className="text-sm text-gray-500">to {formatDate(project.endDate)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('view', project)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Project"
                      >
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', project)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Project"
                      >
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Project"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-md">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {modalType === 'create' ? 'Create New Project' : 
                     modalType === 'edit' ? 'Edit Project' : 'Project Details'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                {selectedProject && modalType === 'view' && (
                  <div className="space-y-6">
                    {/* Project Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedProject.title}</h3>
                        <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedProject.priority)}`}>
                            {selectedProject.priority} priority
                          </span>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {selectedProject.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Start Date:</span>
                            <div className="text-gray-900">{formatDate(selectedProject.startDate)}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">End Date:</span>
                            <div className="text-gray-900">{formatDate(selectedProject.endDate)}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Budget:</span>
                            <div className="text-gray-900">{formatCurrency(selectedProject.budget)}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Location:</span>
                            <div className="text-gray-900">{selectedProject.location}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Progress</h4>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{selectedProject.progress}%</span>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-2">Client Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-gray-900">{selectedProject.clientName}</div>
                          <div className="text-gray-600">{selectedProject.clientEmail}</div>
                          <div className="text-gray-600">{selectedProject.clientPhone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <HiUsers className="w-5 h-5" />
                        Team Members ({selectedProject.teamMembers.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProject.teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <HiCheckCircle className="w-5 h-5" />
                        Milestones ({selectedProject.milestones.length})
                      </h4>
                      <div className="space-y-3">
                        {selectedProject.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className={`p-4 rounded-lg border-l-4 ${
                              milestone.completed 
                                ? 'bg-green-50 border-green-400' 
                                : new Date(milestone.dueDate) < new Date()
                                ? 'bg-red-50 border-red-400'
                                : 'bg-blue-50 border-blue-400'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                  <span>Due: {formatDate(milestone.dueDate)}</span>
                                  {milestone.completed && milestone.completedAt && (
                                    <span>Completed: {formatDate(milestone.completedAt)}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center">
                                {milestone.completed ? (
                                  <HiCheckCircle className="w-6 h-6 text-green-500" />
                                ) : new Date(milestone.dueDate) < new Date() ? (
                                  <HiExclamationCircle className="w-6 h-6 text-red-500" />
                                ) : (
                                  <HiClock className="w-6 h-6 text-blue-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <HiDocumentText className="w-5 h-5" />
                        Documents ({selectedProject.documents.length})
                      </h4>
                      {selectedProject.documents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProject.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <HiDocumentText className="w-8 h-8 text-blue-500" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{doc.name}</div>
                                <div className="text-sm text-gray-600">
                                  {(doc.size / 1024 / 1024).toFixed(1)} MB • Uploaded by {doc.uploadedBy}
                                </div>
                                <div className="text-sm text-gray-500">{formatDate(doc.uploadedAt)}</div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800">
                                <HiDownload className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <HiDocumentText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No documents uploaded yet</p>
                        </div>
                      )}
                    </div>

                    {/* Images */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <HiPhotograph className="w-5 h-5" />
                        Project Images ({selectedProject.images.length})
                      </h4>
                      {selectedProject.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {selectedProject.images.map((image) => (
                            <div key={image.id} className="group relative">
                              <img
                                src={image.url}
                                alt={image.caption}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                                <HiEye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-900">{image.caption}</p>
                                <p className="text-xs text-gray-500">
                                  {image.category} • {formatDate(image.uploadedAt)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <HiPhotograph className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No images uploaded yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form for Create/Edit */}
                {(modalType === 'create' || modalType === 'edit') && (
                  <div className="text-center py-8 text-gray-500">
                    <HiInformationCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Project form will be implemented here</p>
                    <p className="text-sm">This will include all fields for creating/editing projects</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManagement;