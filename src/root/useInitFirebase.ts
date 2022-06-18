import { useEffect, useState } from "react";

let initializeApp: any = null;
try {
  initializeApp = require("firebase/app").initializeApp;
} catch (error) {
  if (__DEV__) {
    console.info("firebase/app not installed");
  }
}

const useInitFirebase = (GOOGLE_FIREBASE_CONFIG: any) => {
  const [isInitializing, setIsInitializing] = useState(
    initializeApp && GOOGLE_FIREBASE_CONFIG ? true : false
  );
  const initFirebase = async () => {
    if (initializeApp && GOOGLE_FIREBASE_CONFIG) {
      // if (!apps.length) {
      await initializeApp(GOOGLE_FIREBASE_CONFIG);
      await setIsInitializing(false);
      // } else {
      //   await setisInitializing(false);
      // }
    }
  };
  useEffect(() => {
    initFirebase();
  }, []);
  return [isInitializing];
};

export default useInitFirebase;
