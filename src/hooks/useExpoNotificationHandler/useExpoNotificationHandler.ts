import Constants from "expo-constants";
import { Subscription } from "expo-modules-core";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  Notification,
  NotificationResponse,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// https://docs.expo.dev/versions/latest/sdk/notifications/

interface NotificationHandlerProps {
  onToken: (token: string | undefined) => void;
  onNotiPressed: (event: NotificationResponse) => void;
  onReceivedWhileRunning: (event: Notification) => void;
}

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const useExpoNotificationHandler = ({
  onToken,
  onNotiPressed,
  onReceivedWhileRunning,
}: NotificationHandlerProps) => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    try {
      registerForPushNotificationsAsync()
        .then(onToken)
        .catch(err => {
          // if (__DEV__) {
          // console.info("Error getting token", err);
          // }
        });
    } catch (error) {
      console.info(error);
    }

    // WhileRunning, got a noti.
    notificationListener.current = addNotificationReceivedListener(
      onReceivedWhileRunning
    );

    // Pressed notification (from outside usually)
    responseListener.current =
      addNotificationResponseReceivedListener(onNotiPressed);

    return () => {
      if (notificationListener.current) {
        removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return;
};

export default useExpoNotificationHandler;
