import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiPlus, HiSearch, HiFilter, HiCalendar, HiClock, HiUser, HiFlag,
  HiCheckCircle, HiExclamationCircle, HiPause, HiPlay, HiTrash,
  HiPencil, HiEye, HiChevronDown, HiChevronRight, HiClipboardList,
  HiChat, HiPaperClip, HiRefresh, HiDownload, HiX, HiCloudUpload
} from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

interface ProjectTask {
  id: string;
  project_id: string;
  project_name: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  assigned_user_name?: string;
  start_date?: string;
  due_date?: string;
  completed_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  percentage_complete: number;
  parent_task_id?: string;
  dependencies: string[];
  attachments: any[];
  tags: string[];
  notes?: string;
  comments_count: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  created_by_name: string;
}

interface Comment {
  id: string;
  task_id: string;
  user_id: string;
  user_name: string;
  comment: string;
  is_internal: boolean;
  attachments: any[];
  created_at: string;
  updated_at: string;
}

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newAttachment, setNewAttachment] = useState<File | null>(null);

  // Mock data
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const mockTasks: ProjectTask[] = [
        {
          id: '1',
          project_id: 'proj1',
          project_name: 'Downtown Office Complex',
          title: 'Site Preparation',
          description: 'Clear and prepare the construction site for foundation work',
          status: 'completed',
          priority: 'high',
          assigned_to: 'user1',
          assigned_user_name: 'John Doe',
          start_date: '2024-01-15',
          due_date: '2024-01-25',
          completed_date: '2024-01-24',
          estimated_hours: 80,
          actual_hours: 75,
          percentage_complete: 100,
          dependencies: [],
          attachments: [],
          tags: ['site-work', 'preparation'],
          notes: 'Site cleared successfully ahead of schedule',
          comments_count: 3,
          created_at: '2024-01-10T08:00:00Z',
          updated_at: '2024-01-24T16:30:00Z',
          created_by: 'user1',
          created_by_name: 'John Doe'
        },
        {
          id: '2',
          project_id: 'proj1',
          project_name: 'Downtown Office Complex',
          title: 'Foundation Excavation',
          description: 'Excavate foundation according to architectural plans',
          status: 'in_progress',
          priority: 'high',
          assigned_to: 'user2',
          assigned_user_name: 'Jane Smith',
          start_date: '2024-01-26',
          due_date: '2024-02-05',
          estimated_hours: 120,
          actual_hours: 60,
          percentage_complete: 50,
          dependencies: ['1'],
          attachments: [{ name: 'foundation_plans.pdf', size: '2.5MB' }],
          tags: ['foundation', 'excavation'],
          notes: 'Weather delays possible',
          comments_count: 5,
          created_at: '2024-01-20T09:00:00Z',
          updated_at: '2024-02-01T14:20:00Z',
          created_by: 'user1',
          created_by_name: 'John Doe'
        },
        {
          id: '3',
          project_id: 'proj1',
          project_name: 'Downtown Office Complex',
          title: 'Concrete Pouring',
          description: 'Pour concrete for foundation',
          status: 'pending',
          priority: 'medium',
          assigned_to: 'user3',
          assigned_user_name: 'Bob Johnson',
          start_date: '2024-02-06',
          due_date: '2024-02-12',
          estimated_hours: 60,
          percentage_complete: 0,
          dependencies: ['2'],
          attachments: [],
          tags: ['concrete', 'foundation'],
          comments_count: 1,
          created_at: '2024-01-25T10:00:00Z',
          updated_at: '2024-01-25T10:00:00Z',
          created_by: 'user1',
          created_by_name: 'John Doe'
        },
        {
          id: '4',
          project_id: 'proj2',
          project_name: 'Residential Villa',
          title: 'Architectural Review',
          description: 'Review and approve architectural plans',
          status: 'blocked',
          priority: 'urgent',
          assigned_to: 'user4',
          assigned_user_name: 'Alice Wilson',
          start_date: '2024-01-20',
          due_date: '2024-01-30',
          estimated_hours: 40,
          actual_hours: 35,
          percentage_complete: 85,
          dependencies: [],
          attachments: [
            { name: 'plans_v1.pdf', size: '5.2MB' },
            { name: 'revisions.docx', size: '1.1MB' }
          ],
          tags: ['architecture', 'review', 'urgent'],
          notes: 'Waiting for client approval on design changes',
          comments_count: 8,
          created_at: '2024-01-15T11:00:00Z',
          updated_at: '2024-01-28T13:45:00Z',
          created_by: 'user4',
          created_by_name: 'Alice Wilson'
        }
      ];
      
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks
  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProject) {
      filtered = filtered.filter(task => task.project_id === selectedProject);
    }

    if (selectedStatus) {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }

    if (selectedPriority) {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    if (selectedAssignee) {
      filtered = filtered.filter(task => task.assigned_to === selectedAssignee);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, selectedProject, selectedStatus, selectedPriority, selectedAssignee]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <HiCheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <HiPlay className="w-5 h-5 text-blue-600" />;
      case 'pending': return <HiClock className="w-5 h-5 text-yellow-600" />;
      case 'blocked': return <HiExclamationCircle className="w-5 h-5 text-red-600" />;
      case 'cancelled': return <HiX className="w-5 h-5 text-gray-600" />;
      default: return <HiClock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <HiFlag className="w-4 h-4 text-red-600" />;
      case 'high': return <HiFlag className="w-4 h-4 text-orange-600" />;
      case 'medium': return <HiFlag className="w-4 h-4 text-yellow-600" />;
      case 'low': return <HiFlag className="w-4 h-4 text-green-600" />;
      default: return <HiFlag className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (task: ProjectTask) => {
    if (!task.due_date || task.status === 'completed') return false;
    return new Date(task.due_date) < new Date();
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProject('');
    setSelectedStatus('');
    setSelectedPriority('');
    setSelectedAssignee('');
  };

  const exportTasks = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Task,Project,Status,Priority,Assignee,Due Date,Progress\n"
      + filteredTasks.map(task => 
          `"${task.title}","${task.project_name}","${task.status}","${task.priority}","${task.assigned_user_name || 'Unassigned'}","${task.due_date || ''}","${task.percentage_complete}%"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tasks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mock link sharing handler
  const handleShareStatus = (task: ProjectTask) => {
    // In real app, call backend to generate a secure, expiring link
    const token = uuidv4();
    setShareLink(`${window.location.origin}/tasks/shared/${token}`);
    setShowShareModal(true);
  };

  const handleAddComment = () => {
    if (!selectedTask || !newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: uuidv4(),
        task_id: selectedTask.id,
        user_id: 'admin',
        user_name: 'Admin',
        comment: newComment,
        is_internal: false,
        attachments: newAttachment ? [{ name: newAttachment.name, size: `${(newAttachment.size/1024/1024).toFixed(2)}MB` }] : [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
    setNewComment('');
    setNewAttachment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Manage project tasks and track progress</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchTasks}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <HiRefresh className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={exportTasks}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <HiDownload className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">View:</span>
        <div className="flex rounded-md shadow-sm">
          {[
            { id: 'list', name: 'List', icon: HiClipboardList },
            { id: 'kanban', name: 'Kanban', icon: HiFlag },
            { id: 'calendar', name: 'Calendar', icon: HiCalendar }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`flex items-center px-3 py-2 text-sm font-medium ${
                viewMode === mode.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${
                mode.id === 'list' ? 'rounded-l-md' :
                mode.id === 'calendar' ? 'rounded-r-md' : ''
              } border border-gray-300`}
            >
              <mode.icon className="w-4 h-4 mr-2" />
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Project Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Projects</option>
              <option value="proj1">Downtown Office Complex</option>
              <option value="proj2">Residential Villa</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Assignee Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Assignees</option>
              <option value="user1">John Doe</option>
              <option value="user2">Jane Smith</option>
              <option value="user3">Bob Johnson</option>
              <option value="user4">Alice Wilson</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <HiClipboardList className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredTasks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <HiPlay className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <HiCheckCircle className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <HiExclamationCircle className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTasks.filter(t => isOverdue(t)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Tasks ({filteredTasks.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskExpansion(task.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedTasks.has(task.id) ? (
                          <HiChevronDown className="w-5 h-5" />
                        ) : (
                          <HiChevronRight className="w-5 h-5" />
                        )}
                      </button>
                      
                      {getStatusIcon(task.status)}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                          {isOverdue(task) && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{task.project_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(task.priority)}
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>

                    {task.assigned_user_name && (
                      <div className="flex items-center space-x-1">
                        <HiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{task.assigned_user_name}</span>
                      </div>
                    )}

                    {task.due_date && (
                      <div className="flex items-center space-x-1">
                        <HiCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatDate(task.due_date)}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskDetails(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShareStatus(task)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <HiClipboardList className="w-4 h-4" />
                        <span className="sr-only">Share Status</span>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <HiPencil className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 ml-8">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{task.percentage_complete}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${task.percentage_complete}%` }}
                    ></div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTasks.has(task.id) && (
                  <div className="mt-4 ml-8 space-y-4">
                    {task.description && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Description</h5>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {task.estimated_hours && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-1">Estimated Hours</h5>
                          <p className="text-sm text-gray-600">{task.estimated_hours}h</p>
                        </div>
                      )}

                      {task.actual_hours && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-1">Actual Hours</h5>
                          <p className="text-sm text-gray-600">{task.actual_hours}h</p>
                        </div>
                      )}

                      {task.comments_count > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-1">Comments</h5>
                          <div className="flex items-center space-x-1">
                            <HiChat className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{task.comments_count}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {task.tags.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Tags</h5>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.attachments.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Attachments</h5>
                        <div className="space-y-1">
                          {task.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <HiPaperClip className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.notes && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Notes</h5>
                        <p className="text-sm text-gray-600">{task.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
              <button
                onClick={() => setShowTaskDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
                  <p className="text-gray-600">{selectedTask.project_name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Task Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs font-medium text-gray-500">Status</dt>
                        <dd className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(selectedTask.status)}
                          <span className="text-sm text-gray-900 capitalize">
                            {selectedTask.status.replace('_', ' ')}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">Priority</dt>
                        <dd className="flex items-center space-x-2 mt-1">
                          {getPriorityIcon(selectedTask.priority)}
                          <span className="text-sm text-gray-900 capitalize">{selectedTask.priority}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">Assignee</dt>
                        <dd className="text-sm text-gray-900 mt-1">
                          {selectedTask.assigned_user_name || 'Unassigned'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">Progress</dt>
                        <dd className="mt-1">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${selectedTask.percentage_complete}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{selectedTask.percentage_complete}%</span>
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                    <dl className="space-y-2">
                      {selectedTask.start_date && (
                        <div>
                          <dt className="text-xs font-medium text-gray-500">Start Date</dt>
                          <dd className="text-sm text-gray-900 mt-1">{formatDate(selectedTask.start_date)}</dd>
                        </div>
                      )}
                      {selectedTask.due_date && (
                        <div>
                          <dt className="text-xs font-medium text-gray-500">Due Date</dt>
                          <dd className="text-sm text-gray-900 mt-1">{formatDate(selectedTask.due_date)}</dd>
                        </div>
                      )}
                      {selectedTask.completed_date && (
                        <div>
                          <dt className="text-xs font-medium text-gray-500">Completed</dt>
                          <dd className="text-sm text-gray-900 mt-1">{formatDate(selectedTask.completed_date)}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {selectedTask.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Description</h4>
                    <p className="text-sm text-gray-700">{selectedTask.description}</p>
                  </div>
                )}

                {selectedTask.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTask.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {selectedTask.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center space-x-3">
                            <HiPaperClip className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Comments</h4>
                  <div className="space-y-4">
                    {comments.filter(c => c.task_id === selectedTask.id).map(comment => (
                      <div key={comment.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">{comment.user_name}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-700 text-sm whitespace-pre-line">{comment.comment}</div>
                        {comment.attachments.length > 0 && (
                          <div className="mt-1 flex items-center gap-2">
                            <HiPaperClip className="w-4 h-4 text-gray-400" />
                            {comment.attachments.map((a, i) => <span key={i} className="text-xs text-gray-600">{a.name}</span>)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <textarea
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                    />
                    <input type="file" onChange={e => setNewAttachment(e.target.files?.[0] || null)} className="self-end" />
                    <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 self-end">Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter task description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select project</option>
                    <option value="1">Westlands Office Complex</option>
                    <option value="2">Karen Residential Villa</option>
                    <option value="3">Industrial Warehouse</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assigned To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select assignee</option>
                    <option value="1">John Smith</option>
                    <option value="2">Sarah Johnson</option>
                    <option value="3">Mike Wilson</option>
                    <option value="4">Lisa Brown</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Estimated Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Example: design, frontend, urgent</p>
              </div>

              {/* Dependencies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dependencies
                </label>
                <select 
                  multiple 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  style={{ height: '100px' }}
                >
                  <option value="1">Site Survey - Foundation Planning</option>
                  <option value="2">Permits Approval - Electrical Installation</option>
                  <option value="3">Material Procurement - Concrete Pouring</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple dependencies</p>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <HiCloudUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop files here, or <span className="text-primary-600 cursor-pointer">browse</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                </div>
              </div>
            </form>

            <div className="mt-6 flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Status Modal */}
      {showShareModal && shareLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Share Task Status</h3>
            <p className="text-gray-700 mb-2">Send this link to a team member to update or view the task status:</p>
            <input type="text" value={shareLink} readOnly className="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
            <button onClick={() => {navigator.clipboard.writeText(shareLink);}} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">Copy Link</button>
            <button onClick={() => setShowShareModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;