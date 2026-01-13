'use client';

import React, { Component, ReactNode } from 'react';

// Define shape of state
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Define props (wrapping children component)
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        // Initialize state with no error
        this.state = {
            hasError: false,
            error: null,
        };
    }

    // Method called when an error is thrown in a child component
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state to indicate an error has occurred
        return {
            hasError: true,
            error: error,
        };
    }

    // Method called after an error has been thrown, logging/reporting the error
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log the error to the console
        console.error('Error caught by ErrorBoundary:', error);
        console.error('Error info:', errorInfo);
        console.error('Component stack:', errorInfo.componentStack);
    }

    // Reset the error state
    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-2">
                    <h2 className="text-lg font-bold text-red-800 mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-sm text-red-600 mb-4">
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                    <button
                        onClick={this.resetError}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                        Try Again
                    </button>
                </div>
            );
        }

        // If no error
        return this.props.children;
    }
}

export default ErrorBoundary;