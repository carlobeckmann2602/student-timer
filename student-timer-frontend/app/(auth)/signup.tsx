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
import { useAuth } from "@/context/AuthContext";
import { Title } from "@/components/StyledText";

export default function SignupScreen() {
  const [userName, setUserName] = useState("");
  const [userStudyCourse, setUserStudyCourse] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [studyCourseError, setStudyCourseError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const { onRegister } = useAuth();

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
    if (userEmail.length == 0) {
      setEmailError("E-Mail ist erforderlich");
    } else if (userEmail.length < 6) {
      setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
    } else if (userEmail.indexOf(" ") >= 0) {
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

  const register = async () => {
    if (validateInput()) {
      const result = await onRegister!(
        userName,
        userStudyCourse,
        "empty",
        userEmail,
        userPassword,
        userCheckPassword
      );
      if (result && result.error) {
        setError(result.msg);
      } else {
        router.push("/(tabs)/(tracking)");
      }
    }
  };

  return (
    <>
      <Header title="Registrieren"></Header>
      <View style={styles.container}>
        <Title>Student Time Tracker</Title>
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
              onChangeText={setUserEmail}
              value={userEmail}
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
              message={passwordError}
              messageColor="red"
            />
            <InputField
              label="Passwort wiederholen"
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 35,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 5,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 16,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
  },
  buttonText: {
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
