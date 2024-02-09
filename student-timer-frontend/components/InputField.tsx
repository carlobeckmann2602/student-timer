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
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";

export type InputFieldProps = {
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
  showErrorBorder?: boolean;
};

export default function InputField(props: InputFieldProps & TextInputProps) {
  const { label, style, inputUnit, message, messageColor, showErrorBorder } =
    props;
  return (
    <View style={[styles.inputLabelGroup, style]}>
      {label && <Text style={styles.inputLabelText}>{label}</Text>}
      <View
        style={[
          styles.inputUnitContainer,
          { borderColor: showErrorBorder ? "red" : "transparent" },
        ]}
      >
        <View style={[styles.inputContainer]}>
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
    gap: BASE_STYLES.labelGap,
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
    borderRadius: BASE_STYLES.borderRadius,
    height: BASE_STYLES.inputFieldHeight,
    paddingHorizontal: BASE_STYLES.inputFieldHorizontalPadding,
    borderWidth: 1,
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
    marginLeft: BASE_STYLES.inputFieldHorizontalPadding,
  },
  messageText: {
    fontSize: 12,
  },
});
