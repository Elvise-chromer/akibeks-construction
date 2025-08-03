import type { PaginatedResponse } from './types';

// ========================================
// API CONFIGURATION
// ========================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      const error = data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(error);
    }

    return data;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  // Quotes API
  async getQuotes(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    client_id?: string;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
  }) {
    return this.get('/admin/quotes', params);
  }

  async getQuote(id: string) {
    return this.get(`/admin/quotes/${id}`);
  }

  async createQuote(data: any) {
    return this.post('/admin/quotes', data);
  }

  async updateQuote(id: string, data: any) {
    return this.put(`/admin/quotes/${id}`, data);
  }

  async deleteQuote(id: string) {
    return this.delete(`/admin/quotes/${id}`);
  }

  async getQuoteMetrics() {
    return this.get('/admin/quotes/metrics/summary');
  }

  async bulkQuoteAction(action: string, quote_ids: string[]) {
    return this.post(`/admin/quotes/bulk/${action}`, { quote_ids });
  }

  // Invoices API
  async getInvoices(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    client_id?: string;
    overdue_only?: boolean;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
  }) {
    return this.get('/admin/invoices', params);
  }

  async getInvoice(id: string) {
    return this.get(`/admin/invoices/${id}`);
  }

  async createInvoice(data: any) {
    return this.post('/admin/invoices', data);
  }

  async updateInvoiceStatus(id: string, status: string, notes?: string) {
    return this.put(`/admin/invoices/${id}/status`, { status, notes });
  }

  async processPayment(id: string, amount: number, payment_date?: string, notes?: string) {
    return this.post(`/admin/invoices/${id}/payment`, { amount, payment_date, notes });
  }

  async deleteInvoice(id: string) {
    return this.delete(`/admin/invoices/${id}`);
  }

  async getInvoiceMetrics() {
    return this.get('/admin/invoices/metrics/summary');
  }

  async bulkInvoiceAction(action: string, invoice_ids: string[]) {
    return this.post(`/admin/invoices/bulk/${action}`, { invoice_ids });
  }

  async createInvoiceFromQuote(quote_id: string, issue_date: string, due_date: string) {
    return this.post(`/admin/invoices/from-quote/${quote_id}`, { issue_date, due_date });
  }

  // Company API
  async getCompanySettings() {
    return this.get('/admin/company/settings');
  }

  async updateCompanySettings(data: any) {
    return this.put('/admin/company/settings', data);
  }

  async uploadLogo(logo_url: string) {
    return this.post('/admin/company/logo', { logo_url });
  }

  async uploadLetterhead(letterhead_url: string) {
    return this.post('/admin/company/letterhead', { letterhead_url });
  }

  async getCompanyMetrics() {
    return this.get('/admin/company/metrics');
  }

  // Analytics API
  async getFinancialMetrics(period?: string) {
    return this.get('/admin/analytics/financial', { period });
  }

  async getOperationalMetrics(period?: string) {
    return this.get('/admin/analytics/operational', { period });
  }

  async getCustomerMetrics(period?: string) {
    return this.get('/admin/analytics/customer', { period });
  }

  async getTeamMetrics(period?: string) {
    return this.get('/admin/analytics/team', { period });
  }

  async getEfficiencyMetrics(period?: string) {
    return this.get('/admin/analytics/efficiency', { period });
  }

  async getTrendData(metric: string, period?: string, duration?: number) {
    return this.get(`/admin/analytics/trends/${metric}`, { period, duration });
  }

  async getAlerts() {
    return this.get('/admin/analytics/alerts');
  }

  // Audit API
  async getAuditLogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    action?: string;
    resource_type?: string;
    user_id?: string;
    severity?: string;
    start_date?: string;
    end_date?: string;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
  }) {
    return this.get('/admin/audit/logs', params);
  }

  async getAuditLog(id: string) {
    return this.get(`/admin/audit/logs/${id}`);
  }

  async getAuditStats(period?: string) {
    return this.get('/admin/audit/stats', { period });
  }

  async getAuditTimeline(params?: {
    period?: string;
    duration?: number;
    action?: string;
    resource_type?: string;
  }) {
    return this.get('/admin/audit/timeline', params);
  }

  async getSecurityEvents(params?: {
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
  }) {
    return this.get('/admin/audit/security', params);
  }

  async exportAuditLogs(format: string, filters?: any, start_date?: string, end_date?: string) {
    return this.post('/admin/audit/export', { format, filters, start_date, end_date });
  }

  async createAuditLog(data: {
    action: string;
    resource_type: string;
    resource_id?: string;
    resource_name?: string;
    old_values?: any;
    new_values?: any;
    details?: any;
    severity?: string;
  }) {
    return this.post('/admin/audit/log', data);
  }

  async getAuditFilters() {
    return this.get('/admin/audit/filters');
  }
}

export const api = new ApiService();
export default api;