import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { StarIcon } from "lucide-react-native";
import { router } from "expo-router";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Text, View } from "@/components/Themed";
import { COLORS, COLORTHEME } from "@/constants/Theme";

export default function Success() {
  const [starAmount, setStarAmount] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => setStarAmount(index + 1)}
            style={styles.star}
          >
            <StarIcon
              name="star"
              color={COLORTHEME.light.primary}
              fill={index < starAmount ? COLORTHEME.light.primary : "none"}
              size={48}
            />
          </Pressable>
        ))}
      </View>
      <View style={styles.successContainer}>
        <Text style={styles.successText}>Bewerte jetzt deinen Erfolg</Text>
      </View>
      <View style={styles.timeStats}>
        <View style={styles.timeLabelContainer}>
          <Text>Fokuszeit</Text>
          <Text style={styles.timeText}>3:20h</Text>
        </View>
        <View style={styles.timeLabelContainer}>
          <Text>Pause</Text>
          <Text style={styles.timeText}>15 min</Text>
        </View>
      </View>
      <View>
        <Text>Modul</Text>
        <Text>Datenbanksysteme 1</Text>
      </View>
      <View>
        <InputField
          label="Beschreibung"
          value={description}
          onChangeText={setDescription}
          placeholder="..."
          style={styles.input}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Abschließen"
          backgroundColor={COLORTHEME.light.primary}
          textColor="#FFFFFF"
          disabled={starAmount === 0}
          onPress={() => router.push("/(tabs)/(tracking)")}
        />
        <Button
          style={styles.buttonBorder}
          text="Tracking fortsetzen"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.primary}
          onPress={() => router.push("/(tabs)/(tracking)")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
  },
  star: {
    cursor: "pointer",
  },
  successContainer: {
    alignItems: "center",
  },
  successText: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  timeStats: {
    gap: 20,
  },
  timeLabelContainer: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    flexBasis: "auto !important" as any,
  },
  buttons: {
    gap: 10,
  },
  buttonBorder: {
    borderWidth: 3,
    borderColor: COLORTHEME.light.primary,
    backgroundColor: COLORS.white,
  },
});
