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

  componentDidCatch(error: any, errorInfo: any) {
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
    return (
      <RootAlertHelper
        content={this.props.content}
        show={this.state.hasError}
      />
    );
  }
}

export default ErrorBoundary;
