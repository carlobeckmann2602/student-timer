import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Alert from "@/components/Alert";
import { Text, View } from "@/components/Themed";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import {
  msToTimeObject,
  timeObjectToMinutes,
  formatTimeLearningSession,
} from "@/libs/timeHelper";
import StarRating from "@/components/StarRating";
import { roundNumber } from "@/libs/generalHelper";
import InputFieldNumeric from "../InputFieldNumeric";

export default function LearningSession(props: { isEdit: boolean }) {
  const { isEdit } = props;
  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules } = useModules();
  const { focusTime, pauseTime, id, learningSessionId } = useLocalSearchParams<{
    focusTime: string;
    pauseTime: string;
    id: string;
    learningSessionId: string;
  }>();
  const module = modules?.find((module) => module.id === Number(id));
  const learningSession = module?.learningSessions.find(
    (session) => session.id === Number(learningSessionId)
  );
  const [starAmount, setStarAmount] = useState(learningSession?.rating || 1);
  const [description, setDescription] = useState(
    learningSession?.description || ""
  );
  const [focusDuration, setFocusDuration] = useState(
    msToTimeObject((learningSession?.focusDuration || 0) * (1000 * 60))
  );
  const [pauseDuration, setPauseDuration] = useState(
    msToTimeObject(
      ((learningSession?.totalDuration || 0) -
        (learningSession?.focusDuration || 0)) *
        (1000 * 60)
    )
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <StarRating
          interactive
          starAmount={starAmount}
          setStarAmount={setStarAmount}
          color={module?.colorCode}
        />
      </View>
      <View style={styles.successContainer}>
        <Text style={styles.successText}>Bewerte jetzt deinen Erfolg</Text>
      </View>
      <View style={styles.timeStats}>
        <View style={styles.timeLabelContainer}>
          <Text>Fokuszeit</Text>
          {isEdit ? (
            <View style={styles.timeEdit}>
              <InputFieldNumeric
                style={styles.input}
                value={focusDuration.hours.toString()}
                onChangeText={(val) => {
                  setFocusDuration((prevState) => ({
                    ...prevState,
                    hours: Math.abs(roundNumber(val, 0)),
                  }));
                }}
                inputUnit="Std."
                selectTextOnFocus
              />
              <InputFieldNumeric
                style={styles.input}
                value={focusDuration.mins.toString()}
                onChangeText={(val) => {
                  let mins = Math.abs(roundNumber(val, 0));
                  setFocusDuration((prevState) => ({
                    ...prevState,
                    mins: mins >= 60 ? 59 : mins,
                  }));
                }}
                inputUnit="min."
                selectTextOnFocus
              />
            </View>
          ) : (
            <Text style={styles.timeText}>
              {formatTimeLearningSession(msToTimeObject(Number(focusTime)))}
            </Text>
          )}
        </View>
        <View style={styles.timeLabelContainer}>
          <Text>Pausenzeit</Text>
          {isEdit ? (
            <View style={styles.timeEdit}>
              <InputFieldNumeric
                style={styles.input}
                value={pauseDuration.hours.toString()}
                onChangeText={(val) => {
                  setPauseDuration((prevState) => ({
                    ...prevState,
                    hours: Math.abs(roundNumber(val, 0)),
                  }));
                }}
                inputUnit="Std."
                selectTextOnFocus
              />
              <InputFieldNumeric
                style={styles.input}
                value={pauseDuration.mins.toString()}
                onChangeText={(val) => {
                  let mins = Math.abs(roundNumber(val, 0));
                  setPauseDuration((prevState) => ({
                    ...prevState,
                    mins: mins >= 60 ? 59 : mins,
                  }));
                }}
                inputUnit="min."
                selectTextOnFocus
              />
            </View>
          ) : (
            <Text style={styles.timeText}>
              {formatTimeLearningSession(msToTimeObject(Number(pauseTime)))}
            </Text>
          )}
        </View>
      </View>
      <View>
        <Text>Modul</Text>
        <Text style={{ color: module?.colorCode }}>{module?.name}</Text>
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
      <View style={styles.actions}>
        {!isEdit && (
          <Text
            style={styles.discardLink}
            onPress={() => {
              Alert(
                "Tracking verwerfen?",
                "Wenn du fortfährst, wird das Tracking gelöscht. Bist du dir sicher?",
                () =>
                  router.push({
                    pathname: "/(tabs)/(tracking)/",
                    params: {
                      discard: 1,
                    },
                  })
              );
            }}
          >
            Verwerfen
          </Text>
        )}
        <Button
          text={isEdit ? "Speichern" : "Abschließen"}
          backgroundColor={module?.colorCode || ""}
          textColor="#FFFFFF"
          onPress={async () => {
            let id = toast.show("Speichern...", { type: "loading" });
            let body = {
              rating: starAmount,
              description: description,
            };
            try {
              if (isEdit) {
                let focusTime = timeObjectToMinutes(focusDuration);
                let pauseTime = timeObjectToMinutes(pauseDuration);
                await authAxios?.put(
                  `/students/${authState?.user.id}/modules/${module?.id}/learningSessions/${learningSession?.id}`,
                  {
                    ...body,
                    totalDuration: focusTime + pauseTime,
                    focusDuration: focusTime,
                  }
                );
              } else {
                await authAxios?.post(
                  `/students/${authState?.user.id}/modules/${module?.id}/learningSessions`,
                  {
                    ...body,
                    totalDuration:
                      Math.floor(Number(focusTime) / (1000 * 60)) +
                      Math.floor(Number(pauseTime) / (1000 * 60)),
                    focusDuration: Math.floor(Number(focusTime) / (1000 * 60)),
                  }
                );
              }
              toast.update(id, "Erfolgreich gespeichert", { type: "success" });
            } catch (e) {
              toast.update(id, `Fehler beim Speichern: ${e}`, {
                type: "danger",
              });
            } finally {
              if (isEdit) {
                router.push(`/(tabs)/modules/${module?.id}/`);
              } else {
                router.push({
                  pathname: "/(tabs)/(tracking)/",
                  params: {
                    trackingSaved: 1,
                  },
                });
              }
            }
          }}
        />
        <Button
          style={[styles.buttonBorder, { borderColor: module?.colorCode }]}
          text={isEdit ? "Abbrechen" : "Tracking fortsetzen"}
          backgroundColor={COLORS.white}
          textColor={module?.colorCode}
          onPress={() => {
            if (isEdit) {
              Alert(
                "Änderungen verwerfen?",
                "Wenn du fortfährst, gehen alle Änderungen ungespeichert verloren. Bist du dir sicher?",
                () => router.push(`/(tabs)/modules/${module?.id}/`)
              );
            } else {
              router.push("/(tabs)/(tracking)");
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: BASE_STYLES.horizontalPadding,
    justifyContent: "space-around",
    backgroundColor: COLORTHEME.light.background,
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
    gap: 10,
  },
  timeEdit: {
    flexDirection: "row",
    gap: 10,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    flexBasis: "auto",
  },
  actions: {
    gap: 10,
  },
  buttonBorder: {
    borderWidth: 3,
  },
  discardLink: {
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
});
