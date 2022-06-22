//Most interactions with the DB or different API or our back-end are in this file.
/* eslint-disable max-len */

import EMAIL_AUTH from "@jrohweller/mycomponents.ui.email-auth-api";
import { AuthRequestConfig, useAuthRequest } from "expo-auth-session";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";

// https://docs.expo.dev/versions/v44.0.0/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/#google

// https://inaguirre.medium.com/react-native-login-with-google-quick-guide-fe351e464752

// steps: go to
// https://console.cloud.google.com/apis/credentials?project=luvbucks-mobile

// make credentials for each of these.
// then you're good!

interface IFirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}

const useGoogleAuth = (
  config: AuthRequestConfig,
  onError: (error: IFirebaseError) => void
) => {
  const [request, response, promptAsync] = useAuthRequest(config, null);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      EMAIL_AUTH.signInWithCredential(credential, onError);
    }
  }, [response]);

  return [request, response, promptAsync];
};

export default useGoogleAuth;
