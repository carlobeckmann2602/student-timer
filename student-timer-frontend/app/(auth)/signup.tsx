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

  const router = useRouter();

  const onRegister = () => {
    router.push("/(tabs)");
  };

  return (
    <>
      <Header title="Registrieren"></Header>
      <View style={styles.container}>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <InputField
                label="Name"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <View style={styles.inputLabelGroup}>
              <InputField
                label="Studienfach"
                onChangeText={setUserStudyCourse}
                value={userStudyCourse}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <InputField
                label="E-Mail"
                onChangeText={setUserUniMail}
                value={userUniEmail}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <InputField
                label="Passwort"
                onChangeText={setUserPassword}
                value={userPassword}
                keyboardType="visible-password"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputLabelGroup}>
              <InputField
                label="Passwort wiederholen"
                onChangeText={setUserCheckPassword}
                value={userCheckPassword}
                keyboardType="visible-password"
                secureTextEntry={true}
              />
            </View>
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
});
