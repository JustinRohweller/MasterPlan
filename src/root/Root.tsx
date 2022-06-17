import { ignoreSettingATimer } from "@jrohweller/mycomponents.ui.constants";
import { MoleculeProvider } from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootErrorBoundary from "./RootErrorBoundary";
import RootFonts from "./RootFonts";
import RootLoadingProvider from "./RootLoadingProvider";
import RootNoInternet from "./RootNoInternet";
import RootStatusBar from "./RootStatusBar";

ignoreSettingATimer.ignore();

// TODO: extends all the other file's props
interface RootProps {
  fonts: any;
  children: ReactNode;
  loadingProviderContent: any;
  moleculeTheme: any;
  errorBoundaryContent: any;
  noInternetContent: any;
}

const Root = (props: RootProps) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <NavigationContainer>
        <RootFonts fonts={props.fonts}>
          <TouchableWithoutFeedback
            onPress={() => {
              setFullScreen(!fullScreen);
            }}
          >
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
                      {/* TODO: */}
                      {/* Really we just want a root alert that the user can set upon events. */}
                      {/* RootOTAUpdates */}
                      {/* RootError */}
                      {/* RootAlert */}
                      {/* RootFirebase */}
                      {/* RootGlobals */}
                      {/* RootSentry */}
                      {/* RootAppStoreUpdates */}
                      {/* RootImageInitializer */}
                      {/* RootSplashKeeper */}
                      {/* RootLinkingHandler */}
                      {/* RootMemoryWatcher */}
                    </RootLoadingProvider>
                  </RootErrorBoundary>
                </MoleculeProvider>
              </SafeAreaView>
            </SafeAreaProvider>
          </TouchableWithoutFeedback>
        </RootFonts>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
});

export default Root;
// warning:
// makeTHeme from dripsy forces double refresh.
