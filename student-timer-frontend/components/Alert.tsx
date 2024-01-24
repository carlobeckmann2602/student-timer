import { Alert as BaseAlert, AlertButton } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  onPressConfirm?: () => any;
  cancelText?: string;
  cancelStyle?: AlertButton["style"];
  confirmText?: string;
  confirmStyle?: AlertButton["style"];
};
export default function Alert({
  title,
  message,
  onPressConfirm,
  cancelText = "Abbrechen",
  cancelStyle = "cancel",
  confirmText = "Verwerfen",
  confirmStyle = "destructive",
}: AlertProps) {
  BaseAlert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        style: cancelStyle,
      },
      {
        text: confirmText,
        onPress: onPressConfirm,
        style: confirmStyle,
      },
    ],
    { cancelable: false }
  );
}
