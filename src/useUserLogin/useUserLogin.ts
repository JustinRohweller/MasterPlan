import type { User } from "@firebase/auth";
import EMAIL_AUTH from "@jrohweller/mycomponents.ui.email-auth-api";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const useUserLogin = (
  onLoggedIn: (user: User) => void,
  onNotLoggedIn: () => void
) => {
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
  }, [navigation, onLoggedIn, onNotLoggedIn]);
};

export default useUserLogin;
