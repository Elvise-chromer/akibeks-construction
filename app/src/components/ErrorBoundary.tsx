import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HiExclamation, HiRefresh, HiHome, HiArrowLeft } from 'react-icons/hi';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: Send to error reporting service
      // reportError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <HiExclamation className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but something unexpected happened. Please try one of the options below.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <HiRefresh className="h-5 w-5" />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleGoBack}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <HiArrowLeft className="h-5 w-5" />
                <span>Go Back</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <HiHome className="h-5 w-5" />
                <span>Go Home</span>
              </button>
            </div>

            {/* Development mode error details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 font-medium">
                  Technical Details (Development Mode)
                </summary>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-800">
                    <div className="font-semibold mb-2">Error:</div>
                    <div className="font-mono text-xs mb-4 break-words">
                      {this.state.error.message}
                    </div>
                    {this.state.errorInfo && (
                      <>
                        <div className="font-semibold mb-2">Component Stack:</div>
                        <pre className="text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-32">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </div>
              </details>
            )}

            {/* Contact information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                If this problem persists, please contact us:
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Phone: +254-700-123-456</div>
                <div>Email: support@akibeks.co.ke</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;