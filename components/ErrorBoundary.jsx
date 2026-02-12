"use client";

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
          <h2 className="text-xl font-medium text-text-primary">
            Something went wrong
          </h2>
          <p className="text-text-tertiary text-center max-w-md text-pretty">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-brand text-white rounded-full hover:bg-brand-hover transition-colors duration-150"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
