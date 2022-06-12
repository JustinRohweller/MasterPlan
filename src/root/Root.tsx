import { ignoreSettingATimer } from "@jrohweller/mycomponents.ui.constants";
import { MoleculeProvider } from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootFonts from "./RootFonts";
import RootLoadingProvider from "./RootLoadingProvider";
import RootStatusBar from "./RootStatusBar";

ignoreSettingATimer.ignore();

// TODO: extends all the other file's props
interface RootProps {
  fonts: any;
  children: ReactNode;
  loadingProviderContent: any;
}

const Root = (props: RootProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const theme = {
    textColor: "#019123",
    fontFamily: "OpenSansBold",
  };

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
                <MoleculeProvider theme={theme}>
                  <RootLoadingProvider content={props.loadingProviderContent}>
                    {props.children}
                    {/* TODO: */}
                    {/* RooatAlert */}
                    {/* RootError */}
                    {/* RootFirebase */}
                    {/* RootGlobals */}
                    {/* RootNoInternet */}
                    {/* RootSentry */}
                    {/* RootAppStoreUpdates */}
                    {/* RootOTAUpdates */}
                    {/* RootImageInitializer */}
                    {/* RootSplashKeeper */}
                    {/* RootLinkingHandler */}
                    {/* RootMemoryWatcher */}
                  </RootLoadingProvider>
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
