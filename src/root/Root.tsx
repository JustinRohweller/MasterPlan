import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as Linking from "expo-linking";
import { createContext, useEffect, useState } from "react";
import { ImageBackground, LogBox, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "sentry-expo";
import { MainNavigator } from "../../src/navigator";
import { EMAIL_AUTH } from "../api/auth/firebase";
import { CustomStatusBar } from "../components";
import { APP_LOCAL_IMAGES, PUBLISHABLE_STRIPE_KEY } from "../constants";
import { useWatchMemory } from "../hooks";
import GlobalLoading from "./GlobalLoading";
import {
  useAutoUpdate,
  useCaching,
  useInitFirebase,
  useKeepSplash,
} from "./hooks";
import { ignoreSettingATimer } from "./ignoreSettingATimer";

Sentry.init({
  dsn: "https://7c5761e94a194e86ab34d06bd1165a44@o1085410.ingest.sentry.io/6133330",
  enableInExpoDevelopment: true,
  // If `true`, Sentry will try to print
  //  out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  debug: false,
});

// TODO: reverse this, see other app.
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

// TODO: when he wants to add the correct images, put useCaching in here.

export const LoadingContext = createContext({
  loading: true,
  updateLoading: (newLoading: boolean) => {},
});

const Root = () => {
  const [initing] = useInitFirebase();
  useCaching();
  // Keep splash while loading X, Y, Z
  useKeepSplash(initing);
  useAutoUpdate();
  useWatchMemory();

  const [loading, setLoading] = useState(true);

  const updateLoading = (newLoading: boolean) => {
    setLoading(newLoading);
  };

  const asyncFunc = async () => {
    // TODO: make hook, do something with result if needed.
    Linking.addEventListener("url", something => {
      if (something.url) {
        EMAIL_AUTH.handleMagicLinkUrl(something.url);
      }
    });

    await Linking.getInitialURL();
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  const renderLoadingOrContent = () => {
    // while this is null, we are showing splash screen with our hook.
    if (initing) {
      return null;
    }
    return (
      <ImageBackground
        source={{ uri: APP_LOCAL_IMAGES.bgRadialPink.uri }}
        style={styles.imageBackground}
      >
        <SafeAreaProvider>
          return (
          <StripeProvider
            publishableKey={PUBLISHABLE_STRIPE_KEY}
            // urlScheme="luvbucks"
            // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
          >
            <View style={styles.container}>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <CustomStatusBar style={"dark"} />
                <LoadingContext.Provider value={{ loading, updateLoading }}>
                  <MainNavigator />
                  <GlobalLoading />
                </LoadingContext.Provider>
              </ApplicationProvider>
            </View>
          </StripeProvider>
          );
        </SafeAreaProvider>
      </ImageBackground>
    );
  };

  return <NavigationContainer>{renderLoadingOrContent()}</NavigationContainer>;
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Root;
