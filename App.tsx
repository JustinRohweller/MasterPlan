import {
  getLocalImages,
  ignoreSettingATimer,
  PERCENTS,
} from "@jrohweller/mycomponents.ui.constants";
import { Simage, Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import Root from "@jrohweller/mycomponents.ui.root";
import { LogBox } from "react-native";
import * as Fonts from "./src/assets/fonts";
import * as Images from "./src/assets/images";

// Sentry.init({
//   dsn: "https://7c5761e94a194e86ab34d06bd1165a44@o1085410.ingest.sentry.io/6133330",
//   enableInExpoDevelopment: true,
//   // If `true`, Sentry will try to print
//   //  out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
//   debug: false,
// });

// firebase.initailize(ect.)

if (!__DEV__) {
  console.log = () => {};
  // console.info = Sentry.Native.captureMessage;
}
// it seems we may have to live with it.
// https://github.com/firebase/firebase-js-sdk/issues/1847
console.warn = () => {};

// INFO: this only removes the logbox, not the actual log from console.
LogBox.ignoreLogs([
  "Require cycle:",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
ignoreSettingATimer.ignore();

export const APP_LOCAL_IMAGES = getLocalImages(Images);

const App = () => {
  const renderImage = () => {
    // TODO: put this in customheaderedcontainer for "noSafeArea"
    // if (fullScreen) {
    //   return (
    //     <Sview
    //       flex={1}
    //       height={
    //         PERCENTS.HEIGHT[100] +
    //         initialWindowMetrics?.insets.top * 2 +
    //         initialWindowMetrics?.insets.bottom
    //       }
    //       marginTop={
    //         -(
    //           initialWindowMetrics?.insets.top * 2 +
    //           initialWindowMetrics?.insets.bottom
    //         )
    //       }
    //       marginBottom={
    //         -(
    //           initialWindowMetrics?.insets.top +
    //           initialWindowMetrics?.insets.bottom
    //         )
    //       }
    //       width={PERCENTS.WIDTH[100]}
    //       zIndex={100}
    //     >
    //       <SafeAreaView
    //         style={{
    //           backgroundColor: "#00000050",
    //         }}
    //       />
    //       <Simage
    //         width={"100%"}
    //         height={"100%"}
    //         source={{
    //           uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
    //         }}
    //         resizeMode={"cover"}
    //       />
    //     </Sview>
    //   );
    // }
    return (
      <Sview flex={1} height={PERCENTS.HEIGHT[100]} width={PERCENTS.WIDTH[100]}>
        <Simage
          width={"100%"}
          height={"100%"}
          source={{
            uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
          }}
          resizeMode={"cover"}
        />
        <Stext>Hi there</Stext>
      </Sview>
    );
  };

  const theme = {
    textColor: "#019123",
    fontFamily: "OpenSansBold",
  };

  return (
    <Root fonts={Fonts} images={APP_LOCAL_IMAGES} moleculeTheme={theme}>
      <Sview flex={1}>{renderImage()}</Sview>
    </Root>
  );
};

export default App;
