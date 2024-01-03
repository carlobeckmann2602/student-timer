import React from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
  TextInputProps,
  Platform,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";

type InputFieldProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  message?: string;
  messageColor?: string;
  style?: ViewStyle;
  inputUnit?: string;
};

export default function InputField(props: InputFieldProps & TextInputProps) {
  const { label, style, inputUnit, message, messageColor } = props;
  return (
    <View style={[styles.inputLabelGroup, style]}>
      {label && <Text style={styles.inputLabelText}>{label}</Text>}
      <View style={styles.inputUnitContainer}>
        <View style={styles.inputContainer}>
          <TextInput {...props} style={styles.input} />
        </View>
        {inputUnit && <Text style={styles.unit}>{inputUnit}</Text>}
      </View>

      {message && (
        <Text style={[{ color: messageColor }, styles.messageText]}>
          {message}
        </Text>
      )}
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
  inputUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  input: {
    color: COLORTHEME.light.grey3,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
    fontFamily: "OpenSans_Regular",
  },
  unit: {
    color: COLORTHEME.light.grey3,
    marginLeft: 10,
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
