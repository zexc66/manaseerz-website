'use client';

import React, { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
};

type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[ErrorBoundary:${this.props.label ?? 'unnamed'}]`, error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return null;
    }
    return this.props.children;
  }
}
