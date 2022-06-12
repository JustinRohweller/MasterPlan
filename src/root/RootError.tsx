import React, { Component } from "react";
import * as Updates from "expo-updates";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { PERCENTS } from "../constants";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      errorInfo: "",
      canSeeError: false
    };
  }

  componentDidCatch(error, errorInfo) {
    try {
      console.info("error");
      console.info(JSON.stringify(error));
      console.info(errorInfo);
    } catch (err) {
      console.info(`error sending resulting error within errorboundary, ${JSON.stringify(err)}`);
    }

    this.setState({ hasError: true, error, errorInfo });

    // idea: MAKE THIS SCREEN NICER
    // eh, it's an error screen, hopefully they never see it.
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ScrollView
          style={{ height: PERCENTS.HEIGHT[100], width: PERCENTS.WIDTH[100] }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginHorizontal: 10
          }}
        >
          <Text>Something went wrong.</Text>
          <Text>We'd like to fix it for you</Text>
          <TouchableOpacity
            onPress={() => {}
              // LINKING.onSendErrorFeedback(
              //   this.state.error,
              //   this.state.errorInfo
              // )
            }
          >
            <Text>Send Error to us via email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Updates.reloadAsync()}>
            <Text>Restart app</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({ canSeeError: !this.state.canSeeError })
            }
          >
            <Text>See the error for myself</Text>
          </TouchableOpacity>
          {this.state.canSeeError && (
            <Text>{`${this.state.error}:\n${JSON.stringify(
              this.state.errorInfo
            )}`}</Text>
          )}
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
