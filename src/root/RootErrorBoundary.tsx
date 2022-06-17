import { Component } from "react";
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
    if (this.props.onError) {
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
    if (this.state.hasError) {
      if (this.props.content) {
        return (
          <RootAlertHelper
            content={this.props.content}
            show={this.state.hasError}
          />
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
