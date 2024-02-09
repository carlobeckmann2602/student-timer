import React from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/InputField";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import Button from "@/components/Button";
import { H3 } from "@/components/StyledText";

export default function PasswordInput(props: {
  title: string;
  userPassword: string;
  setUserPassword: (value: string) => void;
  userCheckPassword: string;
  setUserCheckPassword: (value: string) => void;
  passwordError: string;
  buttonAction: (value: string) => void;
  disabled?: boolean;
  cancelAction: (value: string) => void;
  showErrorBorder?: boolean;
}) {
  const {
    title,
    userPassword,
    setUserPassword,
    passwordError,
    userCheckPassword,
    setUserCheckPassword,
    buttonAction,
    disabled,
    cancelAction,
  } = props;

  return (
    <>
      <View style={styles.container}>
        <H3>{title}</H3>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <InputField
              label="Passwort"
              onChangeText={setUserPassword}
              value={userPassword}
              placeholder="Neues Passwort"
              keyboardType="default"
              secureTextEntry={true}
              message={passwordError}
              showErrorBorder={passwordError != ""}
              messageColor="red"
            />
            <InputField
              label="Passwort wdh."
              onChangeText={setUserCheckPassword}
              placeholder="Neues Passwort"
              value={userCheckPassword}
              keyboardType="default"
              secureTextEntry={true}
              message={passwordError}
              showErrorBorder={passwordError != ""}
              messageColor="red"
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            text="Passwort ändern"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={buttonAction}
            disabled={disabled}
          />
          <Button
            text="Abbrechen"
            backgroundColor={COLORS.white}
            borderColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey3}
            onPress={cancelAction}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    gap: BASE_STYLES.gap,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: BASE_STYLES.borderRadius,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: BASE_STYLES.padding,
    gap: BASE_STYLES.wrapperGap,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: BASE_STYLES.wrapperGap,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: BASE_STYLES.wrapperGap,
    width: "100%",
  },
});
