/**
 * Documentation of used Component: https://github.com/react-native-datetimepicker/datetimepicker
 */

import React from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type DateTimerPickerProps = {
  value: Date;
  onChangeDate: (event: DateTimePickerEvent, date?: Date) => void;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  message?: string;
  messageColor?: string;
  style?: ViewStyle;
};

export default function DateTimePicker(props: DateTimerPickerProps) {
  const { value, onChangeDate, label, placeholder, secureTextEntry, style } =
    props;
  return (
    <View style={[style, styles.inputLabelGroup]}>
      {label && <Text style={styles.inputLabelText}>{label}</Text>}
      <RNDateTimePicker
        value={value}
        onChange={onChangeDate}
        style={styles.input}
      ></RNDateTimePicker>
      <Text style={[{ color: props.messageColor }, styles.messageText]}>
        {props.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelGroup: {
    gap: 5,
    flexGrow: 1,
    flexBasis: 50,
    flexDirection: "column",
    backgroundColor: "transparent",
    minWidth: 100,
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  input: {
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  messageText: {
    fontSize: 12,
  },
});
