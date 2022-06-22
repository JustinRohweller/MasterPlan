//Most interactions with the DB or different API or our back-end are in this file.
/* eslint-disable max-len */

// https://medium.com/p/ca331b4de05/responses/show

import EMAIL_AUTH from "@jrohweller/mycomponents.ui.email-auth-api";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { OAuthProvider } from "firebase/auth";

// https://docs.expo.io/versions/latest/sdk/apple-authentication/
//comment all with function headers.

interface IFirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}
// basic steps: add library.
// eas build
// PUT app bundleID in firebase apple services id (com.luvbucks.ios) ect.
// call this when you want to login.
const APPLE_AUTH = {
  signInWithApple: async (onError: (error: IFirebaseError) => void) => {
    try {
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
        nonce: hashedNonce,
      });

      const { identityToken } = appleCredential;
      const provider = new OAuthProvider("apple.com");
      if (identityToken) {
        const credential = provider.credential({
          idToken: identityToken, //this tells typescript that identityToken is not null
          rawNonce: nonce,
        });
        EMAIL_AUTH.signInWithCredential(credential, onError);
      } else {
        // @ts-ignore
        onError("Sign In failed");
      }
      // signed in
    } catch (e) {
      onError(e);
    }
  },
};

export default APPLE_AUTH;
