import type { User } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
  updateEmail,
} from "firebase/auth";
import { Alert } from "react-native";

export interface IFirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
}

export type UserVoidFunc = (user: User) => void;
export type ObjectType = Record<string, any>;

const EMAIL_AUTH = {
  onCreateUser: async (
    values: AuthFormValues,
    onError: (error: IFirebaseError) => void
  ) => {
    const { email, password } = values;
    // new account
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        // NO NEED TO DO ANYTHING HERE> ONCE ONE SCREEN LISTENS FOR LOGIN IS ENOUGH.
      })
      .catch(onError);
  },

  signInWithCredential: async (
    credential: any,
    onError: (error: IFirebaseError) => void
  ) => {
    const auth = getAuth();
    await signInWithCredential(auth, credential).catch(onError);
  },

  onValidatedEmail: async (onSuccess: VoidFunction, onFail: VoidFunction) => {
    const auth = getAuth();
    if (auth?.currentUser?.reload) {
      await auth?.currentUser?.reload();
    }

    if (auth?.currentUser?.emailVerified) {
      onSuccess();
    } else {
      // "Email not verified.", "Be sure to press the link!"
      onFail();
    }
  },

  // https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
  onSendVerificationEmail: (
    onSuccess: () => void,
    onError: (error: IFirebaseError) => void
  ) => {
    const auth = getAuth();
    const user = auth?.currentUser;
    if (user) {
      sendEmailVerification(auth.currentUser!)
        .then(() => {
          // Email sent.
          //
          onSuccess();
        })
        .catch(error => {
          // An error happened.
          onError(error);
        });
    }
  },

  onSendPasswordReset: (
    values: AuthFormValues,
    onEmailSent: VoidFunction,
    onError: (error: IFirebaseError) => void
  ) => {
    // send password reset email or error.
    const email = values.email.trim();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent.
        onEmailSent();
      })
      .catch(error => {
        // An error happened.
        onError(error);
      });
  },

  listenForLogin: (onUserLoggedIn: any, onUserNotLoggedIn: VoidFunction) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // signed in with email.
        onUserLoggedIn(user);
      } else {
        onUserNotLoggedIn();
      }
    });
    return unsubscribe;
  },

  onPressSignOut: (
    navigate: VoidFunction,
    onError: (error: IFirebaseError) => void
  ) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // eslint-disable-next-line no-undef
      if (__DEV__) {
        // You cannot use the Updates module in development mode in a production app.
        // so we just go back.Slash we are forced to reload.
        navigate();
      } else {
        Updates.reloadAsync();
      }
    }, onError);
  },

  reauthenticate: async (
    currentPassword: string,
    callback: VoidFunction,
    onError: (error: IFirebaseError) => void
  ) => {
    const { currentUser } = getAuth();
    if (currentUser?.email) {
      const cred = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, cred)
        .then(callback)
        .catch(onError);
    } else {
      console.info("no user");
    }
  },

  handleMagicLinkUrl: async (
    url: string,
    onError: (error: IFirebaseError) => void
  ) => {
    const auth = getAuth();
    const isCorrectLink = isSignInWithEmailLink(auth, url);
    if (isCorrectLink) {
      try {
        const email = await AsyncStorage.getItem("signInEmail");
        if (email) {
          const result = await signInWithEmailLink(auth, email, url);

          if (result.user) {
            // "logged in!");
          }
        } else {
          console.info("user had no stored email");
        }
      } catch (error) {
        //   "Error signing you in.",
        //   "Please try again. We're aware of an issue where if you press the link too rapidly we'll fail here."
        onError(error);
      }
    }
  },

  onSendCustomMagicLinkEmail: async (
    email: string,
    onSuccess: VoidFunction,
    onFailure: VoidFunction
  ): Promise<void> => {
    try {
      const expoLink = Linking.createURL("Login");

      try {
        await AsyncStorage.setItem("signInEmail", email);
      } catch (error) {
        // alert the user?
        console.info(JSON.stringify(error));
      }

      const FIREBASE_LINK_PROXY =
        "https://us-central1-luvbucks-mobile.cloudfunctions.net/redirectSignupUrl";
      const proxyUrl = `${FIREBASE_LINK_PROXY}?redirectUrl=${encodeURIComponent(
        expoLink
      )}`;
      const result = await axios({
        url: "https://us-central1-luvbucks-mobile.cloudfunctions.net/sendLoginEmail",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email.trim(),
          url: proxyUrl,
        },
      });

      if (result.data) {
        if (result.data?.title === "Success") {
          onSuccess();
        } else {
          // "Error", "Failed to send email."
          onFailure();
        }
      }
    } catch (error) {
      console.info(error);
      onFailure();
    }
  },

  onSendMagicLink: async (
    proxyLink: string, //"https://us-central1-luvbucks-mobile.cloudfunctions.net/redirectSignupUrl"
    email: string,
    onSuccess: VoidFunction
  ): Promise<void> => {
    // https://forums.expo.dev/t/passwordless-firebase-authentication-without-ejecting/21433
    // The gist: call this to send email,
    // make firebase function to be link proxy
    // store link proxy as something we are happy with,
    // make cloud function
    // likely will need to make function callable to all:
    // eslint-disable-next-line max-len
    // https://stackoverflow.com/questions/47511677/firebase-cloud-function-your-client-does-not-have-permission-to-get-url-200-fr
    // on event we log the user in.(handleMagicLinkUrl)
    const auth = getAuth();
    const expoLink = Linking.createURL("Login");

    const FIREBASE_LINK_PROXY = proxyLink;
    const proxyUrl = `${FIREBASE_LINK_PROXY}?redirectUrl=${encodeURIComponent(
      expoLink
    )}`;
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: proxyUrl,
      // This must be true.
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(async () => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // TODO: store in local storage.
        // window.localStorage.setItem("emailForSignIn", email);
        try {
          await AsyncStorage.setItem("signInEmail", email);
        } catch (error) {
          // alert the user?
          console.info(JSON.stringify(error));
        }

        onSuccess();
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.info(errorCode);
        console.info(errorMessage);
        // ...
      });
  },

  onDeleteAccount: async (
    currentPassword: any,
    beforeDelete: any,
    afterDeleteDev: any,
    onError: (error: IFirebaseError) => void
  ) => {
    const { currentUser } = getAuth();
    if (currentUser) {
      await EMAIL_AUTH.reauthenticate(
        currentPassword,
        async () => {
          if (beforeDelete) {
            beforeDelete();
            // ex.
            // const batch = FIRESTORE.db.batch();
            // batch.delete(FIRESTORE.db.collection("users").doc(currentUser.uid));
            // await batch.commit();
          }

          await currentUser.delete().then(async () => {
            // eslint-disable-next-line no-undef

            if (__DEV__) {
              // You cannot use the Updates module in development mode in a production app.
              // so we just go back.
              if (afterDeleteDev) {
                afterDeleteDev();
              }
            } else {
              Updates.reloadAsync();
            }
          }, onError);
        },
        onError
      );
    }
  },

  onPressUpdateEmail: async (
    currentPassword: string,
    newEmail: string,
    onSuccess: VoidFunction,
    onError: (error: IFirebaseError) => void
  ) => {
    // first, delete them from db
    await EMAIL_AUTH.reauthenticate(
      currentPassword,
      async () => {
        // then update their email.
        const { currentUser } = getAuth();

        if (currentUser) {
          updateEmail(currentUser, newEmail)
            .then(() => {
              // email updated.
              onSuccess();
            })
            .catch(onError);
        } else {
          console.info("no User onPressUpdateEmail");
        }
      },
      onError
    );
  },

  onAuthError: (err: IFirebaseError) => {
    if (err.code) {
      if (err.code === "auth/user-not-found") {
        Alert.alert(
          "Incorrect Email",
          "Your email is incorrect. Please try again."
        );
      } else if (err.code === "auth/wrong-password") {
        Alert.alert(
          "Incorrect Password",
          "Your password is incorrect. Please try again."
        );
      } else if (err.code === "auth/user-disabled") {
        Alert.alert(
          "Account Disabled",
          "Your account has been disabled. Please contact an Administrator if you would like access to your account."
        );
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert(
          "Email Already in Use",
          "There already exists an account with that email. Be sure to login with the same method you signed up with."
        );
      } else if (err.code === "auth/invalid-credential") {
        console.info(err.message);
        console.info(err.code);
        console.info(err);
        Alert.alert(
          "Invalid Credential",
          "The credential you provided is invalid. You may have signed up with a different method."
        );
      } else {
        Alert.alert(
          "We encountered an error",
          `${err.message} Please try again.`
        );
      }
    } else {
      Alert.alert(
        "We encountered an error",
        `${err.message} Please try again.`
      );
    }
  },

  onPressLogin: async (
    values: AuthFormValues,
    onError: (error: IFirebaseError) => void
  ) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(
      auth,
      values.email.trim(),
      values.password
    ).catch(onError);
  },
};

export default EMAIL_AUTH;
