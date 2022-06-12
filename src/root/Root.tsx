import {
  ignoreSettingATimer,
  PERCENTS,
} from "@jrohweller/mycomponents.ui.constants";
import {
  MoleculeProvider,
  Simage,
  Stext,
  Sview,
} from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import RootLoadingProvider from "./RootLoadingProvider";
import RootStatusBar from "./RootStatusBar";

// Splash screen => loading animation => content (already loaded)

ignoreSettingATimer.ignore();
// makeTHeme from dripsy forces double refresh.

const MyLoadingItem = () => {
  return (
    <Sview
      position="absolute"
      alignItems="center"
      justifyContent="center"
      left={0}
      right={0}
      top={0}
      bottom={0}
    >
      <Stext>Hey Sorry we're loading</Stext>
    </Sview>
  );
};

const Root = (props: any) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [loaded, error] = useFonts(props.fonts);
  if (error || !loaded) {
    // return <Sview>{/* <Stext>Error</Stext> */}</Sview>;
    return null;
  }
  if (loaded) {
    const theme = {
      textColor: "#019123",
      fontFamily: "OpenSansBold",
    };

    // TODO: put this in customheaderedcontainer for "noSafeArea"

    const renderImage = () => {
      if (fullScreen) {
        return (
          <Sview
            flex={1}
            height={
              PERCENTS.HEIGHT[100] +
              initialWindowMetrics?.insets.top * 2 +
              initialWindowMetrics?.insets.bottom
            }
            marginTop={
              -(
                initialWindowMetrics?.insets.top * 2 +
                initialWindowMetrics?.insets.bottom
              )
            }
            marginBottom={
              -(
                initialWindowMetrics?.insets.top +
                initialWindowMetrics?.insets.bottom
              )
            }
            width={PERCENTS.WIDTH[100]}
            zIndex={100}
          >
            <SafeAreaView
              style={{
                backgroundColor: "#00000050",
              }}
            />
            <Simage
              width={"100%"}
              height={"100%"}
              source={{
                uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
              }}
              resizeMode={"cover"}
            />
          </Sview>
        );
      }
      return (
        <Sview
          flex={1}
          height={PERCENTS.HEIGHT[100]}
          width={PERCENTS.WIDTH[100]}
        >
          <Simage
            width={"100%"}
            height={"100%"}
            source={{
              uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
            }}
            resizeMode={"cover"}
          />
        </Sview>
      );
    };

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
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
                  <RootLoadingProvider content={MyLoadingItem}>
                    {/* <MainNavigator /> */}
                    {/* {props.children} */}
                    <Sview flex={1}>{renderImage()}</Sview>
                  </RootLoadingProvider>
                </MoleculeProvider>
              </SafeAreaView>
            </SafeAreaProvider>
          </TouchableWithoutFeedback>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
};

export default Root;
