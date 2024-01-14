import { Alert as BaseAlert } from "react-native";

export default function Alert(
  title: string,
  message: string,
  onPressPrimaryButton?: () => any
) {
  BaseAlert.alert(
    title,
    message,
    [
      {
        text: "Abbrechen",
        style: "cancel",
      },
      {
        text: "Verwerfen",
        onPress: onPressPrimaryButton,
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
}
