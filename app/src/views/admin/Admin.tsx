import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiOfficeBuilding, 
  HiUsers, 
  HiCog, 
  HiChartBar,
  HiBell,
  HiLogout,
  HiMenu,
  HiX,
  HiDocumentText,
  HiClipboard,
  HiShieldCheck,
  HiGlobe,
  HiCalendar,
  HiCollection,
  HiLightningBolt,
  HiDatabase,
  HiCurrencyDollar,
  HiUserGroup
} from 'react-icons/hi';
import { useAuthContext } from '../../lib/AuthContext';
import Dashboard from '../../admin/dashboard/AdminDashboard';
import ProjectManagement from './projects/ProjectManagement';

// Import new admin components
import InvoiceManagement from './invoices/InvoiceManagement';
import InvoiceEditor from './invoices/InvoiceEditor';
import QuotationManagement from './quotations/QuotationManagement';
import QuotationEditor from './quotations/QuotationEditor';
import SecurityDashboard from './security/SecurityDashboard';
import AdvancedMetrics from './analytics/AdvancedMetrics';
import DocumentManagement from './documents/DocumentManagement';
import TaskManagement from './projects/TaskManagement';
import AuditLogs from './audit/AuditLogs';
import CompanySettings from './settings/CompanySettings';
import SEOManagement from './seo/SEOManagement';
import ProjectMilestones from './projects/ProjectMilestones';
import EnhancedCalendar from './calendar/EnhancedCalendar';
import ProjectCalendar from './calendar/ProjectCalendar';
import TodoManagement from './projects/TodoManagement';
import ContentManagement from './content/ContentManagement';
import WebsiteContentManagement from './content/WebsiteContentManagement';
import LeadManagement from './leads/LeadManagement';

const Admin: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HiHome, current: location.pathname === '/admin' },
    { 
      name: 'Financial Management', 
      icon: HiCurrencyDollar, 
      current: location.pathname.startsWith('/admin/invoices') || location.pathname.startsWith('/admin/quotations'),
      children: [
        { name: 'Invoices', href: '/admin/invoices', icon: HiDocumentText },
        { name: 'Quotations', href: '/admin/quotations', icon: HiClipboard }
      ]
    },
    { 
      name: 'Project Management', 
      icon: HiOfficeBuilding, 
      current: location.pathname.startsWith('/admin/projects') || location.pathname.startsWith('/admin/todos'),
      children: [
        { name: 'Projects', href: '/admin/projects', icon: HiOfficeBuilding },
        { name: 'Tasks', href: '/admin/tasks', icon: HiCollection },
        { name: 'Todo Management', href: '/admin/todos', icon: HiClipboard },
        { name: 'Milestones', href: '/admin/milestones', icon: HiLightningBolt }
      ]
    },
    { 
      name: 'Website Management', 
      icon: HiGlobe, 
      current: location.pathname.startsWith('/admin/content') || location.pathname.startsWith('/admin/seo') || location.pathname.startsWith('/admin/website'),
      children: [
        { name: 'Content & Pages', href: '/admin/content', icon: HiDocumentText },
        { name: 'Website Settings', href: '/admin/website', icon: HiCog },
        { name: 'SEO Management', href: '/admin/seo', icon: HiChartBar }
      ]
    },
    { 
      name: 'Calendar & Scheduling', 
      icon: HiCalendar, 
      current: location.pathname.startsWith('/admin/calendar'),
      children: [
        { name: 'Calendar View', href: '/admin/calendar', icon: HiCalendar },
        { name: 'Project Calendar', href: '/admin/calendar/projects', icon: HiOfficeBuilding }
      ]
    },
    { name: 'Documents', href: '/admin/documents', icon: HiDatabase, current: location.pathname.startsWith('/admin/documents') },
    { name: 'Analytics', href: '/admin/analytics', icon: HiChartBar, current: location.pathname.startsWith('/admin/analytics') },
    { name: 'Security', href: '/admin/security', icon: HiShieldCheck, current: location.pathname.startsWith('/admin/security') },
    { name: 'Audit Logs', href: '/admin/audit', icon: HiClipboard, current: location.pathname.startsWith('/admin/audit') },
    { name: 'Leads', href: '/admin/leads', icon: HiUsers, current: location.pathname.startsWith('/admin/leads') },
    { name: 'Settings', href: '/admin/settings', icon: HiCog, current: location.pathname.startsWith('/admin/settings') },
  ];

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login Required
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please log in to access the admin panel
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <HiX className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 text-white rounded-lg p-2">
                  <HiOfficeBuilding className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Akibeks Admin</h1>
                </div>
              </div>
            </div>
            
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div className="space-y-1">
                        <div className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          item.current
                            ? 'bg-primary-100 text-primary-600'
                            : 'text-gray-600'
                        }`}>
                          <item.icon className={`mr-4 h-6 w-6 ${item.current ? 'text-primary-600' : 'text-gray-400'}`} />
                          {item.name}
                        </div>
                        <div className="ml-8 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                location.pathname.startsWith(child.href)
                                  ? 'bg-primary-100 text-primary-600'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              <child.icon className={`mr-3 h-4 w-4 ${location.pathname.startsWith(child.href) ? 'text-primary-600' : 'text-gray-400'}`} />
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          item.current
                            ? 'bg-primary-100 text-primary-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className={`mr-4 h-6 w-6 ${item.current ? 'text-primary-600' : 'text-gray-400'}`} />
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 text-white rounded-lg p-2">
                  <HiOfficeBuilding className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Akibeks Admin</h1>
                </div>
              </div>
            </div>
            
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-1">
                      <div className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        item.current
                          ? 'bg-primary-100 text-primary-600'
                          : 'text-gray-600'
                      }`}>
                        <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-primary-600' : 'text-gray-400'}`} />
                        {item.name}
                      </div>
                      <div className="ml-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`group flex items-center px-2 py-2 text-xs font-medium rounded-md ${
                              location.pathname.startsWith(child.href)
                                ? 'bg-primary-100 text-primary-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <child.icon className={`mr-2 h-4 w-4 ${location.pathname.startsWith(child.href) ? 'text-primary-600' : 'text-gray-400'}`} />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        item.current
                          ? 'bg-primary-100 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-primary-600' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Logout"
              >
                <HiLogout className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Financial Management */}
            <Route path="/invoices" element={<InvoiceManagement />} />
            <Route path="/invoices/new" element={<InvoiceEditor />} />
            <Route path="/invoices/:id/edit" element={<InvoiceEditor />} />
            <Route path="/quotations" element={<QuotationManagement />} />
            <Route path="/quotations/new" element={<QuotationEditor />} />
            <Route path="/quotations/:id/edit" element={<QuotationEditor />} />
            
            {/* Project Management */}
            <Route path="/projects/*" element={<ProjectManagement />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/todos" element={<TodoManagement />} />
            <Route path="/milestones" element={<ProjectMilestones />} />
            
            {/* Calendar and Scheduling */}
            <Route path="/calendar" element={<EnhancedCalendar />} />
            <Route path="/calendar/projects" element={<ProjectCalendar />} />
            
            {/* Document and Content Management */}
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            
            {/* Website Management */}
            <Route path="/website" element={<WebsiteContentManagement />} />
            <Route path="/seo" element={<SEOManagement />} />
            
            {/* Analytics and Metrics */}
            <Route path="/analytics" element={<AdvancedMetrics />} />
            
            {/* Security and Audit */}
            <Route path="/security" element={<SecurityDashboard />} />
            <Route path="/audit" element={<AuditLogs />} />
            
            {/* Settings and Configuration */}
            <Route path="/settings" element={<CompanySettings />} />
            
            {/* Lead Management */}
            <Route path="/leads" element={<LeadManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;