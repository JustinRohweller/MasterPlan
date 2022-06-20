import {
  getLocalImages,
  ignoreSettingATimer,
} from "@jrohweller/mycomponents.ui.constants";
import Root from "@jrohweller/mycomponents.ui.root";
import { LogBox } from "react-native";
import Navigator from "./Navigator";
import * as Fonts from "./src/assets/fonts";
import * as Images from "./src/assets/images";

// IF THE APP IS RELODING TWICE BEFORE SHOWING CHANGES WHEN IMAGES LINE IS THERE:
// REINSTALL EXPO AND IT SHOULD FIX IT>

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
  const theme = {
    textColor: "#019123",
    fontFamily: "OpenSansBold",
    statusBarLight: "orange",
    statusBarDark: "blue",
  };

  return (
    <Root fonts={Fonts} images={APP_LOCAL_IMAGES} moleculeTheme={theme}>
      <Navigator />
    </Root>
  );
};

export default App;
