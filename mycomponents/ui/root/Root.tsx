import { MoleculeProvider } from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootAlertHelper from "./RootAlertHelper";
import RootErrorBoundary from "./RootErrorBoundary";
import RootFonts from "./RootFonts";
import RootLoadingProvider from "./RootLoadingProvider";
import RootNoInternet from "./RootNoInternet";
import RootOTAUpdates from "./RootOTAUpdates";
import RootStatusBar from "./RootStatusBar";
import useCacheImages from "./useCacheImages";
import useKeepSplash from "./useKeepSplash";
import useLinkingUrl from "./useLinkingUrl";
import useWatchMemory from "./useWatchMemory";

interface RootProps {
  fonts: any;
  images: any;
  children: ReactNode;
  theme: any;
  loadingProviderContent?: any;
  errorBoundaryContent?: any;
  noInternetContent?: any;
  requiredOTAContent?: any;
  onLowMemory?: any;
  onUrl?: any;
  shouldKeepSplash?: boolean;
  statusBarTheme?: "light" | "dark";
  dripsyTheme: any;
}

// other things:
// app store version check.
// maybe a global root customizable alert. (not pre-configured)
// ex. alert(Your gift has been sent.)

const Root = (props: RootProps) => {
  const [isLoadingComplete] = useCacheImages(props.images);
  useWatchMemory(props.onLowMemory);
  useKeepSplash(isLoadingComplete || props.shouldKeepSplash);
  useLinkingUrl(props.onUrl);

  const content = () => {
    return (
      <GestureHandlerRootView style={styles.gestureHandler}>
        <NavigationContainer>
          <RootFonts fonts={props.fonts}>
            <SafeAreaProvider>
              <RootStatusBar
                lightColor={props.theme.statusBarLight}
                darkColor={props.theme.statusBarDark}
                theme={props.theme.statusBarTheme || "light"}
              />
              <SafeAreaView style={styles.gestureHandler}>
                <MoleculeProvider
                  theme={props.theme}
                  dripsyTheme={props.dripsyTheme}
                >
                  {/* @ts-ignore */}
                  <RootErrorBoundary content={props.errorBoundaryContent}>
                    <RootLoadingProvider content={props.loadingProviderContent}>
                      {props.children}
                      <RootNoInternet content={props.noInternetContent} />
                      <RootOTAUpdates content={props.requiredOTAContent} />
                    </RootLoadingProvider>
                  </RootErrorBoundary>
                </MoleculeProvider>
              </SafeAreaView>
            </SafeAreaProvider>
          </RootFonts>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  };

  return <RootAlertHelper content={content} show={isLoadingComplete} />;
};

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
});

export default Root;
