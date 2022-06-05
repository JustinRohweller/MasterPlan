import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { User } from "@firebase/auth";
import { signOut, getAuth } from "firebase/auth";

import * as Updates from "expo-updates";

import { EMAIL_AUTH } from "../api/auth/firebase";

import useIsMountedRef from "./useIsMountedRef";
import { Alert } from "react-native";

// TODO: ensure all our login stuff is working properly now.
// It appears to be working properly.

const useUserLogin = (
  onLoggedIn: (user: User) => void,
  onNotLoggedIn: () => void
) => {
  const isMountedRef = useIsMountedRef();
  const navigation = useNavigation();

  useEffect(() => {
    // if screen is mounted, listen if they are focused.
    // if screen is focused, listen if user is logged in.
    // if screen is unfocused, stop listening for login.
    // if screen is unmounted, try to remove all listeners.
    // INFO: we had to do this because previously we had just unmountOnBlur: true,
    // which was causing flashing, so fixed that.

    const onEvent = (action: () => void) => {
      // if (isMountedRef.current) {
      if (action) {
        action();
      }
      // }
    };

    // let fbUnsub: () => void;
    // const focusUnsub = navigation.addListener("focus", () => {
    //   fbUnsub = EMAIL_AUTH.listenForLogin(
    //     (user: User) =>
    //       onEvent(() => {
    //         onLoggedIn(user);
    //       }),
    //     () => onEvent(onNotLoggedIn)
    //   );
    // });

    // const blurUnsub = navigation.addListener("blur", () => {
    //   if (fbUnsub) {
    //     fbUnsub();
    //   }
    // });

    // return () => {
    //   if (blurUnsub) {
    //     blurUnsub();
    //   }
    //   if (focusUnsub) {
    //     focusUnsub();
    //   }
    //   if (fbUnsub) {
    //     fbUnsub();
    //   }
    // };

    EMAIL_AUTH.listenForLogin(
      (user: User) => {
        onLoggedIn(user);
        // if (user?.providerData?.length) {
        //   for (let i = 0; i < user?.providerData?.length; i++) {
        //     if (user.providerData[i]?.providerId === "apple.com") {
        //       Alert.alert(
        //         "Had to Log Out",
        //         "Unfortunately you'll need to use a different login method to receive gifts.",
        //         [
        //           {
        //             text: "Ok, Sign Me Out",
        //             onPress: () => {
        //               const auth = getAuth();
        //               signOut(auth).then(() => {
        //                 // eslint-disable-next-line no-undef
        //                 if (__DEV__) {
        //                   // You cannot use the Updates module in development mode in a production app.
        //                   // so we just go back.Slash we are forced to reload.
        //                   // navigate();
        //                 } else {
        //                   Updates.reloadAsync();
        //                 }
        //                 // navigate();
        //               }, EMAIL_AUTH.onAuthError);
        //             },
        //           },
        //         ],
        //         { cancelable: false }
        //       );
        //     }
        //   }
        // }
      },
      () => onEvent(onNotLoggedIn)
    );
  }, [isMountedRef, navigation, onLoggedIn, onNotLoggedIn]);
};

export default useUserLogin;
