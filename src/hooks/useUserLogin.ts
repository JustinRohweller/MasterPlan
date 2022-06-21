import type { User } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { EMAIL_AUTH } from "../api/auth/firebase";
import useIsMountedRef from "./useIsMountedRef";

const useUserLogin = (
  onLoggedIn: (user: User) => void,
  onNotLoggedIn: () => void
) => {
  const isMountedRef = useIsMountedRef();
  const navigation = useNavigation();

  useEffect(() => {
    const onEvent = (action: () => void) => {
      if (action) {
        action();
      }
    };

    EMAIL_AUTH.listenForLogin(
      (user: User) => {
        onLoggedIn(user);
      },
      () => onEvent(onNotLoggedIn)
    );
  }, [isMountedRef, navigation, onLoggedIn, onNotLoggedIn]);
};

export default useUserLogin;
