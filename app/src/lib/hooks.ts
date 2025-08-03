import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from './api';
import type { Project, ApiResponse, PaginatedResponse, LoadingState, PaginationState } from './types';

// ========================================
// LOCAL STORAGE HOOK
// ========================================

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// ========================================
// DEBOUNCE HOOK
// ========================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ========================================
// API HOOK
// ========================================

export function useApi<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<LoadingState & { data: T | null }>({
    data: null,
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: undefined }));
        
        const response = await fetch(`/api${url}`, {
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<T> = await response.json();
        
        if (!cancelled) {
          if (result.success) {
            setState({
              data: result.data,
              isLoading: false,
              error: undefined,
            });
          } else {
            setState({
              data: null,
              isLoading: false,
              error: result.error || 'Unknown error occurred',
            });
          }
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Network error occurred',
          });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, JSON.stringify(options)]);

  return state;
}

// ========================================
// PAGINATION HOOK
// ========================================

export function usePagination(totalItems: number, itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const pagination: PaginationState = useMemo(() => ({
    page: currentPage,
    limit: itemsPerPage,
    total: totalItems,
    totalPages: Math.ceil(totalItems / itemsPerPage),
  }), [currentPage, itemsPerPage, totalItems]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, pagination.totalPages)));
  }, [pagination.totalPages]);

  const goToNext = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevious = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToFirst = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLast = useCallback(() => {
    goToPage(pagination.totalPages);
  }, [goToPage, pagination.totalPages]);

  return {
    pagination,
    goToPage,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    canGoNext: currentPage < pagination.totalPages,
    canGoPrevious: currentPage > 1,
  };
}

// ========================================
// DEBOUNCED SEARCH HOOK
// ========================================

export function useDebounceSearch(initialQuery: string = '', delay: number = 300) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const debouncedQuery = useDebounce(query, delay);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => {
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const toggleSort = useCallback((field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  return {
    query,
    setQuery,
    debouncedQuery,
    filters,
    setFilters,
    updateFilter,
    removeFilter,
    clearFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    toggleSort,
  };
}

// ========================================
// PROJECTS HOOK
// ========================================

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: true,
    error: undefined,
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading({ isLoading: true, error: undefined });
      
      const response = await api.get<PaginatedResponse<Project>>('/projects');
      
      setProjects(response.data);
      setLoading({ isLoading: false, error: undefined });
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      });
    }
  }, []);

  const createProject = useCallback(async (projectData: Partial<Project>) => {
    try {
      const response = await api.post<Project>('/projects', projectData);
      
      setProjects(prev => [response, ...prev]);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }, []);

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await api.put<Project>(`/projects/${id}`, projectData);
      
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? { ...project, ...response } : project
        )
      );
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      
      setProjects(prev => prev.filter(project => project.id !== id));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}