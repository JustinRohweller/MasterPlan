import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const useKeepSplash = (isLoading: boolean) => {
  const keepSplash = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  const openSplash = async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (isLoading) {
      keepSplash();
    } else {
      openSplash();
    }
  }, [isLoading]);
};

export default useKeepSplash;
