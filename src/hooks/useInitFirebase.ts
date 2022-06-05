import { useEffect, useState } from "react";

let initializeApp = null;
try {
  initializeApp = require("firebase/app").initializeApp;
} catch (error) {
  if (__DEV__) {
    console.info("firebase/app not installed");
  }
}

import { GOOGLE_FIREBASE_CONFIG } from "../../../src/config";

const useInitFirebase = () => {
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
