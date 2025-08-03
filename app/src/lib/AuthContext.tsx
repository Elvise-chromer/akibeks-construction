import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// ========================================
// TYPES
// ========================================

export interface User {
  id: string;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  twoFAEnabled?: boolean;
  permissions?: string[];
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========================================
// AUTH PROVIDER
// ========================================

interface AuthProviderProps {
  children: ReactNode;
}

// Configure axios defaults
//axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//axios.defaults.withCredentials = true;

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {  
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          const response = await axios.post('/api/auth/refresh', {
            refreshToken,
          });
          
          if (response.data.success && response.data.accessToken) {
            Cookies.set('accessToken', response.data.accessToken, {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
            
            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axios(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      
      if (accessToken || refreshToken) {
        // Try to get current user info
        await checkAuth();
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      
      if (response.data.success && response.data.user) {
        const accessToken = Cookies.get('accessToken');
        
        setAuthState({
          user: response.data.user,
          token: accessToken || null,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Check auth error:', error);
      
      // Clear invalid tokens
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await axios.post('/api/auth/login', {
        email,
        password,
        rememberMe: false, // Can be made configurable
      });

      if (response.data.success) {
        if (response.data.requires2FA) {
          // 2FA is handled in the Login component
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return false; // Don't complete login yet
        } else if (response.data.user && response.data.accessToken) {
          // Login successful
          const { user, accessToken, refreshToken } = response.data;
          
          // Cookies are set by the server, but we can also set them client-side
          if (accessToken) {
            Cookies.set('accessToken', accessToken, {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
          }
          if (refreshToken) {
            Cookies.set('refreshToken', refreshToken, {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
          }

          setAuthState({
            user,
            token: accessToken,
            isLoading: false,
            isAuthenticated: true,
          });

          return true;
        }
      }

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
      return false;

    } catch (error: any) {
      console.error('Login error:', error);
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
      
      const message = error.response?.data?.message || 'Login failed. Please check your email and password and try again.';
      toast.error(message);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = Cookies.get('refreshToken');
      
      // Call logout endpoint
      await axios.post('/api/auth/logout', {
        refreshToken,
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and state regardless of API call success
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
      
      toast.success('Logged out successfully');
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = Cookies.get('refreshToken');
      
      if (!refreshTokenValue) {
        return false;
      }

      const response = await axios.post('/api/auth/refresh', {
        refreshToken: refreshTokenValue,
      });

      if (response.data.success && response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        setAuthState(prev => ({
          ...prev,
          token: response.data.accessToken,
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Optionally show a toast only if not a network error
      if (error.response) {
        toast.error('Session expired. Please log in again.');
      }
      return false;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
    refreshToken,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ========================================
// HOOK
// ========================================

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}

// ========================================
// PROTECTED ROUTE COMPONENT
// ========================================

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  // Check role requirement
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Check permission requirements
  if (requiredPermissions && requiredPermissions.length > 0) {
    const userPermissions = user?.permissions || [];
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have the required permissions to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Default export for convenience
export default AuthProvider;