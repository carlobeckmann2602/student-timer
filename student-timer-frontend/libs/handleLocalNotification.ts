import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

type LocalNotification = {
  expoPushToken: string | undefined;
};

export const enableLocalNotification = (): LocalNotification => {
  let expoPushToken;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  registerForPushNotificationsAsync().then((token) => {
    expoPushToken = token || "";
  });

  return { expoPushToken };
};

const registerForPushNotificationsAsync = async () => {
  let token = "";

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFFFFF",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

export const sendPushNotification = async (
  id: string,
  title: string,
  body: string
) => {
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null,
  });
};
