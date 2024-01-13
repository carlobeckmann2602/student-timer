/**
 *
 * Documentation of used Component: https://github.com/react-native-datetimepicker/datetimepicker
 *
 */
import { StyleSheet, ViewStyle, Platform, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import InputField from "./InputField";

type DateTimerPickerProps = {
  value: Date;
  onChangeDate: (date?: Date) => void;
  label?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  message?: string;
  messageColor?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
};

export default function DateTimePicker(props: DateTimerPickerProps) {
  const {
    value,
    onChangeDate,
    label,
    placeholder,
    minimumDate,
    maximumDate,
    disabled,
    message,
    messageColor,
    inputStyle,
    style,
  } = props;

  const onChangeDateFromText = (inputString: string) => {
    const inputDate = Date.parse(inputString);
    if (inputDate) onChangeDate(new Date(inputDate));
    else console.log(`Failed to parse Date from InputField ${label}`);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: value,
      minimumDate: minimumDate,
      onChange: (event, input) => onChangeDate(input),
      mode: "date",
    });
  };

  return (
    <View style={[styles.inputLabelGroup, style]}>
      {(() => {
        if (Platform.OS === "web") {
          return (
            <InputField
              label={label}
              value={value.toLocaleDateString()}
              onChangeText={onChangeDateFromText}
              placeholder={placeholder}
              message={message}
              messageColor={messageColor}
              style={inputStyle}
            />
          );
        } else if (Platform.OS === "android") {
          return (
            <Pressable
              // style={styles.innerContainer}
              onPress={() => {
                if (!disabled) showDatepicker();
              }}
            >
              <InputField
                label={label}
                value={value.toLocaleDateString("de-DE")}
                onChangeText={onChangeDateFromText}
                placeholder={placeholder}
                message={message}
                messageColor={messageColor}
                editable={false}
                selectTextOnFocus={false}
              />
            </Pressable>
          );
        } else {
          return (
            <View style={styles.innerContainer}>
              {label && <Text style={styles.inputLabelText}>{label}</Text>}
              <View style={styles.RNDateTimerPickerContainer}>
                <RNDateTimePicker
                  display="default"
                  dateFormat="shortdate"
                  value={value}
                  locale="de-DE"
                  onChange={(event, input) => onChangeDate(input)}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  disabled={disabled}
                  placeholderText={placeholder}
                  style={[styles.RNDateTimerPickerStyle, inputStyle]}
                />
              </View>
              {props.message && (
                <Text
                  style={[{ color: props.messageColor }, styles.messageText]}
                >
                  {props.message}
                </Text>
              )}
            </View>
          );
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelGroup: {
    gap: 5,
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
    // minHeight: 50,
  },
  innerContainer: {
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
    flex: 1,
  },
  RNDateTimerPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "transparent",
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  RNDateTimerPickerStyle: {
    marginHorizontal: -20,
  },
  messageText: {
    fontSize: 12,
  },
});
