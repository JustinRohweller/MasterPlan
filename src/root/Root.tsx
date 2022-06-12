import {
  getLocalImages,
  ignoreSettingATimer,
  PERCENTS,
} from "@jrohweller/mycomponents.ui.constants";
import {
  MoleculeProvider,
  Simage,
  Sview,
} from "@jrohweller/mycomponents.ui.molecules";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import * as Fonts from "../assets/fonts";
import * as Images from "../assets/images";
import RootStatusBar from "./RootStatusBar";

// Splash screen => loading animation => content (already loaded)

export const APP_LOCAL_IMAGES = getLocalImages(Images);

ignoreSettingATimer.ignore();
// makeTHeme from dripsy forces double refresh.

const Root = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [loaded, error] = useFonts(Fonts);
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
                {/* <MainNavigator /> */}
                <Sview flex={1}>{renderImage()}</Sview>
              </MoleculeProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </TouchableWithoutFeedback>
      </NavigationContainer>
    );
  }
};

export default Root;
