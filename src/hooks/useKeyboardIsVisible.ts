import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

const useKeyboardIsVisible = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Not using keyboardwillshow or will hide because they don't do anything on Android.
  // https://reactnative.dev/docs/keyboard#dismiss
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      async (e: KeyboardEvent) => {
        await setKeyboardHeight(e?.endCoordinates?.height || 0);
        await setKeyboardIsVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      async () => {
        await setKeyboardHeight(0);
        await setKeyboardIsVisible(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return [keyboardIsVisible, keyboardHeight];
};

export default useKeyboardIsVisible;
