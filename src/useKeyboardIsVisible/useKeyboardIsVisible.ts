import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

const useKeyboardIsVisible = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // keyboardwillshow or will hide don't do anything on Android. but if you just do position absolute,
  // bottom: 0, Android sits on top of keyboard
  // https://reactnative.dev/docs/keyboard#dismiss

  // IE. do: bottom: Platform.OS === "android" ? 0 : keyboardHeight
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      async (e: KeyboardEvent) => {
        await setKeyboardHeight(e?.endCoordinates?.height || 0);
        await setKeyboardIsVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      async () => {
        await setKeyboardHeight(0);
        await setKeyboardIsVisible(false);
      }
    );
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
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return [keyboardIsVisible, keyboardHeight];
};

export default useKeyboardIsVisible;
