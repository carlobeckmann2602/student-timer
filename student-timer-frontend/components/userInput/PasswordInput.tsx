import React from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/InputField";
import {BASE_STYLES, COLORS, COLORTHEME} from "@/constants/Theme";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
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
              placeholder="neues Passwort"
              keyboardType="default"
              secureTextEntry={true}
              message={passwordError}
              messageColor="red"
            />
            <InputField
              label="Passwort wiederholen"
              onChangeText={setUserCheckPassword}
              placeholder="neues Passwort"
              value={userCheckPassword}
              keyboardType="default"
              secureTextEntry={true}
              message={passwordError}
              messageColor="red"
            />
          </View>
        </View>
        <Button
          text="Passwort ändern"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          style={{ width: 200 }}
          onPress={buttonAction}
          disabled={disabled}
        />
        <Button
            text="Abbrechen"
            backgroundColor={COLORS.white}
            borderColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey3}
            style={{ width: 200 }}
            onPress={cancelAction}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    gap: 10,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: BASE_STYLES.borderRadius,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 5,
    marginVertical: 10,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 16,
  },
  inputLabelGroup: {
    flex: 1,
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  input: {
    flexGrow: 1,
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    borderRadius: BASE_STYLES.borderRadius,
    height: 40,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
});
