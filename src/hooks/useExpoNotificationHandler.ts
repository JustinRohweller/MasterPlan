// import { useEffect, useRef } from "react";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import { Subscription } from "expo-modules-core";
// // import { Notification, NotificationResponse } from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// // https://docs.expo.dev/versions/latest/sdk/notifications/

// interface NotificationHandlerProps {
//   onToken: (token: string | undefined) => void;
//   onNotiPressed: (event: NotificationResponse) => void;
//   onReceivedWhileRunning: (event: Notification) => void;
// }

// const registerForPushNotificationsAsync = async () => {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// };

// const useExpoNotificationHandler = ({
//   onToken,
//   onNotiPressed,
//   onReceivedWhileRunning,
// }: NotificationHandlerProps) => {
//   const notificationListener = useRef<Subscription>();
//   const responseListener = useRef<Subscription>();

//   useEffect(() => {
//     try {
//       registerForPushNotificationsAsync()
//         .then(onToken)
//         .catch((err) => {
//           // if (__DEV__) {
//           // console.info("Error getting token", err);
//           // }
//         });
//     } catch (error) {
//       console.info(error);
//     }

//     // WhileRunning, got a noti.
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener(onReceivedWhileRunning);

//     // Pressed notification (from outside usually)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(onNotiPressed);

//     return () => {
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   return;
// };

// export default useExpoNotificationHandler;
