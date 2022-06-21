//Most interactions with the DB or different API or our back-end are in this file.
/* eslint-disable max-len */

import * as Google from "expo-auth-session/providers/google";
import EMAIL_AUTH from "./email";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";

// https://docs.expo.dev/versions/v44.0.0/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/#google

// https://inaguirre.medium.com/react-native-login-with-google-quick-guide-fe351e464752

// steps: go to
// https://console.cloud.google.com/apis/credentials?project=luvbucks-mobile

// make credentials for each of these.
// then you're good!

const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "626076758636-kk4vqlkmcqc3m8sr3ueqttv8nmsrolkb.apps.googleusercontent.com",
    iosClientId:
      "626076758636-787pjdpngghc61iouq5pdd0nkl42b0cg.apps.googleusercontent.com",
    androidClientId:
      "626076758636-6cmpph03sk5v74gbui1u246k7du8v0rd.apps.googleusercontent.com",
    webClientId:
      "626076758636-m1dtka592mqc6gv3us1f9chvdjp4gb8p.apps.googleusercontent.com",
  });

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
