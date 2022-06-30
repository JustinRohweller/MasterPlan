import {
  getLocalImages,
  ignoreSettingATimer,
} from "@jrohweller/mycomponents.ui.constants";
import Root from "@jrohweller/mycomponents.ui.root";
import React from "react";
import { LogBox } from "react-native";
// @ts-ignore
import * as Fonts from "../assets/fonts";
// @ts-ignore
import * as Images from "../assets/images";
// @ts-ignore
import Navigator from "../MainNavigator";
import { THEME } from "./dripsyTheme";

// IF THE APP IS RELOADING TWICE BEFORE SHOWING CHANGES WHEN IMAGES LINE IS THERE:
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

const ExRoot = () => {
  const theme = {
    textColor: "#019123",
    fontFamily: "OpenSansBold",
    statusBarLight: "orange",
    statusBarDark: "transparant",
  };

  return (
    <Root
      fonts={Fonts}
      images={APP_LOCAL_IMAGES}
      theme={theme}
      dripsyTheme={THEME}
    >
      <Navigator />
    </Root>
  );
};

export default ExRoot;
