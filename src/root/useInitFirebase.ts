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
  const [initing, setIniting] = useState(initializeApp ? true : false);
  const initFirebase = async () => {
    if (initializeApp) {
      // if (!apps.length) {
      await initializeApp(GOOGLE_FIREBASE_CONFIG);
      await setIniting(false);
      // } else {
      //   await setIniting(false);
      // }
    }
  };
  useEffect(() => {
    initFirebase();
  }, []);
  return [initing];
};

export default useInitFirebase;
