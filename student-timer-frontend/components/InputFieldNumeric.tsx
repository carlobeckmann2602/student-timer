/**
 * Custom InputField for numeric input in order to enable user to close number-pad on iOS (which does not provide a close button on its own).
 * See for reference: https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/.
 */
import React from "react";
import {
  TextInputProps,
  InputAccessoryView,
  Button,
  Keyboard,
  View,
  StyleSheet,
  Appearance,
  Platform,
} from "react-native";
import InputField, { InputFieldProps } from "./InputField";
import { COLORTHEME } from "@/constants/Theme";

export default function InputFieldNumeric(
  props: InputFieldProps & TextInputProps
) {
  const inputAccessoryViewID = "uniqueID";
  return (
    <>
      <InputField
        keyboardType="number-pad"
        inputMode="numeric"
        inputAccessoryViewID={inputAccessoryViewID}
        {...props}
      />
      {Platform.OS === "ios" && (
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={
            Appearance.getColorScheme() === "light" ? "#D1D1D6" : "#636366"
          }
        >
          <View style={styles.AccessoryToolbarContainer}>
            <Button
              color={
                Appearance.getColorScheme() === "dark"
                  ? COLORTHEME.light.background
                  : ""
              }
              onPress={() => Keyboard.dismiss()}
              title="Fertig"
            />
          </View>
        </InputAccessoryView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  AccessoryToolbarContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
