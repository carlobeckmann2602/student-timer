import { StyleSheet } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";
import { Title } from "@/components/StyledText";
import { View, Text } from "@/components/Themed";
import Button from "@/components/Button";
import Separator from "@/components/Separator";
import OtherLogins from "@/components/auth/OtherLogins";
import InputField from "@/components/InputField";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { validateEmail, validatePassword } from "@/components/auth/validationMethods"


export default function Login() {

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

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
    let id = toast.show("Login...", { type: "loading" });
    if (validateInput()) {
      const result = await onLogin!(email, password);
      if (result && result.error) {
        setError(result.msg);
      } else {
        toast.update(id, "Login erfolgreich", { type: "success" });
        router.push("/(tabs)/(tracking)");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Title>Student Time Tracker</Title>
      <View style={styles.inputs}>
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="E-Mail"
          label="E-Mail"
          keyboardType="email-address"
          message={emailError}
          messageColor="red"
          style={{ width: "100%" }}
        />
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Passwort"
          label="Passwort"
          keyboardType="default"
          secureTextEntry={true}
          message={passwordError}
          messageColor="red"
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonText}>
          <Button
            text="Log In"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={login}
            style={{ width: 200 }}
          />

          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <Text>
            Sie haben kein Konto?{" "}
            <Link href="/signup" style={{ textDecorationLine: "underline" }}>
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
    gap: 45,
  },
  inputs: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
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
