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
import { useFonts } from "expo-font";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import * as Fonts from "../assets/fonts";
import * as Images from "../assets/images";

// Splash screen => loading animation => content (already loaded)

export const APP_LOCAL_IMAGES = getLocalImages(Images);

ignoreSettingATimer.ignore();
// makeTHeme from dripsy forces double refresh.

const App = () => {
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

    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: "transparent", flex: 1 }}>
          <MoleculeProvider theme={theme}>
            <Sview
              flex={1}
              backgroundColor={"orange"}
              height={
                PERCENTS.HEIGHT[100] +
                initialWindowMetrics?.insets.top +
                initialWindowMetrics?.insets.bottom
              }
              marginTop={
                -(
                  initialWindowMetrics?.insets.top +
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
          </MoleculeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
};

export default App;
