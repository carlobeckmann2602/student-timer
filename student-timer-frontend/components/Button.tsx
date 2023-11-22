import React, { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "./Themed";

export default function Button(props: {
  backgroundColor: string;
  text: string;
  textColor?: string;
  borderColor?: string;
  onPress?: (val?: any) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
}) {
  const {
    backgroundColor,
    text,
    textColor,
    borderColor,
    onPress,
    iconRight,
    iconLeft,
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
    flexGrow: 1,
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
