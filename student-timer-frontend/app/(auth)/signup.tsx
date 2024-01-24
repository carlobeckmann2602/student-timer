import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
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
  const [error, setError] = useState("");

  const { onRegister } = useAuth();

  const router = useRouter();

  const validateInput = () => {
    const nameError = validateName(userName);
    setNameError(nameError);
    const nameValid = nameError === "";

    const studyCourseError = validateStudyCourse(userStudyCourse);
    setStudyCourseError(studyCourseError);
    const studyCourseValid = studyCourseError === "";

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

    return nameValid && studyCourseValid && emailValid && passwordValid;
  };

  const register = async () => {
    if (validateInput()) {
      let id = toast.show("Registierung...", { type: "loading" });
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
        toast.update(id, "Registierung erfolgreich", { type: "success" });
        router.push("/(tabs)/modules");
      }
    } else {
      toast.show("Validierung fehlgeschlagen", { type: "warning" });
    }
  };

  return (
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
            style={{ width: 200 }}
          />

          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <Text>
            Du hast bereits ein Konto?{" "}
            <Link href="/login" style={{ textDecorationLine: "underline" }}>
              Anmelden
            </Link>
          </Text>
        </View>
        <Separator text="oder" />
        <OtherLogins />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
    gap: 10,
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
