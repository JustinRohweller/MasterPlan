//Most interactions with the DB or different API or our back-end are in this file.
/* eslint-disable max-len */

import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthRequestConfig } from "expo-auth-session/providers/google";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import EMAIL_AUTH from "./emailAuthApi";

// https://docs.expo.dev/versions/v44.0.0/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/#google

// https://inaguirre.medium.com/react-native-login-with-google-quick-guide-fe351e464752

// steps: go to
// https://console.cloud.google.com/apis/credentials?project=luvbucks-mobile

// make credentials for each of these.
// then you're good!

const useGoogleAuth = (config: Partial<GoogleAuthRequestConfig>) => {
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      EMAIL_AUTH.signInWithCredential(credential);
    }
  }, [response]);

  return [request, response, promptAsync];
};

export default useGoogleAuth;
