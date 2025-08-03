import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiShieldCheck, HiShieldExclamation, HiLockClosed, HiLockOpen,
  HiEye, HiEyeOff, HiKey, HiUserGroup, HiGlobe, HiDeviceMobile,
  HiDesktopComputer, HiClock, HiExclamation, HiCheckCircle,
  HiXCircle, HiRefresh, HiCog, HiBell, HiClipboard, HiFingerPrint,
  HiLocationMarker, HiCalendar, HiSearch, HiFilter, HiDownload,
  HiChartBar, HiTrendingUp, HiTrendingDown, HiFlag, HiInformationCircle,
  HiLightBulb, HiUser
} from 'react-icons/hi';

interface SecurityEvent {
  id: string;
  type: 'login_success' | 'login_failed' | 'password_change' | 'role_change' | 'suspicious_activity' | 'data_access' | 'export' | 'admin_action';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user_id?: string;
  user_name?: string;
  ip_address: string;
  location?: string;
  device_info: string;
  description: string;
  timestamp: string;
  session_id?: string;
  additional_data?: any;
}

interface ActiveSession {
  id: string;
  user_id: string;
  user_name: string;
  role: string;
  ip_address: string;
  location: string;
  device_type: string;
  browser: string;
  last_activity: string;
  login_time: string;
  is_current?: boolean;
}

interface SecurityMetrics {
  total_sessions: number;
  failed_logins_24h: number;
  successful_logins_24h: number;
  suspicious_activities: number;
  password_changes_7d: number;
  admin_actions_24h: number;
  unique_ips_24h: number;
  security_score: number;
}

interface SecuritySettings {
  max_login_attempts: number;
  session_timeout: number;
  password_min_length: number;
  require_2fa: boolean;
  enable_ip_whitelist: boolean;
  enable_device_tracking: boolean;
  enable_geo_blocking: boolean;
  auto_logout_inactive: boolean;
  log_all_actions: boolean;
  email_security_alerts: boolean;
}

const SecurityDashboard: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    total_sessions: 0,
    failed_logins_24h: 0,
    successful_logins_24h: 0,
    suspicious_activities: 0,
    password_changes_7d: 0,
    admin_actions_24h: 0,
    unique_ips_24h: 0,
    security_score: 0
  });
  const [settings, setSettings] = useState<SecuritySettings>({
    max_login_attempts: 5,
    session_timeout: 60,
    password_min_length: 8,
    require_2fa: false,
    enable_ip_whitelist: false,
    enable_device_tracking: true,
    enable_geo_blocking: false,
    auto_logout_inactive: true,
    log_all_actions: true,
    email_security_alerts: true
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'events' | 'sessions' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    setLoading(true);
    // Mock API calls
    setTimeout(() => {
      // Mock security events
      const mockEvents: SecurityEvent[] = [
        {
          id: '1',
          type: 'login_success',
          severity: 'low',
          user_id: '1',
          user_name: 'admin@akibeks.com',
          ip_address: '192.168.1.100',
          location: 'Nairobi, Kenya',
          device_info: 'Chrome 120.0 on Windows 10',
          description: 'Successful admin login',
          timestamp: '2024-01-25T08:30:00Z'
        },
        {
          id: '2',
          type: 'login_failed',
          severity: 'medium',
          ip_address: '203.0.113.45',
          location: 'Lagos, Nigeria',
          device_info: 'Firefox 119.0 on Ubuntu',
          description: 'Failed login attempt - incorrect password',
          timestamp: '2024-01-25T02:15:00Z'
        },
        {
          id: '3',
          type: 'suspicious_activity',
          severity: 'high',
          user_id: '2',
          user_name: 'manager@akibeks.com',
          ip_address: '198.51.100.23',
          location: 'Unknown',
          device_info: 'Unknown Device',
          description: 'Multiple failed 2FA attempts',
          timestamp: '2024-01-24T23:45:00Z'
        },
        {
          id: '4',
          type: 'admin_action',
          severity: 'medium',
          user_id: '1',
          user_name: 'admin@akibeks.com',
          ip_address: '192.168.1.100',
          location: 'Nairobi, Kenya',
          device_info: 'Chrome 120.0 on Windows 10',
          description: 'User role changed for user ID: 5',
          timestamp: '2024-01-24T16:20:00Z'
        }
      ];

      // Mock active sessions
      const mockSessions: ActiveSession[] = [
        {
          id: '1',
          user_id: '1',
          user_name: 'admin@akibeks.com',
          role: 'super_admin',
          ip_address: '192.168.1.100',
          location: 'Nairobi, Kenya',
          device_type: 'Desktop',
          browser: 'Chrome 120.0',
          last_activity: '2024-01-25T08:45:00Z',
          login_time: '2024-01-25T08:30:00Z',
          is_current: true
        },
        {
          id: '2',
          user_id: '2',
          user_name: 'manager@akibeks.com',
          role: 'manager',
          ip_address: '192.168.1.105',
          location: 'Nairobi, Kenya',
          device_type: 'Mobile',
          browser: 'Safari 17.0',
          last_activity: '2024-01-25T08:30:00Z',
          login_time: '2024-01-25T07:15:00Z'
        }
      ];

      // Mock metrics
      const mockMetrics: SecurityMetrics = {
        total_sessions: 12,
        failed_logins_24h: 3,
        successful_logins_24h: 28,
        suspicious_activities: 2,
        password_changes_7d: 4,
        admin_actions_24h: 15,
        unique_ips_24h: 8,
        security_score: 87
      };

      setSecurityEvents(mockEvents);
      setActiveSessions(mockSessions);
      setMetrics(mockMetrics);
      setLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return HiCheckCircle;
      case 'medium': return HiInformationCircle;
      case 'high': return HiExclamation;
      case 'critical': return HiFlag;
      default: return HiInformationCircle;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login_success': return HiCheckCircle;
      case 'login_failed': return HiXCircle;
      case 'password_change': return HiKey;
      case 'role_change': return HiUserGroup;
      case 'suspicious_activity': return HiShieldExclamation;
      case 'data_access': return HiEye;
      case 'export': return HiDownload;
      case 'admin_action': return HiCog;
      default: return HiInformationCircle;
    }
  };

  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleUpdateSettings = (newSettings: SecuritySettings) => {
    setSettings(newSettings);
    // Here you would normally make an API call to save settings
    console.log('Security settings updated:', newSettings);
  };

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.ip_address.includes(searchQuery);
    
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const MetricsCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {trend > 0 ? <HiTrendingUp className="h-4 w-4 mr-1" /> : <HiTrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(trend)}% vs yesterday
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor system security, sessions, and access controls</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${metrics.security_score >= 80 ? 'bg-green-100 text-green-800' : metrics.security_score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            <HiShieldCheck className="h-5 w-5" />
            <span className="font-medium">Security Score: {metrics.security_score}%</span>
          </div>
          <button
            onClick={fetchSecurityData}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <HiRefresh className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: HiChartBar },
              { id: 'events', name: 'Security Events', icon: HiShieldExclamation },
              { id: 'sessions', name: 'Active Sessions', icon: HiUserGroup },
              { id: 'settings', name: 'Security Settings', icon: HiCog }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricsCard
                  title="Active Sessions"
                  value={metrics.total_sessions}
                  icon={HiUserGroup}
                  color="bg-blue-500"
                />
                <MetricsCard
                  title="Failed Logins (24h)"
                  value={metrics.failed_logins_24h}
                  icon={HiXCircle}
                  color="bg-red-500"
                  trend={15}
                />
                <MetricsCard
                  title="Suspicious Activities"
                  value={metrics.suspicious_activities}
                  icon={HiShieldExclamation}
                  color="bg-orange-500"
                />
                <MetricsCard
                  title="Admin Actions (24h)"
                  value={metrics.admin_actions_24h}
                  icon={HiCog}
                  color="bg-purple-500"
                />
              </div>

              {/* Security Alerts */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                  <HiExclamation className="h-5 w-5 mr-2" />
                  Recent Security Alerts
                </h3>
                <div className="space-y-3">
                  {securityEvents.filter(e => e.severity === 'high' || e.severity === 'critical').slice(0, 3).map((event) => {
                    const Icon = getEventTypeIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <Icon className="h-5 w-5 text-red-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{event.description}</p>
                          <p className="text-xs text-gray-500">
                            {event.ip_address} • {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                          {event.severity.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <HiLightBulb className="h-5 w-5 mr-2" />
                  Security Recommendations
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <HiCheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Enable two-factor authentication for all admin accounts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HiCheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Set up IP whitelisting for admin access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HiCheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Review and update password policies</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Events Tab */}
          {selectedTab === 'events' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  
                  <select
                    value={eventTypeFilter}
                    onChange={(e) => setEventTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="login_success">Login Success</option>
                    <option value="login_failed">Login Failed</option>
                    <option value="password_change">Password Change</option>
                    <option value="role_change">Role Change</option>
                    <option value="suspicious_activity">Suspicious Activity</option>
                    <option value="admin_action">Admin Action</option>
                  </select>
                </div>
              </div>

              {/* Events List */}
              <div className="space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading security events...</span>
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <HiShieldCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No security events found</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => {
                    const Icon = getEventTypeIcon(event.type);
                    const SeverityIcon = getSeverityIcon(event.severity);
                    return (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{event.description}</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                                <SeverityIcon className="h-3 w-3 mr-1" />
                                {event.severity.toUpperCase()}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <HiGlobe className="h-4 w-4 mr-1" />
                                {event.ip_address}
                              </span>
                              {event.location && (
                                <span className="flex items-center">
                                  <HiLocationMarker className="h-4 w-4 mr-1" />
                                  {event.location}
                                </span>
                              )}
                              <span className="flex items-center">
                                <HiClock className="h-4 w-4 mr-1" />
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                              {event.user_name && (
                                <span className="flex items-center">
                                  <HiUser className="h-4 w-4 mr-1" />
                                  {event.user_name}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{event.device_info}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Active Sessions Tab */}
          {selectedTab === 'sessions' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device & Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Session Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeSessions.map((session) => (
                      <tr key={session.id} className={session.is_current ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{session.user_name}</div>
                            <div className="text-sm text-gray-500">{session.role}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900 flex items-center">
                              {session.device_type === 'Desktop' ? <HiDesktopComputer className="h-4 w-4 mr-1" /> : <HiDeviceMobile className="h-4 w-4 mr-1" />}
                              {session.browser}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <HiLocationMarker className="h-4 w-4 mr-1" />
                              {session.location} ({session.ip_address})
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              Logged in: {new Date(session.login_time).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              Last activity: {new Date(session.last_activity).toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {session.is_current ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <HiCheckCircle className="h-3 w-3 mr-1" />
                              Current Session
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <HiClock className="h-3 w-3 mr-1" />
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {!session.is_current && (
                            <button
                              onClick={() => handleTerminateSession(session.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Terminate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Authentication Settings */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <HiLockClosed className="h-5 w-5 mr-2" />
                    Authentication Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.max_login_attempts}
                        onChange={(e) => setSettings({...settings, max_login_attempts: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.session_timeout}
                        onChange={(e) => setSettings({...settings, session_timeout: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        value={settings.password_min_length}
                        onChange={(e) => setSettings({...settings, password_min_length: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <HiShieldCheck className="h-5 w-5 mr-2" />
                    Security Features
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'require_2fa', label: 'Require Two-Factor Authentication', icon: HiFingerPrint },
                      { key: 'enable_ip_whitelist', label: 'Enable IP Whitelisting', icon: HiGlobe },
                      { key: 'enable_device_tracking', label: 'Enable Device Tracking', icon: HiDeviceMobile },
                      { key: 'enable_geo_blocking', label: 'Enable Geographic Blocking', icon: HiLocationMarker },
                      { key: 'auto_logout_inactive', label: 'Auto-logout Inactive Users', icon: HiClock },
                      { key: 'log_all_actions', label: 'Log All User Actions', icon: HiClipboard },
                      { key: 'email_security_alerts', label: 'Email Security Alerts', icon: HiBell }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, [key]: !(settings as any)[key]})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            (settings as any)[key] ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              (settings as any)[key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleUpdateSettings(settings)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Security Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;