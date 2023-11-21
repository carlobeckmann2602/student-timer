import React, { ComponentType } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import { LucideIcon } from "lucide-react-native";

export default function Button(props: {
  backgroundColor: string;
  text: string;
  textColor?: string;
  onPress?: (val?: any) => void;
  IconRight?: LucideIcon;
  IconLeft?: LucideIcon;
}) {
  const { backgroundColor, text, textColor, onPress, IconRight, IconLeft } =
    props;
  return (
    <Pressable
      style={[{ backgroundColor: backgroundColor }, styles.button]}
      onPress={onPress}
    >
      {IconLeft ? (
        <View style={styles.icon}>
          <IconLeft />
        </View>
      ) : null}
      <Text style={[{ color: textColor }, styles.buttonText]}>{text}</Text>
      {IconRight ? (
        <View style={styles.icon}>
          <IconRight />
        </View>
      ) : null}
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
    paddingVertical: 15,
  },
});
