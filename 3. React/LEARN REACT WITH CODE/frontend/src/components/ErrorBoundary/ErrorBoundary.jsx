import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: null };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went error</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
