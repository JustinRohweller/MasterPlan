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

// TODO: extends all the other file's props
interface RootProps {
  fonts: any;
  children: ReactNode;
  loadingProviderContent: any;
  moleculeTheme: any;
  errorBoundaryContent: any;
  noInternetContent: any;
  requiredOTAContent: any;
  images: any;
}

const Root = (props: RootProps) => {
  const [isLoadingComplete] = useCacheImages(props.images);

  return (
    <RootAlertHelper
      content={
        <GestureHandlerRootView style={styles.gestureHandler}>
          <NavigationContainer>
            <RootFonts fonts={props.fonts}>
              <SafeAreaProvider>
                <RootStatusBar
                  lightColor={"transparent"}
                  darkColor={"transparent"}
                  theme={"dark"}
                />
                <SafeAreaView
                  style={{ backgroundColor: "transparent", flex: 1 }}
                >
                  <MoleculeProvider theme={props.moleculeTheme}>
                    {/* @ts-ignore */}
                    <RootErrorBoundary content={props.errorBoundaryContent}>
                      <RootLoadingProvider
                        content={props.loadingProviderContent}
                      >
                        {props.children}
                        <RootNoInternet content={props.noInternetContent} />
                        <RootOTAUpdates content={props.requiredOTAContent} />
                        {/* TODO: export the hooks and the components */}
                        {/* supposed to be things you want in every project. */}
                        {/* RootAppStoreUpdates */}
                        {/* RootSplashKeeper */}
                        {/* RootLinkingHandler */}
                        {/* RootMemoryWatcher */}

                        {/* These ones maybe put somewhere else /not in this v1, including alert stuff */}
                        {/* RootFirebase */}
                        {/* RootSentry */}
                        {/* alerts */}
                        {/* Really we just want a root alert that the user can set upon events. */}
                        {/* I think what we'll do is just export helpers to make other alerts.  */}
                        {/* RootError */}
                        {/* RootAlert */}
                      </RootLoadingProvider>
                    </RootErrorBoundary>
                  </MoleculeProvider>
                </SafeAreaView>
              </SafeAreaProvider>
            </RootFonts>
          </NavigationContainer>
        </GestureHandlerRootView>
      }
      show={isLoadingComplete}
    />
  );
};

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
});

export default Root;
// warning:
// makeTHeme from dripsy forces double refresh.
