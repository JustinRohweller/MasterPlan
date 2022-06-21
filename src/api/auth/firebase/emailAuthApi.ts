import type { User } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Segment from "expo-analytics-segment";
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

export type VoidFunc = () => void;
export type UserVoidFunc = (user: User) => void;
export type ObjectType = Record<string, any>;

// TODO: would be better to not use callbacks, instead just return an error or not.

const EMAIL_AUTH = {
  onCreateUser: async (values: AuthFormValues) => {
    const { email, password } = values;
    // new account
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        // NO NEED TO DO ANYTHING HERE> EVERY SCREEN SHOULD HAVE
        // LISTEN FOR LOGIN
        // success, navigate in.
      })
      .catch(EMAIL_AUTH.onAuthError);
  },

  // IDEA: all local state where you can, upload on app close?
  // Sign in with credential from the Facebook user.
  signInWithCredential: async (credential: any) => {
    const auth = getAuth();
    await signInWithCredential(auth, credential).catch(EMAIL_AUTH.onAuthError);
  },

  onValidatedEmail: async (onSuccess: VoidFunction) => {
    const auth = getAuth();
    if (auth?.currentUser?.reload) {
      await auth?.currentUser?.reload();
    }

    if (auth?.currentUser?.emailVerified) {
      onSuccess();
    } else {
      Alert.alert("Email not verified.", "Be sure to press the link!");
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
          console.info(JSON.stringify(error));
          onError(error);
        });
    }
  },

  onSendPasswordReset: (values: AuthFormValues, onEmailSent: VoidFunction) => {
    // send password reset email or error.
    const email = values.email.trim();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent.
        Alert.alert(
          "Email Sent",
          `A password reset email has been sent to ${email}`,
          [
            {
              text: "Ok",
              onPress: () => {
                onEmailSent();
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch(EMAIL_AUTH.onAuthError);
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

  onForceSignOut: (navigate: VoidFunction) => {
    const auth = getAuth();
    Alert.alert(
      "Signing You Out",
      "Your session has expired. Please log back in.",
      [
        {
          text: "Ok, Sign Me Out",
          onPress: () => {
            Segment.track("Forced Sign Out");
            signOut(auth).then(() => {
              // eslint-disable-next-line no-undef
              if (__DEV__) {
                // You cannot use the Updates module in development mode in a production app.
                // so we just go back.Slash we are forced to reload.
                navigate();
              } else {
                Updates.reloadAsync();
              }
              // navigate();
            }, EMAIL_AUTH.onAuthError);
          },
        },
      ],
      { cancelable: false }
    );
  },

  onPressSignOut: (navigate: VoidFunction) => {
    const auth = getAuth();
    Alert.alert(
      "Sign Out?",
      "Are you sure you would like to sign out?",
      [
        {
          text: "Yes, Sign Out",
          onPress: () => {
            Segment.track("Logout Modal : Logout Finalized");
            signOut(auth).then(() => {
              // eslint-disable-next-line no-undef
              if (__DEV__) {
                // You cannot use the Updates module in development mode in a production app.
                // so we just go back.Slash we are forced to reload.
                navigate();
              } else {
                Updates.reloadAsync();
              }
              // navigate();
            }, EMAIL_AUTH.onAuthError);
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  },

  reauthenticate: async (currentPassword: string, callback: VoidFunction) => {
    const { currentUser } = getAuth();
    if (currentUser?.email) {
      const cred = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, cred)
        .then(callback)
        .catch(EMAIL_AUTH.onAuthError);
    } else {
      console.info("no user");
    }
  },

  handleMagicLinkUrl: async (url: string) => {
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
        Alert.alert(
          "Error signing you in.",
          "Please try again. We're aware of an issue where if you press the link too rapidly we'll fail here."
        );
        console.info(JSON.stringify(error));
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
          Alert.alert("Error", "Failed to send email.");
          onFailure();
        }
      }
    } catch (error) {
      console.info(error);
      onFailure();
    }
  },

  onSendMagicLink: async (
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

    const FIREBASE_LINK_PROXY =
      "https://us-central1-luvbucks-mobile.cloudfunctions.net/redirectSignupUrl";
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

  // onPressDeleteAccount: (currentPassword, navigation) => {
  //   Alert.alert(
  //     "Delete Account?",
  //     "Danger! Are you sure you would like to delete your account? You will lose all your data.",
  //     [
  //       {
  //         text: "Yes, Delete My Account",
  //         onPress: async () => {
  //           const { currentUser } = firebase.auth();
  //           // first, delete them from db
  //           await EMAIL_AUTH.reauthenticate(currentPassword, async () => {
  //             const batch = FIRESTORE.db.batch();

  //             batch.delete(
  //               FIRESTORE.db.collection("users").doc(currentUser.uid)
  //             );

  //             await batch.commit();

  //             await firebase
  //               .auth()
  //               .currentUser.delete()
  //               .then(async () => {
  //                 // eslint-disable-next-line no-undef
  //                 if (__DEV__) {
  //                   // You cannot use the Updates module in development mode in a production app.
  //                   // so we just go back.
  //                   navigation.navigate("Loading");
  //                 } else {
  //                   Updates.reloadAsync();
  //                 }
  //               }, EMAIL_AUTH.onAuthError);
  //           });
  //         },
  //       },
  //       {
  //         text: "Cancel",
  //         onPress: () => {},
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // },

  onPressUpdateEmail: (
    currentPassword: string,
    newEmail: string,
    onSuccess: VoidFunction
  ) => {
    Alert.alert(
      "Update Email?",
      "Are you sure you would like to update your email? All future logins will need to use this email.",
      [
        {
          text: "Yes, Update My Email",
          onPress: async () => {
            // first, delete them from db
            await EMAIL_AUTH.reauthenticate(currentPassword, async () => {
              // then update their email.
              const { currentUser } = getAuth();

              if (currentUser) {
                updateEmail(currentUser, newEmail)
                  .then(() => {
                    // Update successful.
                    // email updated.
                    onSuccess();
                  })
                  .catch(error => {
                    console.info(JSON.stringify(error));
                    // An error happened.
                  });
              } else {
                console.info("no User onPressUpdateEmail");
              }
            });
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
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

  onPressLogin: async (values: AuthFormValues) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(
      auth,
      values.email.trim(),
      values.password
    ).catch(EMAIL_AUTH.onAuthError);
  },
};

export default EMAIL_AUTH;
