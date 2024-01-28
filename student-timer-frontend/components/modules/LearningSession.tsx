import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useState } from "react";
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
import { msToTimeObject, timeObjectToMinutes, formatTimeLearningSession } from "@/libs/timeHelper";
import StarRating from "@/components/StarRating";
import InputFieldNumeric from "../InputFieldNumeric";

export default function LearningSession(props: { isEdit: boolean }) {
  const { isEdit } = props;
  const toast = useToast();
  const { fetchModules } = useModules();
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
  const [description, setDescription] = useState(learningSession?.description || "");
  const [focusDuration, setFocusDuration] = useState<{
    hours: number | string;
    mins: number | string;
  }>(msToTimeObject((learningSession?.focusDuration || 0) * (1000 * 60)));
  const [pauseDuration, setPauseDuration] = useState<{
    hours: number | string;
    mins: number | string;
  }>(
    msToTimeObject(
      ((learningSession?.totalDuration || 0) - (learningSession?.focusDuration || 0)) * (1000 * 60)
    )
  );
  const [changesMade, setChangesMade] = useState(false);
  const [validInputs, setValidInputs] = useState({
    focusDuration: {
      hours: true,
      mins: true,
    },
    pauseDuration: {
      hours: true,
      mins: true,
    },
  });

  const validateInput = (
    val: string,
    currentState: {
      hours: number | string;
      mins: number | string;
    },
    setState: React.Dispatch<
      React.SetStateAction<{
        hours: number | string;
        mins: number | string;
      }>
    >,
    key: keyof typeof validInputs,
    isHours: boolean
  ) => {
    let timeKey: "hours" | "mins" = isHours ? "hours" : "mins";
    let reverseTimeKey: "hours" | "mins" = isHours ? "mins" : "hours";
    setState((prevState) => ({
      ...prevState,
      [timeKey]: val,
    }));
    let otherVal = currentState[reverseTimeKey];
    let valid = false;
    let hoursMinsBothNotNull = true;
    let number: number;
    if (val !== "" && !val.includes(".")) {
      number = Number(val);
      hoursMinsBothNotNull =
        number > 0 ||
        isNaN(number) ||
        otherVal === "" ||
        Number(otherVal) > 0 ||
        isNaN(Number(otherVal));
      valid = Math.sign(number) >= 0 && (isHours ? true : number < 60) && hoursMinsBothNotNull;
    }

    setValidInputs((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [timeKey]: valid,
        [reverseTimeKey]:
          valid || otherVal === "" || isNaN(Number(otherVal))
            ? prevState[key][reverseTimeKey]
            : hoursMinsBothNotNull,
      },
    }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <StarRating
          interactive
          starAmount={starAmount}
          setStarAmount={
            isEdit
              ? (starAmount: React.SetStateAction<number>) => {
                  setStarAmount(starAmount);
                  setChangesMade(true);
                }
              : setStarAmount
          }
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
                  validateInput(val, focusDuration, setFocusDuration, "focusDuration", true);
                }}
                inputUnit="Std."
                selectTextOnFocus
                showErrorBorder={!validInputs.focusDuration.hours}
              />
              <InputFieldNumeric
                style={styles.input}
                value={focusDuration.mins.toString()}
                onChangeText={(val) => {
                  validateInput(val, focusDuration, setFocusDuration, "focusDuration", false);
                }}
                inputUnit="min."
                selectTextOnFocus
                showErrorBorder={!validInputs.focusDuration.mins}
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
                  validateInput(val, pauseDuration, setPauseDuration, "pauseDuration", true);
                }}
                inputUnit="Std."
                selectTextOnFocus
                showErrorBorder={!validInputs.pauseDuration.hours}
              />
              <InputFieldNumeric
                style={styles.input}
                value={pauseDuration.mins.toString()}
                onChangeText={(val) => {
                  validateInput(val, pauseDuration, setPauseDuration, "pauseDuration", false);
                }}
                inputUnit="min."
                selectTextOnFocus
                showErrorBorder={!validInputs.pauseDuration.mins}
              />
            </View>
          ) : (
            <Text style={styles.timeText}>
              {formatTimeLearningSession(msToTimeObject(Number(pauseTime)))}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.moduleContainer}>
        <Text style={styles.moduleLabel}>Modul</Text>
        <View style={styles.colorContainer}>
          <View
            style={[styles.colorCircle, { backgroundColor: module?.colorCode || "transparent" }]}
          />
          <Text>{module?.name}</Text>
        </View>
      </View>
      <View>
        <InputField
          label="Beschreibung"
          value={description}
          onChangeText={
            isEdit
              ? (text: string) => {
                  setDescription(text);
                  setChangesMade(true);
                }
              : setDescription
          }
          placeholder="..."
          style={styles.input}
        />
      </View>
      <View style={styles.actions}>
        {!isEdit && (
          <Text
            style={styles.discardLink}
            onPress={() => {
              Alert({
                title: "Tracking verwerfen?",
                message: "Wenn du fortfährst, wird das Tracking gelöscht. Bist du dir sicher?",
                onPressConfirm: () =>
                  router.push({
                    pathname: "/(tabs)/(tracking)/",
                    params: {
                      discard: 1,
                    },
                  }),
              });
            }}
          >
            Verwerfen
          </Text>
        )}
        <Button
          text={isEdit ? "Speichern" : "Abschließen"}
          backgroundColor={module?.colorCode || ""}
          textColor="#FFFFFF"
          disabled={
            isEdit
              ? Object.values(validInputs.focusDuration)
                  .concat(Object.values(validInputs.pauseDuration))
                  .includes(false)
              : false
          }
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
                fetchModules && (await fetchModules());
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
              changesMade
                ? Alert({
                    title: "Änderungen verwerfen?",
                    message:
                      "Wenn du fortfährst, gehen alle Änderungen ungespeichert verloren. Bist du dir sicher?",
                    onPressConfirm: () => router.push(`/(tabs)/modules/${module?.id}/`),
                  })
                : router.push(`/(tabs)/modules/${module?.id}/`);
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
  moduleContainer: {
    gap: 5,
  },
  moduleLabel: {
    color: COLORTHEME.light.primary,
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
    gap: 8,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
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
