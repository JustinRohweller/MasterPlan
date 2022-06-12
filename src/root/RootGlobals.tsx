import { LogBox } from "react-native";

if (!__DEV__) {
  console.log = () => {};
  console.info = Sentry.Native.captureMessage;
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
