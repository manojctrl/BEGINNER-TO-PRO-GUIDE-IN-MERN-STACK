import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleWindowError = this.handleWindowError.bind(this);
    this.handleUnhandledRejection = this.handleUnhandledRejection.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener('error', this.handleWindowError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleWindowError);
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global Error:', error, errorInfo);
    this.setState({ hasError: true, error });
  }

  handleWindowError(event) {
    if (event.target && event.target !== window) {
      return;
    }

    const error = event.error || new Error(event.message || 'Unexpected runtime error');
    this.setState({ hasError: true, error });
  }

  handleUnhandledRejection(event) {
    const reason = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason || 'Unhandled promise rejection'));

    this.setState({ hasError: true, error: reason });
    event.preventDefault();
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 text-center bg-red-50 text-red-700">
          <h2 className="font-bold text-lg">Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
