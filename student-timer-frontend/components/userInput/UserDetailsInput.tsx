import React from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/InputField";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import Button from "@/components/Button";
import { H3 } from "@/components/StyledText";

export default function UserDetailsInput(props: {
  title: string;
  userName: string;
  setUserName: (value: string) => void;
  nameError: string;
  userStudyCourse: string;
  setUserStudyCourse: (value: string) => void;
  studyCourseError: string;
  userEmail: string;
  setUserEmail: (value: string) => void;
  emailError: string;
  buttonAction: (value: string) => void;
  disabled?: boolean;
  cancelAction: (value: string) => void;
  showErrorBorder?: boolean;
}) {
  const {
    title,
    userName,
    setUserName,
    nameError,
    userStudyCourse,
    setUserStudyCourse,
    studyCourseError,
    userEmail,
    setUserEmail,
    emailError,
    buttonAction,
    disabled,
    cancelAction,
    showErrorBorder,
  } = props;

  return (
    <View style={styles.container}>
      <H3>{title}</H3>
      <View style={styles.outerWrapper}>
        <View style={styles.row}>
          <InputField
            label="Name"
            value={userName}
            onChangeText={setUserName}
            message={nameError}
            showErrorBorder={nameError != ""}
            messageColor="red"
          />
          <InputField
            label="Studienfach"
            onChangeText={setUserStudyCourse}
            value={userStudyCourse}
            message={studyCourseError}
            showErrorBorder={studyCourseError != ""}
            messageColor="red"
          />
        </View>
        <View style={styles.row}>
          <InputField
            label="E-Mail"
            onChangeText={setUserEmail}
            value={userEmail}
            keyboardType="email-address"
            message={emailError}
            showErrorBorder={emailError != ""}
            messageColor="red"
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          text="Speichern"
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
