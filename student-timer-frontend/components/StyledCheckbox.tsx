/**
 *
 * Documentation of used Component: https://docs.expo.dev/versions/latest/sdk/checkbox/
 *
 */
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "./Themed";
import { P } from "./StyledText";
import Checkbox, { CheckboxProps } from "expo-checkbox";
import { COLORTHEME } from "@/constants/Theme";
import { useState } from "react";

type CheckboyProps = {
  label?: string;
  value: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<boolean>>;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
};

export default function StyledCheckbox(props: CheckboyProps & CheckboxProps) {
  const { label, value, onValueChange, style, containerStyle } = props;

  const [checked, setChecked] = useState(value);

  return (
    <View style={[styles.checkboxWrapper, containerStyle]}>
      <Checkbox
        {...props}
        style={[styles.checkbox, style]}
        value={checked}
        onValueChange={(event) => {
          onValueChange(event);
          setChecked(event);
        }}
        color={checked ? COLORTHEME.light.primary : undefined}
      />
      {label && <P>{label}</P>}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: "row",
    height: 40,
    flexGrow: 1,
    flexBasis: 50,
    minWidth: 100,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: COLORTHEME.light.primary,
  },
});
