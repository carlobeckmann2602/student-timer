import { Dimensions, StyleSheet } from "react-native";

import { ScrollView, Text, View } from "@/components/Themed";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import Separator from "@/components/Separator";
import OtherLogins from "@/components/auth/OtherLogins";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { Title } from "@/components/StyledText";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateStudyCourse,
  comparePasswords,
} from "@/components/auth/validationMethods";
import { toastShow, toastUpdate } from "@/components/Toast";

export default function SignupScreen() {
  const toast = useToast();

  const [userName, setUserName] = useState("");
  const [userStudyCourse, setUserStudyCourse] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [studyCourseError, setStudyCourseError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { onRegister } = useAuth();

  const router = useRouter();

  const validateInput = () => {
    const nameError = validateName(userName);
    setNameError(nameError);
    const nameValid = nameError === "";

    const emailError = validateEmail(userEmail);
    setEmailError(emailError);
    const emailValid = emailError === "";

    let passwordValid = false;
    let passwordError = validatePassword(userPassword);
    if (passwordError === "" && userPassword !== userCheckPassword) {
      passwordError = comparePasswords(userPassword, userCheckPassword);
    }
    setPasswordError(passwordError);
    if (passwordError === "") {
      passwordValid = true;
    }

    return nameValid && emailValid && passwordValid;
  };

  const register = async () => {
    if (validateInput()) {
      let id = toastShow(toast, "Registierung...", { type: "loading" });
      const result = await onRegister!(
        userName,
        userStudyCourse,
        "empty",
        userEmail,
        userPassword,
        userCheckPassword
      );
      if (result && result.error) {
        if ((result.msg = "Email address already taken"))
          toastUpdate(toast, id, "E-Mail bereits vergeben", { type: "danger" });
        else
          toastUpdate(
            toast,
            id,
            "Registrierung fehlgeschlagen. Bitte korrigiere deine Eingaben.",
            {
              type: "danger",
            }
          );
      } else {
        toastUpdate(toast, id, "Registierung erfolgreich", { type: "success" });
        router.push("/(tabs)/modules");
      }
    } else {
      toastShow(toast, "Die Eingaben sind fehlerhaft", { type: "warning" });
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingBottom: BASE_STYLES.verticalPadding }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORTHEME.light.background,
        paddingVertical: BASE_STYLES.verticalPadding,
      }}
    >
      <View style={styles.container}>
        <Title>Student Timer</Title>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <InputField
              label="Name"
              value={userName}
              onChangeText={setUserName}
              showErrorBorder={nameError != ""}
              message={nameError}
              messageColor="red"
            />
            <InputField
              label="Studienfach"
              onChangeText={setUserStudyCourse}
              value={userStudyCourse}
              showErrorBorder={studyCourseError != ""}
              message={studyCourseError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="E-Mail"
              onChangeText={setUserEmail}
              value={userEmail}
              showErrorBorder={emailError != ""}
              keyboardType="email-address"
              message={emailError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="Passwort"
              onChangeText={setUserPassword}
              value={userPassword}
              keyboardType="default"
              secureTextEntry={true}
              showErrorBorder={passwordError != ""}
              message={passwordError}
              messageColor="red"
            />
            <InputField
              label="Passwort wdh."
              onChangeText={setUserCheckPassword}
              value={userCheckPassword}
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonText}>
            <Button
              text="Registrieren"
              backgroundColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey2}
              onPress={register}
            />
            <Text>
              Du hast bereits ein Konto?{" "}
              <Link
                href="/login"
                style={{ textDecorationLine: "underline" }}
                replace
              >
                Anmelden
              </Link>
            </Text>
          </View>
          <Separator text="oder" />
          <OtherLogins />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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
  buttonText: {
    flexDirection: "column",
    alignItems: "center",
    gap: BASE_STYLES.wrapperGap,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
});
