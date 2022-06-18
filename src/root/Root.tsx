import { MoleculeProvider } from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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

// TODO: extends all the other file's props
interface RootProps {
  fonts: any;
  images: any;
  children: ReactNode;
  loadingProviderContent: any;
  moleculeTheme: any;
  errorBoundaryContent: any;
  noInternetContent: any;
  requiredOTAContent: any;
  onLowMemory?: any;
  onUrl?: any;
  shouldKeepSplash?: boolean;
}

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
                lightColor={"transparent"}
                darkColor={"transparent"}
                theme={"dark"}
              />
              <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
                <MoleculeProvider theme={props.moleculeTheme}>
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
// warning:
// makeTHeme from dripsy forces double refresh.
