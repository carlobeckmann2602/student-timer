/**
 * Documentation of used Component: https://github.com/react-native-datetimepicker/datetimepicker
 */

import React from "react";
import {
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from "react-native";
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
  secureTextEntry?: boolean;
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
    secureTextEntry,
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
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              message={message}
              messageColor={messageColor}
              style={inputStyle}
            ></InputField>
          );
        } else if (Platform.OS === "android") {
          return (
            <TouchableOpacity onPress={showDatepicker}>
              <InputField
                label={label}
                value={value.toLocaleDateString("de-DE")}
                onChangeText={onChangeDateFromText}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                message={message}
                messageColor={messageColor}
                style={{ backgroundColor: "transparent" }}
                editable={false}
                selectTextOnFocus={false}
              ></InputField>
            </TouchableOpacity>
          );
        } else {
          return (
            <View style={styles.innerContainer}>
              {label && <Text style={styles.inputLabelText}>{label}</Text>}
              <RNDateTimePicker
                display="default"
                dateFormat="shortdate"
                value={value}
                locale="de-DE"
                onChange={(event, input) => onChangeDate(input)}
                minimumDate={minimumDate}
                placeholderText={placeholder}
                style={inputStyle}
              ></RNDateTimePicker>
              <Text style={[{ color: props.messageColor }, styles.messageText]}>
                {props.message}
              </Text>
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
    flexBasis: 65,
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
  },
  innerContainer: {
    gap: 5,
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  messageText: {
    fontSize: 12,
  },
});
