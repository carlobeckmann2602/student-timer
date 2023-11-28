import React, { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "./Themed";

type Props = {
  backgroundColor: string;
  text: string;
  textColor?: string;
  borderColor?: string;
  onPress?: (val?: any) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type ButtonProps = Props;

export default function Button(props: ButtonProps) {
  const {
    backgroundColor,
    text,
    textColor,
    borderColor,
    onPress,
    iconRight,
    iconLeft,
    style,
  } = props;
  return (
    <Pressable
      style={[
        {
          backgroundColor: backgroundColor,
        },
        borderColor
          ? { borderColor: borderColor, borderStyle: "solid", borderWidth: 1 }
          : null,
        styles.button,
        style,
      ]}
      onPress={onPress}
    >
      {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
      <Text style={[{ color: textColor }, styles.buttonText]}>{text}</Text>
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
