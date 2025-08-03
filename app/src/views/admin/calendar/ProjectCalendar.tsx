import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  MapPin,
  Users,
  Flag,
  Eye,
  Edit3,
  Trash2,
  Download,
  Search,
  Grid3X3,
  List,
  CalendarDays,
  Settings,
  AlertCircle,
  CheckCircle2,
  Timer,
  Briefcase,
  Target,
  TrendingUp,
  BarChart3,
  Activity,
  X
} from 'lucide-react';

// Event interfaces
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: 'meeting' | 'deadline' | 'milestone' | 'task' | 'inspection' | 'delivery' | 'review';
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  attendees: string[];
  projectId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  reminders: Reminder[];
  attachments: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
  recurring?: RecurringPattern;
}

interface Reminder {
  id: string;
  type: 'email' | 'sms' | 'notification';
  minutesBefore: number;
  sent: boolean;
}

interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: string;
  occurrences?: number;
}

interface Project {
  id: string;
  name: string;
  color: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed';
}

const ProjectCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Sample data
  useEffect(() => {
    const sampleProjects: Project[] = [
      { id: 'proj-001', name: 'Mwangi Family Residence', color: '#3B82F6', status: 'active' },
      { id: 'proj-002', name: 'Westlands Office Complex', color: '#10B981', status: 'active' },
      { id: 'proj-003', name: 'Karen Villa Renovation', color: '#F59E0B', status: 'planning' },
      { id: 'proj-004', name: 'Machakos County Hospital', color: '#EF4444', status: 'on_hold' },
    ];

    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Foundation Inspection',
        description: 'Final inspection of foundation work before proceeding to next phase',
        type: 'inspection',
        startDate: '2024-01-15T09:00:00',
        endDate: '2024-01-15T11:00:00',
        allDay: false,
        location: 'Kileleshwa Site',
        attendees: ['inspector@county.gov', 'site.manager@akibeks.co.ke', 'client@mwangi.com'],
        projectId: 'proj-001',
        priority: 'high',
        status: 'scheduled',
        reminders: [
          { id: 'r1', type: 'email', minutesBefore: 60, sent: false },
          { id: 'r2', type: 'notification', minutesBefore: 15, sent: false }
        ],
        attachments: ['inspection-checklist.pdf'],
        createdBy: 'project.manager',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
        color: '#3B82F6'
      },
      {
        id: '2',
        title: 'Client Presentation',
        description: 'Present design proposals and project timeline to client',
        type: 'meeting',
        startDate: '2024-01-18T14:00:00',
        endDate: '2024-01-18T16:00:00',
        allDay: false,
        location: 'Akibeks Office - Conference Room A',
        attendees: ['client@corporate.co.ke', 'design.lead@akibeks.co.ke', 'project.manager@akibeks.co.ke'],
        projectId: 'proj-002',
        priority: 'urgent',
        status: 'scheduled',
        reminders: [
          { id: 'r3', type: 'email', minutesBefore: 120, sent: false },
          { id: 'r4', type: 'notification', minutesBefore: 30, sent: false }
        ],
        attachments: ['presentation-slides.pptx', '3d-models.zip'],
        createdBy: 'admin',
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-12T09:00:00Z',
        color: '#10B981'
      },
      {
        id: '3',
        title: 'Material Delivery',
        description: 'Delivery of steel reinforcement bars and cement',
        type: 'delivery',
        startDate: '2024-01-20T08:00:00',
        endDate: '2024-01-20T10:00:00',
        allDay: false,
        location: 'Karen Construction Site',
        attendees: ['supplier@materials.co.ke', 'site.supervisor@akibeks.co.ke'],
        projectId: 'proj-003',
        priority: 'medium',
        status: 'scheduled',
        reminders: [
          { id: 'r5', type: 'sms', minutesBefore: 60, sent: false }
        ],
        attachments: ['delivery-note.pdf'],
        createdBy: 'procurement.manager',
        createdAt: '2024-01-14T11:00:00Z',
        updatedAt: '2024-01-14T11:00:00Z',
        color: '#F59E0B'
      },
      {
        id: '4',
        title: 'Project Milestone Review',
        description: 'Monthly review of all active projects and milestone achievements',
        type: 'review',
        startDate: '2024-01-25T10:00:00',
        endDate: '2024-01-25T12:00:00',
        allDay: false,
        location: 'Akibeks Office - Main Conference Room',
        attendees: ['admin@akibeks.co.ke', 'project.manager@akibeks.co.ke', 'design.lead@akibeks.co.ke'],
        priority: 'high',
        status: 'scheduled',
        reminders: [
          { id: 'r6', type: 'email', minutesBefore: 1440, sent: false }, // 24 hours
          { id: 'r7', type: 'notification', minutesBefore: 60, sent: false }
        ],
        attachments: ['monthly-report.pdf', 'project-status.xlsx'],
        createdBy: 'admin',
        createdAt: '2024-01-01T09:00:00Z',
        updatedAt: '2024-01-01T09:00:00Z',
        color: '#8B5CF6',
        recurring: { type: 'monthly', interval: 1 }
      },
      {
        id: '5',
        title: 'Design Deadline',
        description: 'Final architectural drawings submission deadline',
        type: 'deadline',
        startDate: '2024-01-22T17:00:00',
        endDate: '2024-01-22T17:00:00',
        allDay: false,
        projectId: 'proj-004',
        priority: 'urgent',
        status: 'scheduled',
        reminders: [
          { id: 'r8', type: 'email', minutesBefore: 2880, sent: false }, // 48 hours
          { id: 'r9', type: 'notification', minutesBefore: 480, sent: false } // 8 hours
        ],
        attendees: ['architect@akibeks.co.ke', 'design.team@akibeks.co.ke'],
        attachments: [],
        createdBy: 'design.lead',
        createdAt: '2024-01-05T10:00:00Z',
        updatedAt: '2024-01-05T10:00:00Z',
        color: '#EF4444'
      }
    ];

    setProjects(sampleProjects);
    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Project filter
    if (filterProject !== 'all') {
      filtered = filtered.filter(event => event.projectId === filterProject);
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, filterProject, filterType, filterStatus]);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'deadline': return <Flag className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      case 'task': return <CheckCircle2 className="w-4 h-4" />;
      case 'inspection': return <Eye className="w-4 h-4" />;
      case 'delivery': return <Briefcase className="w-4 h-4" />;
      case 'review': return <BarChart3 className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthEvents = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === targetDate.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-32 p-1 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`min-h-32 p-1 border border-gray-200 hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
          }`}
        >
          <div className={`flex items-center justify-between mb-1 ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-900'}`}>
            <span>{day}</span>
            {dayEvents.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate"
                style={{ backgroundColor: event.color + '20', color: event.color }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
                title={event.title}
              >
                <div className="flex items-center space-x-1">
                  {getEventTypeIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
                {!event.allDay && (
                  <div className="text-xs opacity-75">
                    {formatTime(event.startDate)}
                  </div>
                )}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderAgendaView = () => {
    const sortedEvents = [...filteredEvents].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const groupedEvents = sortedEvents.reduce((groups: { [key: string]: CalendarEvent[] }, event) => {
      const dateKey = new Date(event.startDate).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
      return groups;
    }, {});

    return (
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
          <div key={dateKey} className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                {new Date(dateKey).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <p className="text-sm text-gray-600">{dayEvents.length} events</p>
            </div>
            <div className="divide-y divide-gray-200">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getEventTypeIcon(event.type)}
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {event.allDay ? 'All day' : `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                        {event.projectId && (
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{projects.find(p => p.id === event.projectId)?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedEvents).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium mb-2">No events found</p>
            <p>Try adjusting your search or filters, or create a new event.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Calendar</h1>
          <p className="text-gray-600 mt-2">Manage project schedules, meetings, and deadlines</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {events.filter(e => new Date(e.startDate) > new Date() && e.status === 'scheduled').length}
              </p>
            </div>
            <Timer className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-green-600">
                {events.filter(e => {
                  const eventDate = new Date(e.startDate);
                  const today = new Date();
                  return eventDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {events.filter(e => {
                  const eventDate = new Date(e.endDate);
                  const now = new Date();
                  return eventDate < now && e.status === 'scheduled';
                }).length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="meeting">Meetings</option>
              <option value="deadline">Deadlines</option>
              <option value="milestone">Milestones</option>
              <option value="task">Tasks</option>
              <option value="inspection">Inspections</option>
              <option value="delivery">Deliveries</option>
              <option value="review">Reviews</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-2 ${viewMode === 'agenda' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Agenda
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      {viewMode !== 'agenda' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-medium text-gray-500 bg-gray-50 border-r border-gray-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {renderCalendarGrid()}
          </div>
        </div>
      )}

      {/* Agenda View */}
      {viewMode === 'agenda' && renderAgendaView()}

      {/* Week and Day views placeholder */}
      {(viewMode === 'week' || viewMode === 'day') && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center text-gray-500">
          <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium mb-2">{viewMode === 'week' ? 'Week' : 'Day'} View</p>
          <p>Coming soon...</p>
        </div>
      )}

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getEventTypeIcon(selectedEvent.type)}
                    <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedEvent.priority)}`}>
                      {selectedEvent.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        {selectedEvent.allDay 
                          ? 'All day event' 
                          : `${formatDateTime(selectedEvent.startDate)} - ${formatTime(selectedEvent.endDate)}`
                        }
                      </span>
                    </div>
                    {selectedEvent.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    )}
                    {selectedEvent.projectId && (
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span>{projects.find(p => p.id === selectedEvent.projectId)?.name}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{selectedEvent.attendees.length} attendees</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Attendees</h3>
                  <div className="space-y-2">
                    {selectedEvent.attendees.map((attendee, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-700">{attendee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminders */}
              {selectedEvent.reminders.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Reminders</h3>
                  <div className="space-y-2">
                    {selectedEvent.reminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {reminder.type} reminder {reminder.minutesBefore} minutes before
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          reminder.sent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {reminder.sent ? 'Sent' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedEvent.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedEvent.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Download className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{attachment}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recurring Pattern */}
              {selectedEvent.recurring && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recurring Pattern</h3>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Repeats {selectedEvent.recurring.type} every {selectedEvent.recurring.interval} 
                      {selectedEvent.recurring.type === 'daily' ? ' day(s)' : 
                       selectedEvent.recurring.type === 'weekly' ? ' week(s)' :
                       selectedEvent.recurring.type === 'monthly' ? ' month(s)' : ' year(s)'}
                      {selectedEvent.recurring.endDate && ` until ${formatDateTime(selectedEvent.recurring.endDate)}`}
                      {selectedEvent.recurring.occurrences && ` for ${selectedEvent.recurring.occurrences} occurrences`}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Created by {selectedEvent.createdBy} on {formatDateTime(selectedEvent.createdAt)}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCalendar;