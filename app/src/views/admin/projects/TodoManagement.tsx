import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Calendar, 
  User, 
  Flag, 
  Clock, 
  Filter,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Users,
  Tag,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Timer,
  MessageSquare,
  Paperclip,
  X
} from 'lucide-react';

// Todo Item Interface
interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string[];
  assignedBy: string;
  projectId: string;
  category: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  subtasks: SubTask[];
  attachments: Attachment[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  dependencies: string[];
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  edited?: boolean;
}

const TodoManagement: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'list' | 'board' | 'calendar'>('list');
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample data
  useEffect(() => {
    const sampleTodos: TodoItem[] = [
      {
        id: '1',
        title: 'Finalize foundation design',
        description: 'Complete the foundation design drawings and get approval from structural engineer',
        status: 'in_progress',
        priority: 'high',
        assignedTo: ['john.doe', 'mary.engineer'],
        assignedBy: 'admin',
        projectId: 'proj-001',
        category: 'Design',
        dueDate: '2024-01-15',
        estimatedHours: 16,
        actualHours: 12,
        tags: ['foundation', 'structural', 'approval'],
        subtasks: [
          { id: 'st1', title: 'Draft initial design', completed: true, assignedTo: 'john.doe' },
          { id: 'st2', title: 'Review with team', completed: true, assignedTo: 'mary.engineer' },
          { id: 'st3', title: 'Get engineer approval', completed: false, assignedTo: 'john.doe' }
        ],
        attachments: [
          { 
            id: 'att1', 
            name: 'foundation-plan-v2.pdf', 
            url: '/docs/foundation-plan-v2.pdf',
            type: 'application/pdf',
            size: 2048000,
            uploadedBy: 'john.doe',
            uploadedAt: '2024-01-10T14:30:00Z'
          }
        ],
        comments: [
          {
            id: 'comm1',
            text: 'Initial design looks good, but we need to adjust the depth based on soil report',
            author: 'mary.engineer',
            createdAt: '2024-01-12T09:15:00Z'
          }
        ],
        dependencies: [],
        createdAt: '2024-01-08T10:00:00Z',
        updatedAt: '2024-01-12T15:30:00Z'
      },
      {
        id: '2',
        title: 'Order construction materials',
        description: 'Place orders for cement, steel bars, and other materials for foundation work',
        status: 'pending',
        priority: 'medium',
        assignedTo: ['procurement.team'],
        assignedBy: 'project.manager',
        projectId: 'proj-001',
        category: 'Procurement',
        dueDate: '2024-01-20',
        estimatedHours: 4,
        tags: ['materials', 'foundation', 'procurement'],
        subtasks: [
          { id: 'st4', title: 'Get quotations', completed: false },
          { id: 'st5', title: 'Compare prices', completed: false },
          { id: 'st6', title: 'Place orders', completed: false }
        ],
        attachments: [],
        comments: [],
        dependencies: ['1'],
        createdAt: '2024-01-09T11:00:00Z',
        updatedAt: '2024-01-09T11:00:00Z'
      },
      {
        id: '3',
        title: 'Client presentation preparation',
        description: 'Prepare presentation materials for client meeting next week',
        status: 'completed',
        priority: 'urgent',
        assignedTo: ['project.manager', 'design.lead'],
        assignedBy: 'admin',
        projectId: 'proj-002',
        category: 'Presentation',
        dueDate: '2024-01-12',
        estimatedHours: 8,
        actualHours: 6,
        tags: ['client', 'presentation', 'meeting'],
        subtasks: [
          { id: 'st7', title: 'Create slide deck', completed: true },
          { id: 'st8', title: 'Prepare 3D models', completed: true },
          { id: 'st9', title: 'Review with team', completed: true }
        ],
        attachments: [],
        comments: [],
        dependencies: [],
        createdAt: '2024-01-05T09:00:00Z',
        updatedAt: '2024-01-12T16:00:00Z',
        completedAt: '2024-01-12T16:00:00Z'
      }
    ];
    setTodos(sampleTodos);
    setFilteredTodos(sampleTodos);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = todos;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(todo => todo.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priorityFilter);
    }

    // Assignee filter
    if (assigneeFilter !== 'all') {
      filtered = filtered.filter(todo => todo.assignedTo.includes(assigneeFilter));
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTodos(filtered);
  }, [todos, searchQuery, statusFilter, priorityFilter, assigneeFilter, sortBy, sortOrder]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="w-4 h-4 text-red-600" />;
      case 'high': return <ArrowUp className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Minus className="w-4 h-4 text-yellow-600" />;
      case 'low': return <ArrowDown className="w-4 h-4 text-green-600" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Timer className="w-4 h-4 text-blue-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Square className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const toggleTodoStatus = (todoId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
        return {
          ...todo,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
          updatedAt: new Date().toISOString()
        };
      }
      return todo;
    }));
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(subtask =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          ),
          updatedAt: new Date().toISOString()
        };
      }
      return todo;
    }));
  };

  const getCompletionPercentage = (todo: TodoItem) => {
    if (todo.subtasks.length === 0) return todo.status === 'completed' ? 100 : 0;
    const completed = todo.subtasks.filter(st => st.completed).length;
    return Math.round((completed / todo.subtasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Todo Management</h1>
          <p className="text-gray-600 mt-2">Manage tasks, assignments, and project workflows</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Todo</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {todos.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {todos.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
            <Timer className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {todos.filter(t => {
                  const daysUntilDue = getDaysUntilDue(t.dueDate);
                  return daysUntilDue < 0 && t.status !== 'completed';
                }).length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title</option>
            <option value="createdAt">Created</option>
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          </button>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-2 ${viewMode === 'board' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Board
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="divide-y divide-gray-200">
            {filteredTodos.map((todo) => {
              const daysUntilDue = getDaysUntilDue(todo.dueDate);
              const completionPercentage = getCompletionPercentage(todo);
              const isOverdue = daysUntilDue < 0 && todo.status !== 'completed';

              return (
                <div key={todo.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodoStatus(todo.id)}
                      className="mt-1"
                    >
                      {todo.status === 'completed' ? (
                        <CheckSquare className="w-5 h-5 text-green-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`text-lg font-semibold ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {todo.title}
                            </h3>
                            {getPriorityIcon(todo.priority)}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              todo.status === 'completed' ? 'bg-green-100 text-green-800' :
                              todo.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              todo.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {todo.status.replace('_', ' ')}
                            </span>
                            {isOverdue && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                Overdue
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 mb-3">{todo.description}</p>

                          {/* Progress bar for subtasks */}
                          {todo.subtasks.length > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Subtasks ({todo.subtasks.filter(st => st.completed).length}/{todo.subtasks.length})</span>
                                <span>{completionPercentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${completionPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Tags */}
                          {todo.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {todo.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Meta info */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                                Due {formatDate(todo.dueDate)}
                                {daysUntilDue === 0 && ' (Today)'}
                                {daysUntilDue === 1 && ' (Tomorrow)'}
                                {daysUntilDue > 1 && ` (in ${daysUntilDue} days)`}
                                {daysUntilDue < 0 && ` (${Math.abs(daysUntilDue)} days ago)`}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{todo.assignedTo.length} assigned</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{todo.estimatedHours}h estimated</span>
                            </div>

                            {todo.attachments.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Paperclip className="w-4 h-4" />
                                <span>{todo.attachments.length}</span>
                              </div>
                            )}

                            {todo.comments.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{todo.comments.length}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTodo(todo);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtasks */}
                      {todo.subtasks.length > 0 && (
                        <div className="mt-4 ml-6 space-y-2">
                          {todo.subtasks.slice(0, 3).map((subtask) => (
                            <div key={subtask.id} className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleSubtask(todo.id, subtask.id)}
                                className="flex-shrink-0"
                              >
                                {subtask.completed ? (
                                  <CheckSquare className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                )}
                              </button>
                              <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {subtask.title}
                              </span>
                              {subtask.assignedTo && (
                                <span className="text-xs text-gray-500">
                                  @{subtask.assignedTo}
                                </span>
                              )}
                            </div>
                          ))}
                          {todo.subtasks.length > 3 && (
                            <button
                              onClick={() => {
                                setSelectedTodo(todo);
                                setShowDetailModal(true);
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              +{todo.subtasks.length - 3} more subtasks
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTodos.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <CheckSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium mb-2">No todos found</p>
              <p>Try adjusting your search or filters, or create a new todo.</p>
            </div>
          )}
        </div>
      )}

      {/* Board View */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['pending', 'in_progress', 'completed', 'cancelled'].map((status) => (
            <div key={status} className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {status.replace('_', ' ')}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {filteredTodos.filter(t => t.status === status).length}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {filteredTodos
                  .filter(todo => todo.status === status)
                  .map((todo) => (
                    <div
                      key={todo.id}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedTodo(todo);
                        setShowDetailModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{todo.title}</h4>
                        {getPriorityIcon(todo.priority)}
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{todo.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(todo.dueDate)}</span>
                        <span>{todo.assignedTo.length} assigned</span>
                      </div>
                      {todo.subtasks.length > 0 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full"
                              style={{ width: `${getCompletionPercentage(todo)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center text-gray-500 py-12">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium mb-2">Calendar View</p>
            <p>Calendar integration coming soon...</p>
          </div>
        </div>
      )}

      {/* Todo Detail Modal */}
      {showDetailModal && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTodo.title}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    {getPriorityIcon(selectedTodo.priority)}
                    <span className="text-sm text-gray-500 capitalize">{selectedTodo.priority} priority</span>
                    <span className="text-gray-300">•</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedTodo.status === 'completed' ? 'bg-green-100 text-green-800' :
                      selectedTodo.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      selectedTodo.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedTodo.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedTodo.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Due Date:</span>
                      <span className="text-gray-900">{formatDate(selectedTodo.dueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated Hours:</span>
                      <span className="text-gray-900">{selectedTodo.estimatedHours}h</span>
                    </div>
                    {selectedTodo.actualHours && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Actual Hours:</span>
                        <span className="text-gray-900">{selectedTodo.actualHours}h</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-900">{selectedTodo.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-900">{formatDate(selectedTodo.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Assignment</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Assigned To:</span>
                      <div className="mt-1 space-y-1">
                        {selectedTodo.assignedTo.map((assignee, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{assignee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned By:</span>
                      <span className="text-gray-900">{selectedTodo.assignedBy}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedTodo.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTodo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtasks */}
              {selectedTodo.subtasks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Subtasks ({selectedTodo.subtasks.filter(st => st.completed).length}/{selectedTodo.subtasks.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedTodo.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <button
                          onClick={() => toggleSubtask(selectedTodo.id, subtask.id)}
                        >
                          {subtask.completed ? (
                            <CheckSquare className="w-4 h-4 text-green-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                        <span className={`flex-1 ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {subtask.title}
                        </span>
                        {subtask.assignedTo && (
                          <span className="text-sm text-gray-500">@{subtask.assignedTo}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedTodo.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedTodo.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                          <p className="text-xs text-gray-500">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB • 
                            Uploaded by {attachment.uploadedBy} on {formatDate(attachment.uploadedAt)}
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              {selectedTodo.comments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Comments</h3>
                  <div className="space-y-3">
                    {selectedTodo.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                            {comment.edited && (
                              <span className="text-xs text-gray-400">(edited)</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoManagement;