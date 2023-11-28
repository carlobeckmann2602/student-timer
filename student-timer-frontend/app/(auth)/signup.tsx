import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import Separator from "@/components/Separator";
import OtherLogins from "@/components/auth/OtherLogins";

export default function SignupScreen() {
  const [userName, setUserName] = useState("");
  const [userStudyCourse, setUserStudyCourse] = useState("");
  const [userUniEmail, setUserUniMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [studyCourseError, setStudyCourseError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const validateInput = () => {
    var nameValid = false;
    if (userName.length == 0) {
      setNameError("Name ist erforderlich");
    } else {
      setNameError("");
      nameValid = true;
    }

    var studyCourseValid = false;
    if (userStudyCourse.length == 0) {
      setStudyCourseError("Studienfach ist erforderlich");
    } else {
      setStudyCourseError("");
      studyCourseValid = true;
    }

    var emailValid = false;
    if (userUniEmail.length == 0) {
      setEmailError("E-Mail ist erforderlich");
    } else if (userUniEmail.length < 6) {
      setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
    } else if (userUniEmail.indexOf(" ") >= 0) {
      setEmailError("E-Mail kann keine Leerzeichen enthalten");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (userPassword.length == 0) {
      setPasswordError("Passwort ist erforderlich");
    } else if (userPassword.length < 6) {
      setPasswordError("Das Passwort sollte mindestens 6 Zeichen lang sein");
    } else if (userPassword.indexOf(" ") >= 0) {
      setPasswordError("Passwort kann keine Leerzeichen enthalten");
    } else if (userPassword != userCheckPassword) {
      setPasswordError("Passwörter stimmen nicht überein");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      return true;
    }

    return false;
  };

  const onRegister = () => {
    if (validateInput()) {
      router.push("/(tabs)");
    }
  };

  return (
    <>
      <Header title="Registrieren"></Header>
      <View style={styles.container}>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <InputField
              label="Name"
              value={userName}
              onChangeText={setUserName}
              message={nameError}
              messageColor="red"
            />
            <InputField
              label="Studienfach"
              onChangeText={setUserStudyCourse}
              value={userStudyCourse}
              message={studyCourseError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="E-Mail"
              onChangeText={setUserUniMail}
              value={userUniEmail}
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
              keyboardType="visible-password"
              secureTextEntry={true}
              message={passwordError}
              messageColor="red"
            />
            <InputField
              label="Passwort wiederholen"
              onChangeText={setUserCheckPassword}
              value={userCheckPassword}
              keyboardType="visible-password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            text="Registrieren"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={onRegister}
            style={{ width: 200 }}
          />

          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <Text>
            Sie haben bereits ein Konto?{" "}
            <Link href="/login" style={{ textDecorationLine: "underline" }}>
              Anmelden
            </Link>
          </Text>
        </View>
        <Separator text="oder" />
        <OtherLogins />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 16,
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
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
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
