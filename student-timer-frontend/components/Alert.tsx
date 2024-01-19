import { Alert as BaseAlert } from "react-native";

export default function Alert(
    title: string,
    message: string,
    onPressPrimaryButton?: () => any,
    cancelText: string = "Abbrechen",
    confirmText: string = "Verwerfen"
) {
    BaseAlert.alert(
        title,
        message,
        [
            {
                text: cancelText,
                style: "cancel",
            },
            {
                text: confirmText,
                onPress: onPressPrimaryButton,
                style: "destructive",
            },
        ],
        { cancelable: false }
    );
}
