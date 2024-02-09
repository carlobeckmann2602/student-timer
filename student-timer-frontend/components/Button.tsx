import React, { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextProps,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";

type Props = {
  backgroundColor?: string;
  text: string;
  textColor?: string;
  borderColor?: string;
  onPress?: (val?: any) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  centerIcon?: boolean;
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
    centerIcon,
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
          justifyContent: centerIcon ? "center" : "space-between",
        },
        borderColor
          ? { borderColor: borderColor, borderStyle: "solid", borderWidth: 3 }
          : null,
        styles.button,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      role="button"
    >
      {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
      <Text
        style={[
          { color: textColor, flexGrow: centerIcon ? 0 : 1 },
          styles.buttonText,
          textStyle,
        ]}
      >
        {text}
      </Text>
      {iconRight ? <View style={styles.icon}>{iconRight}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexBasis: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BASE_STYLES.buttonRadius,
    height: BASE_STYLES.buttonHeight,
    paddingHorizontal: BASE_STYLES.horizontalPadding,
    gap: BASE_STYLES.headingGap,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    backgroundColor: "transparent",
    justifyContent: "center",
  },
});
