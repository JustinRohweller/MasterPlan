import { useEffect } from "react";
import { Linking } from "react-native";

const useLinkingUrl = (onUrl: any) => {
  const asyncFunc = async () => {
    Linking.addEventListener("url", something => {
      if (something.url) {
        // EMAIL_AUTH.handleMagicLinkUrl(something.url);
      }
    });

    await Linking.getInitialURL();
  };

  useEffect(() => {
    asyncFunc();
  }, []);
};

export default useLinkingUrl;
