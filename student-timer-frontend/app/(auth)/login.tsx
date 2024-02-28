import { StyleSheet } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { Title } from "@/components/StyledText";
import { View, Text } from "@/components/Themed";
import Button from "@/components/Button";
import Separator from "@/components/Separator";
import OtherLogins from "@/components/auth/OtherLogins";
import InputField from "@/components/InputField";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import {
  validateEmail,
  validatePassword,
} from "@/components/auth/validationMethods";
import { toastShow, toastUpdate } from "@/components/Toast";

export default function Login() {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { onLogin } = useAuth();

  const router = useRouter();

  const validateInput = () => {
    const emailError = validateEmail(email);
    setEmailError(emailError);
    const emailValid = emailError === "";

    const passwordError = validatePassword(password);
    setPasswordError(passwordError);
    const passwordValid = passwordError === "";

    return emailValid && passwordValid;
  };

  const login = async () => {
    if (validateInput()) {
      let id = toastShow(toast, "Login...", { type: "loading" });
      const result = await onLogin!(email, password);
      if (result && result.error) {
        toastUpdate(
          toast,
          id,
          "Login fehlgeschlagen. Bitte korrigiere Passwort und/oder E-Mail-Adresse.",
          { type: "danger" }
        );
      } else {
        toastUpdate(toast, id, "Login erfolgreich", { type: "success" });
        router.push("/(tabs)/(tracking)");
      }
    } else {
      toastShow(toast, "Die Eingaben sind fehlerhaft", { type: "warning" });
    }
  };

  return (
    <View style={styles.container}>
      <Title>Student Timer</Title>
      <View style={styles.inputs}>
        <View style={styles.row}>
          <InputField
            label="E-Mail"
            onChangeText={setEmail}
            value={email}
            placeholder="E-Mail"
            keyboardType="email-address"
            showErrorBorder={emailError != ""}
            message={emailError}
            messageColor="red"
          />
        </View>
        <View style={styles.row}>
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Passwort"
            label="Passwort"
            keyboardType="default"
            secureTextEntry={true}
            showErrorBorder={passwordError != ""}
            message={passwordError}
            messageColor="red"
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonText}>
          <Button
            text="Log In"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={login}
          />
          <Text>
            Du hast kein Konto?{" "}
            <Link
              href="/signup"
              style={{ textDecorationLine: "underline" }}
              replace
            >
              Account erstellen
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
    justifyContent: "space-evenly",
  },
  inputs: {
    flexDirection: "column",
    alignItems: "center",
    gap: BASE_STYLES.wrapperGap,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: BASE_STYLES.wrapperGap,
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
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
