import React, { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, TextProps, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import { COLORTHEME } from "@/constants/Theme";

type Props = {
  backgroundColor?: string;
  text: string;
  textColor?: string;
  borderColor?: string;
  onPress?: (val?: any) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: TextProps["style"];
};

export type ButtonProps = Props;

export default function Button(props: ButtonProps) {
  const {
    backgroundColor = COLORTHEME.light.primary,
    text,
    textColor,
    borderColor,
    onPress,
    iconRight,
    iconLeft,
    style,
    disabled,
    textStyle,
  } = props;
  const accessibilityLabel = `${text} Button`;
  return (
    <Pressable
      style={[
        {
          backgroundColor: backgroundColor,
          opacity: disabled ? 0.6 : 1,
        },
        borderColor ? { borderColor: borderColor, borderStyle: "solid", borderWidth: 3 } : null,
        styles.button,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      role="button"
    >
      {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
      <Text style={[{ color: textColor }, styles.buttonText, textStyle]}>{text}</Text>
      {iconRight ? <View style={styles.icon}>{iconRight}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexBasis: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 15,
    gap: 10,
  },
  buttonText: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    justifyContent: "center",
  },
});
