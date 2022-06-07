import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Alert, AppState } from "react-native";

// https://docs.expo.dev/build/updates/
const checkUpdates = async (setReloading: (reload: boolean) => void) => {
  console.info("Checking for an update...");
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      console.info("An update was found, downloading...");
      await Updates.fetchUpdateAsync();
      setReloading(true);
    } else {
      console.info("No updates were found");
    }
  } catch (e) {
    console.info(
      `Error while trying to check for updates, ${JSON.stringify(e)}`
    );
  }
};

const useAutoUpdate = () => {
  const [showReloadDialog, setShowReloadDialog] = useState(false);

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === "active") {
      checkUpdates(setShowReloadDialog);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    // fresh start check
    checkUpdates(setShowReloadDialog);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (showReloadDialog === true) {
      Alert.alert(
        "New Update Ready",
        "There is a new update available for your app. A refresh is required.",
        [
          {
            text: "Refresh",
            onPress: () => {
              Updates.reloadAsync();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [showReloadDialog]);
};

export default useAutoUpdate;
