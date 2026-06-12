import { Component, type ErrorInfo, type ReactNode } from "react";
import { Card } from "@mfe-practice/ui";

type Props = {
  children: ReactNode;
  label: string;
};

type State = {
  error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Remote ${this.props.label} failed`, error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <Card as="section" className="remote-error" role="alert">
          <h2>{this.props.label} remote is unavailable</h2>
          <p>
            Start all apps with <code>pnpm dev</code> or run{" "}
            <code>pnpm preview</code> after a build.
          </p>
        </Card>
      );
    }

    return this.props.children;
  }
}

