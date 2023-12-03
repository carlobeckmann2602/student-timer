import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { H1, H2, H3 } from "@/components/StyledText";
import { View, Text } from "@/components/Themed";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function NewModule() {
  const [userName, setUserName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [creditPoints, setCreditPoints] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [examDateError, setStudyCourseError] = useState("");
  const [creditPointError, setEmailError] = useState("");
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
    if (examDate.length == 0) {
      setStudyCourseError("Studienfach ist erforderlich");
    } else {
      setStudyCourseError("");
      studyCourseValid = true;
    }

    var emailValid = false;
    if (creditPoints.length == 0) {
      setEmailError("E-Mail ist erforderlich");
    } else if (creditPoints.length < 6) {
      setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
    } else if (creditPoints.indexOf(" ") >= 0) {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainerStyle}
    >
      <View style={styles.section}>
        <H3 style={styles.cardHeader}>Moduleigenschaften</H3>
        <View style={styles.outerWrapper}>
          <View style={styles.row}>
            <InputField
              label="Name"
              onChangeText={setCreditPoints}
              value={creditPoints}
              message={creditPointError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="Prüfungsdatum"
              onChangeText={setExamDate}
              value={examDate}
              message={examDateError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="Credit-Points"
              onChangeText={setCreditPoints}
              value={creditPoints}
              keyboardType="number-pad"
              message={creditPointError}
              messageColor="red"
            />
            <InputField
              label="Farbauswahl"
              onChangeText={setExamDate}
              value={examDate}
              message={examDateError}
              messageColor="red"
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <H3 style={styles.cardHeader}>Lerneinheiten</H3>
        <LearningUnitForm />
        <LearningUnitForm />
        <LearningUnitForm />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Fertig"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onRegister}
          style={{ width: 200 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    paddingHorizontal: 12,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  section: {
    width: "100%",
    gap: 12,
    backgroundColor: "transparent",
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
  cardHeader: {
    width: "100%",
    textAlign: "left",
    paddingHorizontal: 8,
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
