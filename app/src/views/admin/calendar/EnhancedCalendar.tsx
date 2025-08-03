import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Bell,
  Filter,
  Search,
  Settings,
  Eye,
  Edit2,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle,
  User,
  Building,
  Phone,
  Mail,
  Flag,
  Repeat,
  Link as LinkIcon,
  Download,
  Upload,
  Grid3x3,
  List,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { getCalendarColor, getStatusColor } from '../../../lib/colors';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  event_type: 'meeting' | 'deadline' | 'milestone' | 'task' | 'appointment' | 'holiday' | 'reminder' | 'personal' | 'project' | 'client_call' | 'site_visit' | 'training' | 'review';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'pending';
  start_datetime: string;
  end_datetime: string;
  all_day: boolean;
  location: string;
  virtual_link: string;
  project_id?: string;
  project_name?: string;
  task_id?: string;
  milestone_id?: string;
  created_by: string;
  assigned_to: string[];
  attendees: any[];
  recurrence_type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  recurrence_pattern: any;
  recurrence_end_date?: string;
  parent_event_id?: string;
  reminder_minutes: number[];
  color: string;
  priority: number;
  is_private: boolean;
  tags: string[];
  attachments: any[];
  notes: string;
  timezone: string;
  booking_slots?: any[];
  max_attendees?: number;
  is_bookable: boolean;
  booking_form_fields?: any[];
  created_at: string;
  updated_at: string;
}

interface CalendarSettings {
  id: string;
  user_id: string;
  default_view: 'day' | 'week' | 'month' | 'year' | 'agenda';
  timezone: string;
  week_start_day: number;
  working_hours_start: string;
  working_hours_end: string;
  working_days: number[];
  default_reminder_minutes: number;
  show_weekends: boolean;
  show_week_numbers: boolean;
  color_scheme: string;
  custom_colors: any;
  notification_preferences: any;
  calendar_integrations: any;
  date_format: string;
  time_format: string;
  created_at: string;
  updated_at: string;
}

const EnhancedCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [settings, setSettings] = useState<CalendarSettings | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [dayNotes, setDayNotes] = useState<{ [date: string]: string }>({});
  // Add a new state for tasks
  const [tasks, setTasks] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchSettings();
  }, [currentDate, viewMode]);

  // Fetch tasks (mock or from API)
  useEffect(() => {
    // TODO: Replace with real API call
    setTasks([
      // Example task event
      {
        id: 'task-1',
        title: 'Foundation Excavation',
        event_type: 'task',
        status: 'in_progress',
        start_datetime: '2024-03-22T09:00:00Z',
        end_datetime: '2024-03-22T17:00:00Z',
        all_day: false,
        color: '#F59E0B',
        project_id: 'proj-1',
        assigned_to: ['user-2'],
        description: 'Excavate foundation according to plans',
        created_by: 'admin',
        attendees: [],
        recurrence_type: 'none',
        recurrence_pattern: {},
        reminder_minutes: [60],
        priority: 7,
        is_private: false,
        tags: ['foundation', 'task'],
        attachments: [],
        notes: '',
        timezone: 'America/New_York',
        is_bookable: false,
        created_at: '2024-03-20T10:00:00Z',
        updated_at: '2024-03-20T10:00:00Z'
      }
    ]);
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setEvents([
        {
          id: '1',
          title: 'Project Kick-off Meeting',
          description: 'Initial meeting to discuss project requirements and timeline',
          event_type: 'meeting',
          status: 'confirmed',
          start_datetime: '2024-03-20T09:00:00Z',
          end_datetime: '2024-03-20T10:30:00Z',
          all_day: false,
          location: 'Conference Room A',
          virtual_link: 'https://meet.google.com/abc-defg-hij',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          created_by: 'admin',
          assigned_to: ['user-1', 'user-2'],
          attendees: [
            { name: 'John Smith', email: 'john@company.com', response: 'accepted' },
            { name: 'Sarah Johnson', email: 'sarah@company.com', response: 'pending' }
          ],
          recurrence_type: 'none',
          recurrence_pattern: {},
          reminder_minutes: [15, 60],
          color: '#3B82F6',
          priority: 8,
          is_private: false,
          tags: ['meeting', 'project', 'kickoff'],
          attachments: [],
          notes: 'Bring project requirements document',
          timezone: 'America/New_York',
          is_bookable: false,
          created_at: '2024-03-15T10:00:00Z',
          updated_at: '2024-03-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Foundation Milestone Deadline',
          description: 'Foundation work must be completed by this date',
          event_type: 'deadline',
          status: 'scheduled',
          start_datetime: '2024-03-22T17:00:00Z',
          end_datetime: '2024-03-22T17:00:00Z',
          all_day: true,
          location: 'Construction Site',
          virtual_link: '',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          milestone_id: 'milestone-1',
          created_by: 'admin',
          assigned_to: ['user-1'],
          attendees: [],
          recurrence_type: 'none',
          recurrence_pattern: {},
          reminder_minutes: [1440, 60], // 24 hours and 1 hour
          color: '#EF4444',
          priority: 10,
          is_private: false,
          tags: ['deadline', 'milestone', 'foundation'],
          attachments: [],
          notes: 'Critical deadline for project timeline',
          timezone: 'America/New_York',
          is_bookable: false,
          created_at: '2024-03-10T14:00:00Z',
          updated_at: '2024-03-10T14:00:00Z'
        },
        {
          id: '3',
          title: 'Site Visit with Client',
          description: 'Walk-through with client to review progress',
          event_type: 'site_visit',
          status: 'confirmed',
          start_datetime: '2024-03-25T14:00:00Z',
          end_datetime: '2024-03-25T16:00:00Z',
          all_day: false,
          location: '123 Main St Construction Site',
          virtual_link: '',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          created_by: 'admin',
          assigned_to: ['user-2'],
          attendees: [
            { name: 'Client Representative', email: 'client@example.com', response: 'accepted' },
            { name: 'Project Manager', email: 'pm@company.com', response: 'accepted' }
          ],
          recurrence_type: 'monthly',
          recurrence_pattern: { interval: 1, day_of_month: 25 },
          recurrence_end_date: '2024-12-25',
          reminder_minutes: [60, 30],
          color: '#10B981',
          priority: 7,
          is_private: false,
          tags: ['client', 'site_visit', 'review'],
          attachments: [],
          notes: 'Bring hard hats and safety equipment',
          timezone: 'America/New_York',
          is_bookable: false,
          created_at: '2024-03-18T11:00:00Z',
          updated_at: '2024-03-18T11:00:00Z'
        },
        {
          id: '4',
          title: 'Team Training: Safety Protocols',
          description: 'Mandatory safety training for all construction team members',
          event_type: 'training',
          status: 'scheduled',
          start_datetime: '2024-03-28T08:00:00Z',
          end_datetime: '2024-03-28T12:00:00Z',
          all_day: false,
          location: 'Training Center',
          virtual_link: '',
          created_by: 'admin',
          assigned_to: ['user-1', 'user-2', 'user-3', 'user-4'],
          attendees: [],
          recurrence_type: 'yearly',
          recurrence_pattern: { interval: 1 },
          reminder_minutes: [1440, 120], // 24 hours and 2 hours
          color: '#F59E0B',
          priority: 9,
          is_private: false,
          tags: ['training', 'safety', 'mandatory'],
          attachments: [
            { name: 'Safety Manual.pdf', url: '/files/safety-manual.pdf' }
          ],
          notes: 'All team members must attend. Certificates will be provided.',
          timezone: 'America/New_York',
          is_bookable: true,
          max_attendees: 20,
          booking_form_fields: [
            { name: 'employee_id', label: 'Employee ID', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'select', required: true }
          ],
          created_at: '2024-03-12T09:00:00Z',
          updated_at: '2024-03-12T09:00:00Z'
        },
        {
          id: '5',
          title: 'Client Call: Budget Review',
          description: 'Weekly budget review call with client stakeholders',
          event_type: 'client_call',
          status: 'scheduled',
          start_datetime: '2024-03-29T15:00:00Z',
          end_datetime: '2024-03-29T16:00:00Z',
          all_day: false,
          location: '',
          virtual_link: 'https://zoom.us/j/123456789',
          project_id: 'proj-1',
          project_name: 'Downtown Office Complex',
          created_by: 'admin',
          assigned_to: ['user-2'],
          attendees: [
            { name: 'Client CFO', email: 'cfo@client.com', response: 'accepted' },
            { name: 'Project Manager', email: 'pm@company.com', response: 'accepted' }
          ],
          recurrence_type: 'weekly',
          recurrence_pattern: { interval: 1, day_of_week: 5 }, // Friday
          recurrence_end_date: '2024-06-29',
          reminder_minutes: [30, 10],
          color: '#8B5CF6',
          priority: 6,
          is_private: false,
          tags: ['client', 'budget', 'review', 'weekly'],
          attachments: [],
          notes: 'Prepare weekly budget report before call',
          timezone: 'America/New_York',
          is_bookable: false,
          created_at: '2024-03-01T10:00:00Z',
          updated_at: '2024-03-20T10:00:00Z'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchSettings = async () => {
    // Mock API call
    setTimeout(() => {
      setSettings({
        id: '1',
        user_id: 'admin',
        default_view: 'month',
        timezone: 'America/New_York',
        week_start_day: 1, // Monday
        working_hours_start: '09:00',
        working_hours_end: '17:00',
        working_days: [1, 2, 3, 4, 5], // Monday to Friday
        default_reminder_minutes: 15,
        show_weekends: true,
        show_week_numbers: false,
        color_scheme: 'default',
        custom_colors: {},
        notification_preferences: {
          email: true,
          push: true,
          sms: false
        },
        calendar_integrations: {},
        date_format: 'MM/DD/YYYY',
        time_format: '12h',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-03-15T10:00:00Z'
      });
    }, 500);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setModalType('create');
    setShowEventModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalType('edit');
    setShowEventModal(true);
  };

  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalType('view');
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Mock delete operation
      console.log('Deleting event:', eventId);
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const handleSaveEvent = async (eventData: any) => {
    // Mock save operation
    console.log('Saving event:', eventData);
    setShowEventModal(false);
    fetchEvents();
  };

  const handleSaveSettings = async (settingsData: any) => {
    // Mock save operation
    console.log('Saving settings:', settingsData);
    setSettings(settingsData);
    setShowSettingsModal(false);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const exportCalendar = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Description,Start,End,Location,Type,Status\n" +
      events.map(event => 
        `"${event.title}","${event.description}","${event.start_datetime}","${event.end_datetime}","${event.location}","${event.event_type}","${event.status}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `calendar_events_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEventTypeColor = (type: string) => {
    const calendarColor = getCalendarColor(type);
    return `${calendarColor.bg} ${calendarColor.text} border ${calendarColor.border}`;
  };

  const getEventTypeIcon = (type: string) => {
    const icons: { [key: string]: JSX.Element } = {
      meeting: <Users className="w-4 h-4" />,
      deadline: <AlertCircle className="w-4 h-4" />,
      milestone: <Flag className="w-4 h-4" />,
      task: <Target className="w-4 h-4" />,
      appointment: <Calendar className="w-4 h-4" />,
      holiday: <BookOpen className="w-4 h-4" />,
      reminder: <Bell className="w-4 h-4" />,
      personal: <User className="w-4 h-4" />,
      project: <Building className="w-4 h-4" />,
      client_call: <Phone className="w-4 h-4" />,
      site_visit: <MapPin className="w-4 h-4" />,
      training: <BookOpen className="w-4 h-4" />,
      review: <Eye className="w-4 h-4" />
    };
    return icons[type] || <Calendar className="w-4 h-4" />;
  };

  const filteredAllEvents = [...events, ...tasks].filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.event_type === eventTypeFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate.toLocaleDateString('en-US', options);
  };

  // Drag-and-drop handlers
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active && active.id !== over.id) {
      // Find the event and update its date
      const draggedEvent = events.find(e => e.id === active.id);
      if (draggedEvent) {
        // For simplicity, assume over.id is a date string (ISO)
        const newDate = over.id;
        // Update event date (keep time)
        const start = new Date(newDate);
        start.setHours(new Date(draggedEvent.start_datetime).getHours());
        start.setMinutes(new Date(draggedEvent.start_datetime).getMinutes());
        const end = new Date(start);
        end.setHours(new Date(draggedEvent.end_datetime).getHours());
        end.setMinutes(new Date(draggedEvent.end_datetime).getMinutes());
        const updatedEvent = { ...draggedEvent, start_datetime: start.toISOString(), end_datetime: end.toISOString() };
        setEvents(events.map(e => e.id === active.id ? updatedEvent : e));
        // TODO: Persist to backend
      }
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Calendar Events', 14, 16);
    doc.autoTable({
      head: [['Title', 'Start', 'End', 'Type', 'Status']],
      body: events.map(e => [e.title, e.start_datetime, e.end_datetime, e.event_type, e.status]),
    });
    doc.save('calendar_events.pdf');
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(events);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Events');
    XLSX.writeFile(wb, 'calendar_events.xlsx');
  };

  // Merge tasks and events for display
  const allEvents = [...events, ...tasks];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
            <p className="text-gray-600">Manage events, meetings, and schedules</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={exportCalendar}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleCreateEvent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-6">
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Today
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900">{formatDateHeader()}</h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            {['month', 'week', 'day', 'agenda'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="meeting">Meetings</option>
            <option value="deadline">Deadlines</option>
            <option value="milestone">Milestones</option>
            <option value="site_visit">Site Visits</option>
            <option value="client_call">Client Calls</option>
            <option value="training">Training</option>
            <option value="review">Reviews</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {viewMode === 'month' && (
              <MonthView 
                currentDate={currentDate}
                events={filteredAllEvents}
                onEventClick={handleViewEvent}
                onDateClick={setSelectedDate}
                getEventTypeColor={getEventTypeColor}
                settings={settings}
              />
            )}
            {viewMode === 'week' && (
              <WeekView 
                currentDate={currentDate}
                events={filteredAllEvents}
                onEventClick={handleViewEvent}
                getEventTypeColor={getEventTypeColor}
                getEventTypeIcon={getEventTypeIcon}
                settings={settings}
              />
            )}
            {viewMode === 'day' && (
              <DayView 
                currentDate={currentDate}
                events={filteredAllEvents}
                onEventClick={handleViewEvent}
                getEventTypeColor={getEventTypeColor}
                getEventTypeIcon={getEventTypeIcon}
                settings={settings}
              />
            )}
            {viewMode === 'agenda' && (
              <AgendaView 
                events={filteredAllEvents}
                onEventClick={handleViewEvent}
                onEventEdit={handleEditEvent}
                onEventDelete={handleDeleteEvent}
                getEventTypeColor={getEventTypeColor}
                getEventTypeIcon={getEventTypeIcon}
                isLoading={isLoading}
                dayNotes={dayNotes}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <EventModal
            type={modalType}
            event={selectedEvent}
            onSave={handleSaveEvent}
            onClose={() => setShowEventModal(false)}
            getEventTypeColor={getEventTypeColor}
            getEventTypeIcon={getEventTypeIcon}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && settings && (
          <CalendarSettingsModal
            settings={settings}
            onSave={handleSaveSettings}
            onClose={() => setShowSettingsModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Month View Component
const MonthView: React.FC<{
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  getEventTypeColor: (type: string) => string;
  settings: CalendarSettings | null;
}> = ({ currentDate, events, onEventClick, onDateClick, getEventTypeColor, settings }) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_datetime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="h-full">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayHeaders.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-b">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-24 p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
                onClick={() => onDateClick(day)}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: `${getEventTypeColor(event.event_type)}20`, color: getEventTypeColor(event.event_type) }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};

// Week View Component
const WeekView: React.FC<{
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getEventTypeColor: (type: string) => string;
  getEventTypeIcon: (type: string) => JSX.Element;
  settings: CalendarSettings | null;
}> = ({ currentDate, events, onEventClick, getEventTypeColor, getEventTypeIcon, settings }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.start_datetime);
      return eventStart.toDateString() === day.toDateString() && 
             eventStart.getHours() === hour;
    });
  };

  return (
    <div className="overflow-auto">
      {/* Week Header */}
      <div className="grid grid-cols-8 gap-1 mb-4 sticky top-0 bg-white z-10">
        <div className="p-3"></div>
        {weekDays.map(day => {
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <div key={day.toISOString()} className={`p-3 text-center border-b ${isToday ? 'bg-blue-50' : ''}`}>
              <div className="text-sm font-medium text-gray-900">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{day.getDate()}</div>
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="grid grid-cols-8 gap-1">
          {hours.map(hour => (
            <React.Fragment key={hour}>
              {/* Time Label */}
              <div className="p-2 text-right text-sm text-gray-500 border-r">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              
              {/* Day Columns */}
              {weekDays.map(day => {
                const dayEvents = getEventsForDayAndHour(day, hour);
                return (
                  <div key={`${day.toISOString()}-${hour}`} className="min-h-12 p-1 border-b border-gray-100">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80"
                        style={{ backgroundColor: `${getEventTypeColor(event.event_type)}20`, color: getEventTypeColor(event.event_type) }}
                        onClick={() => onEventClick(event)}
                        draggable
                        onDragStart={e => e.dataTransfer.setData('eventId', event.id)}
                        onDrop={e => handleDragEnd({ active: { id: e.dataTransfer.getData('eventId') }, over: { id: day.toISOString() } })}
                        onDragOver={e => e.preventDefault()}
                      >
                        <div className="flex items-center gap-1">
                          {getEventTypeIcon(event.event_type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

// Day View Component
const DayView: React.FC<{
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getEventTypeColor: (type: string) => string;
  getEventTypeIcon: (type: string) => JSX.Element;
  settings: CalendarSettings | null;
}> = ({ currentDate, events, onEventClick, getEventTypeColor, getEventTypeIcon, settings }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.start_datetime);
      return eventStart.toDateString() === currentDate.toDateString() && 
             eventStart.getHours() === hour;
    });
  };

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.start_datetime);
    return eventDate.toDateString() === currentDate.toDateString();
  });

  return (
    <div className="flex gap-6">
      {/* Time Column */}
      <div className="w-20">
        <div className="h-16"></div> {/* Header spacer */}
        {hours.map(hour => (
          <div key={hour} className="h-16 flex items-start pt-2 text-sm text-gray-500 border-b">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
        ))}
      </div>

      {/* Events Column */}
      <div className="flex-1">
        {/* Day Header */}
        <div className="h-16 flex items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <span className="ml-3 text-sm text-gray-500">
            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Hour Slots */}
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          {hours.map(hour => {
            const hourEvents = getEventsForHour(hour);
            return (
              <div key={hour} className="h-16 border-b border-gray-100 p-2">
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    className="p-2 rounded mb-1 cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: `${getEventTypeColor(event.event_type)}20`, color: getEventTypeColor(event.event_type) }}
                    onClick={() => onEventClick(event)}
                    draggable
                    onDragStart={e => e.dataTransfer.setData('eventId', event.id)}
                    onDrop={e => handleDragEnd({ active: { id: e.dataTransfer.getData('eventId') }, over: { id: currentDate.toISOString() } })}
                    onDragOver={e => e.preventDefault()}
                  >
                    <div className="flex items-center gap-2">
                      {getEventTypeIcon(event.event_type)}
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-75">
                          {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - 
                          {new Date(event.end_datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </DndContext>
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Diary / Notes for {currentDate.toLocaleDateString()}</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Write your notes, daily log, or journal here..."
            value={dayNotes[currentDate.toDateString()] || ''}
            onChange={e => setDayNotes({ ...dayNotes, [currentDate.toDateString()]: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

// Agenda View Component
const AgendaView: React.FC<{
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
  getEventTypeColor: (type: string) => string;
  getEventTypeIcon: (type: string) => JSX.Element;
  isLoading: boolean;
  dayNotes: { [date: string]: string };
}> = ({ events, onEventClick, onEventEdit, onEventDelete, getEventTypeColor, getEventTypeIcon, isLoading, dayNotes }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  );

  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = new Date(event.start_datetime).toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {} as { [key: string]: CalendarEvent[] });

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
            {new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          
          <div className="space-y-3">
            {dayEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${getEventTypeColor(event.event_type)}20`, color: getEventTypeColor(event.event_type) }}
                    >
                      {getEventTypeIcon(event.event_type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            {!event.all_day && ` - ${new Date(event.end_datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                          </span>
                        </div>
                        
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        
                        {event.virtual_link && (
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            <span>Virtual</span>
                          </div>
                        )}
                        
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        )}
                        
                        {event.project_name && (
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{event.project_name}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventEdit(event);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventDelete(event.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {dayNotes[date] && (
            <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h5 className="text-xs font-semibold text-yellow-700 mb-1">Diary / Notes</h5>
              <div className="text-sm text-yellow-900 whitespace-pre-line">{dayNotes[date]}</div>
            </div>
          )}
        </div>
      ))}
      
      {Object.keys(groupedEvents).length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your filters or add a new event</p>
        </div>
      )}
    </div>
  );
};

// Event Modal Component
const EventModal: React.FC<{
  type: 'create' | 'edit' | 'view';
  event: CalendarEvent | null;
  onSave: (data: any) => void;
  onClose: () => void;
  getEventTypeColor: (type: string) => string;
  getEventTypeIcon: (type: string) => JSX.Element;
}> = ({ type, event, onSave, onClose, getEventTypeColor, getEventTypeIcon }) => {
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    event_type: 'meeting',
    status: 'scheduled',
    start_datetime: '',
    end_datetime: '',
    all_day: false,
    location: '',
    virtual_link: '',
    project_id: '',
    reminder_minutes: [15],
    color: '#3B82F6',
    priority: 5,
    is_private: false,
    tags: [],
    notes: '',
    timezone: 'America/New_York',
    is_bookable: false,
    recurrence_type: 'none'
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
          <div className="flex items-center gap-3">
            {formData.event_type && (
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${getEventTypeColor(formData.event_type)}20`, color: getEventTypeColor(formData.event_type) }}
              >
                {getEventTypeIcon(formData.event_type)}
              </div>
            )}
            <h3 className="text-lg font-medium text-gray-900">
              {type === 'create' ? 'Create Event' : type === 'edit' ? 'Edit Event' : 'Event Details'}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.event_type || 'meeting'}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="milestone">Milestone</option>
                    <option value="task">Task</option>
                    <option value="appointment">Appointment</option>
                    <option value="site_visit">Site Visit</option>
                    <option value="client_call">Client Call</option>
                    <option value="training">Training</option>
                    <option value="review">Review</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'scheduled'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.start_datetime ? new Date(formData.start_datetime).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, start_datetime: new Date(e.target.value).toISOString() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.end_datetime ? new Date(formData.end_datetime).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, end_datetime: new Date(e.target.value).toISOString() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.all_day || false}
                    onChange={(e) => setFormData({ ...formData, all_day: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                  <span className="text-sm text-gray-700">All Day</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_private || false}
                    onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                  <span className="text-sm text-gray-700">Private</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_bookable || false}
                    onChange={(e) => setFormData({ ...formData, is_bookable: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                  <span className="text-sm text-gray-700">Bookable</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conference Room, Address, etc."
                  disabled={type === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Virtual Link</label>
                <input
                  type="url"
                  value={formData.virtual_link || ''}
                  onChange={(e) => setFormData({ ...formData, virtual_link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://meet.google.com/..."
                  disabled={type === 'view'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="color"
                    value={formData.color || '#3B82F6'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence</label>
                <select
                  value={formData.recurrence_type || 'none'}
                  onChange={(e) => setFormData({ ...formData, recurrence_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                >
                  <option value="none">No Repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminders (minutes before)</label>
                <input
                  type="text"
                  value={formData.reminder_minutes ? formData.reminder_minutes.join(', ') : '15'}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    reminder_minutes: e.target.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15, 60, 1440"
                  disabled={type === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes or instructions..."
                  disabled={type === 'view'}
                />
              </div>
            </div>
          </div>

          {/* Event Details (View Mode) */}
          {type === 'view' && event && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created by:</span>
                    <p className="text-sm text-gray-900">{event.created_by}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created at:</span>
                    <p className="text-sm text-gray-900">{new Date(event.created_at).toLocaleString()}</p>
                  </div>
                  {event.attendees && event.attendees.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Attendees:</span>
                      <div className="mt-1 space-y-1">
                        {event.attendees.map((attendee, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{attendee.name} ({attendee.email})</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              attendee.response === 'accepted' ? 'bg-green-100 text-green-800' :
                              attendee.response === 'declined' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {attendee.response}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {event.project_name && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Project:</span>
                      <p className="text-sm text-gray-900">{event.project_name}</p>
                    </div>
                  )}
                  {event.tags && event.tags.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {event.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {event.attachments && event.attachments.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Attachments:</span>
                      <div className="mt-1 space-y-1">
                        {event.attachments.map((attachment, index) => (
                          <a 
                            key={index} 
                            href={attachment.url} 
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <LinkIcon className="w-4 h-4" />
                            {attachment.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {type === 'view' ? 'Close' : 'Cancel'}
            </button>
            {type !== 'view' && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Event
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Calendar Settings Modal Component
const CalendarSettingsModal: React.FC<{
  settings: CalendarSettings;
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ settings, onSave, onClose }) => {
  const [formData, setFormData] = useState(settings);

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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Calendar Settings</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                <select
                  value={formData.default_view}
                  onChange={(e) => setFormData({ ...formData, default_view: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                  <option value="agenda">Agenda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Week Start Day</label>
                <select
                  value={formData.week_start_day}
                  onChange={(e) => setFormData({ ...formData, week_start_day: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours Start</label>
                  <input
                    type="time"
                    value={formData.working_hours_start}
                    onChange={(e) => setFormData({ ...formData, working_hours_start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours End</label>
                  <input
                    type="time"
                    value={formData.working_hours_end}
                    onChange={(e) => setFormData({ ...formData, working_hours_end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Reminder (minutes)</label>
                <input
                  type="number"
                  value={formData.default_reminder_minutes}
                  onChange={(e) => setFormData({ ...formData, default_reminder_minutes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                <select
                  value={formData.date_format}
                  onChange={(e) => setFormData({ ...formData, date_format: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                <select
                  value={formData.time_format}
                  onChange={(e) => setFormData({ ...formData, time_format: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.show_weekends}
                    onChange={(e) => setFormData({ ...formData, show_weekends: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Weekends</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.show_week_numbers}
                    onChange={(e) => setFormData({ ...formData, show_week_numbers: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Week Numbers</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedCalendar;