import React, { Component } from "react";
import RootAlertHelper from "./RootAlertHelper";

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      errorInfo: "",
      canSeeError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // @ts-ignore
    if (this.props.onError) {
      // @ts-ignore
      this.props.onError(error, errorInfo);
    }
    try {
      console.info("error");
      console.info(JSON.stringify(error));
      console.info(errorInfo);
    } catch (err) {
      console.info(
        `error sending resulting error within errorboundary, ${JSON.stringify(
          err
        )}`
      );
    }

    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // @ts-ignore
      if (this.props.content) {
        return (
          <RootAlertHelper
            // @ts-ignore
            content={this.props.content}
            // @ts-ignore
            show={this.state.hasError}
          />
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
