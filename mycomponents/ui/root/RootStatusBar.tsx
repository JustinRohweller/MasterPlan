import type { StatusBarProps, StatusBarStyle } from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

// https://docs.expo.dev/versions/latest/sdk/status-bar/#api

interface RootStatusBarProps {
  theme: StatusBarStyle | undefined;
  animated?: boolean | undefined;
  hidden?: boolean | undefined;
  platformSpecificProps?: StatusBarProps;
  lightColor: string;
  darkColor: string;
}

const RootStatusBar = ({
  theme,
  animated,
  hidden,
  lightColor,
  darkColor,
  platformSpecificProps,
}: RootStatusBarProps) => {
  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        {...{ animated, hidden }}
        {...platformSpecificProps}
      />
      <SafeAreaView
        style={{
          backgroundColor: theme === "light" ? lightColor : darkColor,
        }}
      />
    </>
  );
};

export default RootStatusBar;
