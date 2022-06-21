/* eslint-disable max-len */
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import OneSignal from "react-native-onesignal";

// INFO: BE DAMN SURE NOT TO STORE .p12 or .provisionin file in git
// ie. make sure that it's stored in .gitignore.
// WHY? because it gets unsigned when it's been pushed/pulled, and then get:
// lowkey don't care about the whole, "they'll steal your key"
// Do care about stuff working.
// ERROR ITMS-90165:
// "Invalid Provisioning Profile Signature.
// The provisioning profile included in the bundle 'com.luvbucks.ios'
// (Payload/LuvBucks.app) cannot be used to submit apps to the iOS App Store until it has a valid signature from Apple.
// (Expired profile signing certificate.) For more information, visit the iOS Developer Portal."

// If you get above error: remake the Ext and Main,
// double click them on Mac to make sure they are uploaded.

// LASTLY: ALWAYS MAKE BUILDS WITH
// EXPO_NO_CAPABILITY_SYNC=1 eas build --profile=production --platform=ios --non-interactive

// SO YEA: make sure you don't store those.

// https://www.ssl.com/how-to/csr-generation-in-macos-keychain-access/
// https://github.com/OneSignal/onesignal-expo-plugin/discussions/63

// warning: The CFBundleVersion of an app extension ('1.0.23') must match that of its containing parent app ('1.0.25').

// https://github.com/OneSignal/onesignal-expo-plugin/discussions/63#discussioncomment-2417333
// STEPS:
// separate flows:

// SECTION 1:
// Onesignal push noti flow: do their extension automator tool: (step 3 within their link)
// https://documentation.onesignal.com/docs/generate-an-ios-push-certificate
// Do this part? Might be handled by their link: Create new certificate (Apple Push Notification service SSL (Sandbox & Production))
// Make signing request, which then helps you to make a App Store Distribution certificate.
// Download that cert and within keystore, click export.
// Should get a .p12, put that in credentials.json in both spots.
// No need to touch this any more.

// SECTION 2:
// Provisioning profile flow
// Make sure com.appname.ios (App Id) has push notifications capability.
// If you ever edit com.appname you need to recreate the provisioning profiles. Will get to that in a sec (below)
// First, make App ID for your app (probably have one already).
// Next make the Onesignalextension one, HAS TO BE NAMED OneSignalNotificationServiceExtension on the end.
// THEN, click back into com.yourappname.ios, and click App groups. then create, has to be named group.name.onesignal.
// Create provisioning profile, that references your distribution cert from SECTION 1, and your Identifier(com.appname.ios).
// Download, stick in app. CLICK ON IT ONCE DOWNLOADED ON MAC, IT DOES SOME KEYCHAIN SHIT I THINK.
// Create provisioning profile, that references your distribution cert from SECTION 1, and your Onesignal Identifier(com.appname.OneSignalNotificationServiceExtension).
// Download, stick in app. CLICK ON IT ONCE DOWNLOADED ON MAC, IT DOES SOME KEYCHAIN SHIT I THINK.
// expo prebuild --clean (I THINK WE HAVE TO DO THIS TO SYNC VERSION NUMBER OF EXTENSION AND APP)
// eas build (DONT INCREMENT VERSION NUMBER HERE WITH AUTO INCREMENT)
// if you get error: Ext doesn't support the App group, stuff is nto typed correctly and/or you need to remake the group.

// GOOD INFO:
// https://github.com/OneSignal/onesignal-expo-plugin/issues/67#issuecomment-1093362334

const useOneSignalNotificationHandler = ({
  onNotiPressed,
  onToken,
  onReceivedWhileRunning,
}: any) => {
  useEffect(() => {
    try {
      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId("6c6bb837-bb37-49ba-83c9-70d24b698458");
      const { currentUser } = getAuth();
      if (currentUser) {
        if (currentUser.uid) {
          OneSignal.sendTag("uid", currentUser.uid);
        }
        if (currentUser.email) {
          OneSignal.setEmail(currentUser.email);
        }
      }
    } catch (error) {
      console.info(error);
    }

    // https://documentation.onesignal.com/docs/react-native-sdk
    // https://documentation.onesignal.com/docs/react-native-sdk-setup#step-5-initialize-the-onesignal-sdk
    OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
      onToken();
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: any) => {
        if (__DEV__) {
          console.info(
            "OneSignal: notification will show in foreground:",
            notificationReceivedEvent
          );
        }
        const notification = notificationReceivedEvent.getNotification();
        if (__DEV__) {
          console.info("notification: ", notification);
        }
        const data = notification.additionalData;
        if (__DEV__) {
          console.info("additionalData: ", data);
        }
        onReceivedWhileRunning(notification);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    OneSignal.setNotificationOpenedHandler(onNotiPressed);
  }, []);

  return;
};

export default useOneSignalNotificationHandler;
