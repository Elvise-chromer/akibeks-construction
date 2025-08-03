import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Save,
  Flag,
  Calendar,
  Clock,
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  X,
  Target,
  BarChart3,
  Download,
  Filter,
  MapPin,
  DollarSign,

  FileText,
  Users
} from 'lucide-react';

interface ProjectMilestone {
  id: string;
  project_id: string;
  project_name: string;
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  start_date: string;
  target_date: string;
  completion_date?: string;
  percentage_complete: number;
  budget_allocated: number;
  budget_spent: number;
  priority: number;
  assigned_to: string;
  assigned_to_name: string;
  dependencies: string[];
  deliverables: string[];
  success_criteria: string;
  risks: any[];
  notes: string;
  color: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface ProgressReport {
  id: string;
  project_id: string;
  milestone_id: string;
  report_date: string;
  overall_progress: number;
  progress_type: 'percentage' | 'task_based' | 'hour_based' | 'milestone_based';
  tasks_completed: number;
  tasks_total: number;
  hours_worked: number;
  hours_estimated: number;
  budget_used: number;
  budget_total: number;
  achievements: string;
  challenges: string;
  next_steps: string;
  risk_assessment: any[];
  team_feedback: string;
  client_feedback: string;
  attachments: any[];
  metrics: any;
  created_at: string;
  created_by: string;
}

const ProjectMilestones: React.FC = () => {
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestone | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view' | 'progress'>('create');
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'timeline'>('list');

  useEffect(() => {
    fetchMilestones();
    fetchProgressReports();
  }, []);

  const fetchMilestones = async () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setMilestones([
        {
          id: '1',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          title: 'Foundation Complete',
          description: 'Complete all foundation work including excavation, concrete pouring, and curing',
          status: 'completed',
          start_date: '2024-01-01',
          target_date: '2024-02-15',
          completion_date: '2024-02-10',
          percentage_complete: 100,
          budget_allocated: 150000,
          budget_spent: 148500,
          priority: 10,
          assigned_to: 'user-1',
          assigned_to_name: 'John Smith',
          dependencies: [],
          deliverables: ['Foundation inspection certificate', 'Concrete test reports'],
          success_criteria: 'Foundation passes all inspections and meets structural requirements',
          risks: [
            { risk: 'Weather delays', probability: 'low', impact: 'medium', mitigation: 'Weather monitoring and contingency planning' }
          ],
          notes: 'Completed ahead of schedule due to favorable weather conditions',
          color: '#10B981',
          order_index: 1,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-02-10T16:30:00Z',
          created_by: 'admin',
          updated_by: 'john-smith'
        },
        {
          id: '2',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          title: 'Structural Framework',
          description: 'Erect the main structural framework including steel beams and concrete columns',
          status: 'in_progress',
          start_date: '2024-02-16',
          target_date: '2024-04-30',
          percentage_complete: 65,
          budget_allocated: 280000,
          budget_spent: 175000,
          priority: 9,
          assigned_to: 'user-2',
          assigned_to_name: 'Sarah Johnson',
          dependencies: ['1'],
          deliverables: ['Structural framework completion', 'Safety inspection clearance'],
          success_criteria: 'All structural elements installed according to engineering specifications',
          risks: [
            { risk: 'Material delivery delays', probability: 'medium', impact: 'high', mitigation: 'Multiple supplier agreements' },
            { risk: 'Weather interruptions', probability: 'medium', impact: 'low', mitigation: 'Indoor work alternatives' }
          ],
          notes: 'Progress is on track. Some minor delays due to permit approval',
          color: '#3B82F6',
          order_index: 2,
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-03-15T14:20:00Z',
          created_by: 'admin',
          updated_by: 'sarah-johnson'
        },
        {
          id: '3',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          title: 'Electrical Systems',
          description: 'Install main electrical systems, wiring, and power distribution',
          status: 'planned',
          start_date: '2024-05-01',
          target_date: '2024-06-15',
          percentage_complete: 0,
          budget_allocated: 120000,
          budget_spent: 0,
          priority: 7,
          assigned_to: 'user-3',
          assigned_to_name: 'Mike Wilson',
          dependencies: ['2'],
          deliverables: ['Electrical system installation', 'Power testing certification'],
          success_criteria: 'All electrical systems operational and code compliant',
          risks: [
            { risk: 'Specialized electrician availability', probability: 'low', impact: 'medium', mitigation: 'Early contractor booking' }
          ],
          notes: 'Waiting for structural framework completion',
          color: '#F59E0B',
          order_index: 3,
          created_at: '2024-02-01T00:00:00Z',
          updated_at: '2024-02-01T00:00:00Z',
          created_by: 'admin',
          updated_by: 'admin'
        },
        {
          id: '4',
          project_id: 'proj-2',
          project_name: 'Residential Housing Development',
          title: 'Site Preparation',
          description: 'Clear land, grade site, and prepare utilities connections',
          status: 'delayed',
          start_date: '2024-01-15',
          target_date: '2024-03-01',
          percentage_complete: 30,
          budget_allocated: 85000,
          budget_spent: 45000,
          priority: 8,
          assigned_to: 'user-4',
          assigned_to_name: 'Emma Davis',
          dependencies: [],
          deliverables: ['Site cleared and graded', 'Utility connections ready'],
          success_criteria: 'Site ready for foundation work with all utilities accessible',
          risks: [
            { risk: 'Environmental permit delays', probability: 'high', impact: 'high', mitigation: 'Working with regulatory agencies' }
          ],
          notes: 'Delayed due to environmental permit issues. Working on resolution',
          color: '#EF4444',
          order_index: 1,
          created_at: '2024-01-10T00:00:00Z',
          updated_at: '2024-03-10T11:45:00Z',
          created_by: 'admin',
          updated_by: 'emma-davis'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchProgressReports = async () => {
    // Mock API call for progress reports
    setTimeout(() => {
      setProgressReports([
        {
          id: '1',
          project_id: 'proj-1',
          milestone_id: '2',
          report_date: '2024-03-15',
          overall_progress: 65,
          progress_type: 'percentage',
          tasks_completed: 13,
          tasks_total: 20,
          hours_worked: 520,
          hours_estimated: 800,
          budget_used: 175000,
          budget_total: 280000,
          achievements: 'Steel framework 80% complete, concrete columns installed',
          challenges: 'Minor permit delays for crane operations',
          next_steps: 'Complete remaining steel beams, begin safety inspections',
          risk_assessment: [
            { risk: 'Weather delays', status: 'mitigated', notes: 'Indoor work prioritized' }
          ],
          team_feedback: 'Team morale is high, good coordination between trades',
          client_feedback: 'Client satisfied with progress and quality',
          attachments: [],
          metrics: { safety_incidents: 0, quality_score: 4.8 },
          created_at: '2024-03-15T17:00:00Z',
          created_by: 'sarah-johnson'
        }
      ]);
    }, 1200);
  };

  const handleCreate = () => {
    setSelectedMilestone(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleEdit = (milestone: ProjectMilestone) => {
    setSelectedMilestone(milestone);
    setModalType('edit');
    setShowModal(true);
  };

  const handleView = (milestone: ProjectMilestone) => {
    setSelectedMilestone(milestone);
    setModalType('view');
    setShowModal(true);
  };

  const handleProgress = (milestone: ProjectMilestone) => {
    setSelectedMilestone(milestone);
    setModalType('progress');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      // Mock delete operation
      console.log('Deleting milestone:', id);
    }
  };

  const handleSave = async (data: any) => {
    // Mock save operation
    console.log('Saving milestone:', data);
    setShowModal(false);
    fetchMilestones();
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(milestones[0] || {}).join(',') + '\n' +
      milestones.map(row => Object.values(row).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `milestones_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Play className="w-4 h-4" />;
      case 'planned': return <Clock className="w-4 h-4" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 9) return 'text-red-600';
    if (priority >= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredMilestones = milestones.filter(milestone => {
    const matchesSearch = milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.project_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || milestone.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || 
                           (priorityFilter === 'high' && milestone.priority >= 8) ||
                           (priorityFilter === 'medium' && milestone.priority >= 5 && milestone.priority < 8) ||
                           (priorityFilter === 'low' && milestone.priority < 5);
    const matchesProject = projectFilter === 'all' || milestone.project_id === projectFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setProjectFilter('all');
  };

  const milestoneStats = {
    total: milestones.length,
    completed: milestones.filter(m => m.status === 'completed').length,
    inProgress: milestones.filter(m => m.status === 'in_progress').length,
    delayed: milestones.filter(m => m.status === 'delayed').length,
    avgProgress: Math.round(milestones.reduce((sum, m) => sum + m.percentage_complete, 0) / milestones.length),
    totalBudget: milestones.reduce((sum, m) => sum + m.budget_allocated, 0),
    spentBudget: milestones.reduce((sum, m) => sum + m.budget_spent, 0)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Milestones</h1>
            <p className="text-gray-600">Track and manage project milestones and progress</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{milestoneStats.total}</p>
              </div>
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{milestoneStats.completed}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-blue-600">{milestoneStats.inProgress}</p>
              </div>
              <Play className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delayed</p>
                <p className="text-xl font-bold text-red-600">{milestoneStats.delayed}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-xl font-bold text-purple-600">{milestoneStats.avgProgress}%</p>
              </div>
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-xl font-bold text-orange-600">
                  {Math.round((milestoneStats.spentBudget / milestoneStats.totalBudget) * 100)}%
                </p>
              </div>
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search milestones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High (8-10)</option>
            <option value="medium">Medium (5-7)</option>
            <option value="low">Low (1-4)</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg ${viewMode === 'kanban' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Users className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg ${viewMode === 'timeline' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || projectFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {viewMode === 'list' && (
            <MilestonesTable 
              milestones={filteredMilestones}
              onEdit={handleEdit}
              onView={handleView}
              onProgress={handleProgress}
              onDelete={handleDelete}
              isLoading={isLoading}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getPriorityColor={getPriorityColor}
            />
          )}
          {viewMode === 'kanban' && (
            <MilestonesKanban 
              milestones={filteredMilestones}
              onEdit={handleEdit}
              onView={handleView}
              onProgress={handleProgress}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getPriorityColor={getPriorityColor}
            />
          )}
          {viewMode === 'timeline' && (
            <MilestonesTimeline 
              milestones={filteredMilestones}
              onEdit={handleEdit}
              onView={handleView}
              onProgress={handleProgress}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getPriorityColor={getPriorityColor}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <MilestoneModal
            type={modalType}
            milestone={selectedMilestone}
            progressReports={progressReports}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Milestones Table Component
const MilestonesTable: React.FC<{
  milestones: ProjectMilestone[];
  onEdit: (milestone: ProjectMilestone) => void;
  onView: (milestone: ProjectMilestone) => void;
  onProgress: (milestone: ProjectMilestone) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getPriorityColor: (priority: number) => string;
}> = ({ milestones, onEdit, onView, onProgress, onDelete, isLoading, getStatusColor, getStatusIcon, getPriorityColor }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {milestones.map((milestone) => (
              <tr key={milestone.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{milestone.title}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{milestone.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{milestone.project_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusIcon(milestone.status)}
                    <span className="ml-1 capitalize">{milestone.status.replace('_', ' ')}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${milestone.percentage_complete}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{milestone.percentage_complete}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Flag className={`w-4 h-4 mr-1 ${getPriorityColor(milestone.priority)}`} />
                    <span className="text-sm text-gray-900">{milestone.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{milestone.assigned_to_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(milestone.target_date).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${milestone.budget_spent.toLocaleString()} / ${milestone.budget_allocated.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((milestone.budget_spent / milestone.budget_allocated) * 100)}% used
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onProgress(milestone)}
                      className="text-purple-600 hover:text-purple-900 p-1"
                      title="Progress Report"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onView(milestone)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(milestone)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(milestone.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Kanban View Component
const MilestonesKanban: React.FC<{
  milestones: ProjectMilestone[];
  onEdit: (milestone: ProjectMilestone) => void;
  onView: (milestone: ProjectMilestone) => void;
  onProgress: (milestone: ProjectMilestone) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getPriorityColor: (priority: number) => string;
}> = ({ milestones, onEdit, onView, onProgress, getStatusColor, getStatusIcon, getPriorityColor }) => {
  const statuses = ['planned', 'in_progress', 'completed', 'delayed', 'cancelled'];
  
  const getMilestonesByStatus = (status: string) => {
    return milestones.filter(m => m.status === status);
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {statuses.map(status => (
        <div key={status} className="flex-shrink-0 w-80">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                {getStatusIcon(status)}
                {status.replace('_', ' ')}
              </h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {getMilestonesByStatus(status).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {getMilestonesByStatus(status).map(milestone => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onView(milestone)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{milestone.title}</h4>
                    <Flag className={`w-4 h-4 ${getPriorityColor(milestone.priority)}`} />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{milestone.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{milestone.project_name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(milestone.target_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      {milestone.assigned_to_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {milestone.percentage_complete}%
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full" 
                      style={{ width: `${milestone.percentage_complete}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onProgress(milestone);
                      }}
                      className="text-purple-600 hover:text-purple-900 p-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(milestone);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Timeline View Component
const MilestonesTimeline: React.FC<{
  milestones: ProjectMilestone[];
  onEdit: (milestone: ProjectMilestone) => void;
  onView: (milestone: ProjectMilestone) => void;
  onProgress: (milestone: ProjectMilestone) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getPriorityColor: (priority: number) => string;
}> = ({ milestones, onEdit, onView, onProgress, getStatusColor, getStatusIcon, getPriorityColor }) => {
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(a.target_date).getTime() - new Date(b.target_date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline View</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-6">
            {sortedMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                {/* Timeline node */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-sm ${getStatusColor(milestone.status).replace('text-', 'bg-').replace('-800', '-500')}`}>
                  {getStatusIcon(milestone.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => onView(milestone)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.project_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag className={`w-4 h-4 ${getPriorityColor(milestone.priority)}`} />
                      <span className="text-sm text-gray-500">
                        {new Date(milestone.target_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {milestone.assigned_to_name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-1" />
                        {milestone.percentage_complete}%
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onProgress(milestone);
                        }}
                        className="text-purple-600 hover:text-purple-900 p-1"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(milestone);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Milestone Modal Component
const MilestoneModal: React.FC<{
  type: 'create' | 'edit' | 'view' | 'progress';
  milestone: ProjectMilestone | null;
  progressReports: ProgressReport[];
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ type, milestone, progressReports, onSave, onClose }) => {
  const [formData, setFormData] = useState(milestone || {
    title: '',
    description: '',
    status: 'planned',
    start_date: '',
    target_date: '',
    percentage_complete: 0,
    budget_allocated: 0,
    priority: 5,
    assigned_to: '',
    success_criteria: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {type === 'create' ? 'Create Milestone' : 
             type === 'edit' ? 'Edit Milestone' : 
             type === 'progress' ? 'Progress Report' : 'Milestone Details'}
          </h3>
        </div>

        {type === 'progress' && milestone ? (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${milestone.percentage_complete}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{milestone.percentage_complete}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Budget Allocated</label>
                      <p className="text-lg font-semibold text-green-600">${milestone.budget_allocated.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Budget Spent</label>
                      <p className="text-lg font-semibold text-orange-600">${milestone.budget_spent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Latest Report</h4>
                {progressReports.filter(r => r.milestone_id === milestone.id).length > 0 ? (
                  <div className="space-y-3">
                    {progressReports.filter(r => r.milestone_id === milestone.id).map(report => (
                      <div key={report.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(report.report_date).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {report.overall_progress}% complete
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{report.achievements}</p>
                        {report.challenges && (
                          <p className="text-sm text-red-600">{report.challenges}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No progress reports available</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'planned'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    >
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="delayed">Delayed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority || 5}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date || ''}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                    <input
                      type="date"
                      value={formData.target_date || ''}
                      onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentage_complete || 0}
                    onChange={(e) => setFormData({ ...formData, percentage_complete: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Allocated</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.budget_allocated || 0}
                      onChange={(e) => setFormData({ ...formData, budget_allocated: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Spent</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.budget_spent || 0}
                      onChange={(e) => setFormData({ ...formData, budget_spent: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Success Criteria</label>
                  <textarea
                    value={formData.success_criteria || ''}
                    onChange={(e) => setFormData({ ...formData, success_criteria: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                    placeholder="Define what constitutes successful completion of this milestone..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                    placeholder="Additional notes or comments..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {type === 'view' || type === 'progress' ? 'Close' : 'Cancel'}
              </button>
              {type !== 'view' && type !== 'progress' && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Milestone
                </button>
              )}
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectMilestones;