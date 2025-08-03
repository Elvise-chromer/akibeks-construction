// Authentication & Context
export { AuthProvider, useAuthContext } from './AuthContext';

// API & Services
export { api } from './api';

// Types (re-export main types)
export type {
  User,
  Project,
  Service,
  BlogPost,
  ContactForm,
  QuoteRequest,
  MaintenanceRequest,
  AdminStats,
  ProjectStatus,
  ServiceCategory
} from './types';

// Utility functions
export {
  cn,
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  formatNumber,
  formatRelativeTime,
  slugify,
  truncateText,
  getStatusColor,
  validateEmail,
  validatePhone
} from './utils';

// Hooks
export {
  useLocalStorage,
  useDebounce,
  useApi,
  usePagination,
  useDebounceSearch,
  useProjects
} from './hooks';