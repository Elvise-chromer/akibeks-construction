// ========================================
// CORE TYPES
// ========================================

// User & Authentication
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ========================================
// BUSINESS TYPES
// ========================================

// Projects
export type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold';
export type ServiceCategory = 'residential' | 'commercial' | 'industrial';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  status: ProjectStatus;
  location: string;
  startDate: string;
  endDate?: string;
  budget: number;
  images: string[];
  features: string[];
  clientId: string;
  managerId: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

// Services
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: {
    min: number;
    max?: number;
    unit: string;
  };
  features: string[];
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// FORM TYPES
// ========================================

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  location: string;
  message: string;
}

export interface QuoteRequest {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  projectInfo: {
    type: string;
    category: string;
    location: string;
    timeline: string;
    budget: string;
  };
  requirements: {
    services: string[];
    description: string;
    attachments: File[];
  };
}

export interface MaintenanceRequest {
  serviceType: string;
  urgency: string;
  propertyType: string;
  issueDescription: string;
  location: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    preferredTime: string;
  };
}

// ========================================
// ADMIN & ANALYTICS
// ========================================

export interface AdminStats {
  projects: {
    total: number;
    active: number;
    completed: number;
    revenue: number;
  };
  leads: {
    new: number;
    qualified: number;
    converted: number;
    pipeline: number;
  };
  team: {
    total: number;
    active: number;
    onProject: number;
  };
  revenue: {
    thisMonth: number;
    lastMonth: number;
    growth: number;
    target: number;
  };
}

// ========================================
// API TYPES
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ========================================
// UI TYPES
// ========================================

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchState {
  query: string;
  filters: Record<string, any>;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}