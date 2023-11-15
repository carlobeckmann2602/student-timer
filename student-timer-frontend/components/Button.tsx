import React, { ComponentType } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Text } from "./Themed";

export default function Button(props: {
  backgroundColor: string;
  text: string;
  textColor?: string;
  onPress?: (val?: any) => void;
  Icon?: ComponentType;
}) {
  const { backgroundColor, text, textColor, onPress, Icon } = props;
  return (
    <Pressable style={[{ backgroundColor }, styles.button]} onPress={onPress}>
      <Text style={[{ color: textColor }, styles.buttonText]}>{text}</Text>
      {Icon ? <Icon /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 50,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
