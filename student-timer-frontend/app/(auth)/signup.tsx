import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";

export default function SignupScreen() {
  const [userFirstname, setUserFirstname] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userUniEmail, setUserUniMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const onRegister = () => {};

  return (
    <>
      <Header title="Registrieren"></Header>
      <View style={styles.container}>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <Text style={styles.inputLabelText}>Vorname</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserFirstname}
                value={userFirstname}
              />
            </View>
            <View style={styles.inputLabelGroup}>
              <Text style={styles.inputLabelText}>Nachname</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserSurname}
                value={userSurname}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <Text style={styles.inputLabelText}>E-Mail</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserUniMail}
                value={userUniEmail}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputLabelGroup}>
              <Text style={styles.inputLabelText}>Passwort</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUserPassword}
                value={userPassword}
                keyboardType="visible-password"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputLabelGroup}>
              <Text style={styles.inputLabelText}>Passwort wiederholen</Text>
              <TextInput
                style={styles.input}
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
          />
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 24,
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
    width: 200,
    gap: 15,
  },
});
