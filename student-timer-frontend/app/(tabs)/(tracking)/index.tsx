import React, { useEffect, useState } from "react";
import { Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Picker, { Item } from "react-native-picker-select";
import { router, useLocalSearchParams } from "expo-router";

import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import TrackingModeToggle from "@/components/tracking/TrackingModeToggle";
import Timer from "@/components/tracking/Timer";
import { PauseIcon, PlayIcon } from "lucide-react-native";
import { useModules } from "@/context/ModuleContext";
import { ModuleType } from "@/types/ModuleType";

export default function Tracking() {
  const { modules, fetchModules } = useModules();
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [rounds, setRounds] = useState("2");
  const [pauseLen, setPauseLen] = useState("20");
  const [roundLen, setRoundLen] = useState("40");
  const [trackingIsActive, setTrackingIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [selectedModule, setSelectedModule] = useState({} as ModuleType);
  const [timerIsDone, setTimerIsDone] = useState(false);
  const { trackingSaved } = useLocalSearchParams<{
    trackingSaved: string;
  }>();
  const inputsEditable = !trackingIsActive && startTime === 0;

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        fetchModules && (await fetchModules());
        if (modules?.length) {
          setSelectedModule(modules[0]);
        }
      })();
    }, [])
  );

  useEffect(() => {
    if (timerIsDone) {
      onTrackingDone();
    }
  }, [timerIsDone]);

  useEffect(() => {
    if (trackingSaved !== undefined) {
      alert(
        trackingSaved === "1"
          ? "Tracking wurde gespeichert"
          : "Fehler beim Speichern des Trackings"
      );
      resetTimer();
      router.push("/(tabs)/(tracking)");
    }
  }, [trackingSaved]);

  const toggleTracking = () => {
    trackingIsActive ? "" : setStartTime(Date.now());
    setTrackingIsActive(!trackingIsActive);
  };

  const resetTimer = () => {
    setStartTime(0);
    setTrackingIsActive(false);
    setTimerIsDone(false);
  };

  const onTrackingDone = () => {
    setTrackingIsActive(false);
    setTimerIsDone(false);
    let focusTime = 0;
    let pauseTime = 0;
    let roundLenMs = Number(roundLen) * 1000 * 60;
    let pauseLenMs = Number(pauseLen) * 1000 * 60;
    let totalTime = Number(rounds) * (roundLenMs + pauseLenMs) - pauseLenMs;
    let elapsedTime = isStopwatch ? currentTime : totalTime - currentTime;
    let currentRound = Math.ceil(elapsedTime / (roundLenMs + pauseLenMs));
    let doneRounds = currentRound - 1;
    if (doneRounds > 0) {
      focusTime += roundLenMs * doneRounds;
      pauseTime += pauseLenMs * doneRounds;
    }
    let timeInCurrentRound = elapsedTime % (roundLenMs + pauseLenMs);
    if (timeInCurrentRound < roundLenMs) {
      focusTime += timeInCurrentRound;
    } else {
      focusTime += roundLenMs;
      pauseTime += timeInCurrentRound - roundLenMs;
    }

    router.push({
      pathname: "/success",
      params: {
        focusTime,
        pauseTime,
        moduleId: selectedModule.id,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <TrackingModeToggle
          onPress={setIsStopwatch}
          disabled={trackingIsActive || startTime !== 0}
        />
      </View>
      <Timer
        isStopwatch={isStopwatch}
        trackingIsActive={trackingIsActive}
        startTime={startTime}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        rounds={Number(rounds)}
        pauseLen={Number(pauseLen) * 1000 * 60}
        roundLen={Number(roundLen) * 1000 * 60}
        setTimerIsDone={setTimerIsDone}
        moduleColor={selectedModule.colorCode}
      />
      <View style={styles.inputs}>
        {!isStopwatch && (
          <InputField
            style={styles.input}
            label="Runden"
            value={rounds}
            onChangeText={setRounds}
            keyboardType="numeric"
            selectTextOnFocus
            editable={inputsEditable}
          />
        )}
        <InputField
          style={styles.input}
          label="Rundenlänge"
          value={roundLen}
          onChangeText={setRoundLen}
          keyboardType="numeric"
          inputUnit="min"
          selectTextOnFocus
          editable={inputsEditable}
        />
        <InputField
          style={styles.input}
          label="Pausenlänge"
          value={pauseLen}
          onChangeText={setPauseLen}
          keyboardType="numeric"
          inputUnit="min"
          selectTextOnFocus
          editable={inputsEditable}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.inputLabelText}>Modul</Text>
        <View>
          <Picker
            style={{
              viewContainer: styles.picker,
              inputWeb: { ...styles.picker, color: selectedModule.colorCode },
              inputAndroid: { color: selectedModule.colorCode },
              inputIOS: { color: selectedModule.colorCode },
            }}
            placeholder={{}}
            items={
              modules?.length
                ? modules.map((module) => {
                    return {
                      label: module.name,
                      value: module.id,
                      color: module.colorCode,
                    } as Item;
                  })
                : []
            }
            onValueChange={(_: number, index: number) =>
              setSelectedModule(modules![index])
            }
            //@ts-ignore
            InputAccessoryView={() => null}
          />
        </View>
      </View>
      <View style={styles.trackerButtons}>
        {trackingIsActive ? (
          <>
            <Button
              text="Pausieren"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              iconRight={<PauseIcon fill="#FFFFFF" color="#FFFFFF" />}
              style={styles.button}
            />
            <Button
              text="Tracking beenden"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={onTrackingDone}
              style={styles.button}
            />
          </>
        ) : startTime === 0 ? (
          <>
            <Button
              text="Tracking starten"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              iconRight={<PlayIcon fill="#FFFFFF" color="#FFFFFF" />}
              style={styles.button}
            />
          </>
        ) : (
          <>
            <Button
              text="Play"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              iconRight={<PlayIcon fill="#FFFFFF" color="#FFFFFF" />}
              style={styles.button}
            />
            <Button
              text="Tracking beenden"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={onTrackingDone}
              style={styles.button}
            />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  input: {
    maxWidth: 100,
  },
  pickerContainer: {
    gap: 5,
  },
  picker: {
    backgroundColor: COLORTHEME.light.grey2,
    border: 0,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
  },
  trackerButtons: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
  },
  button: {
    flexGrow: 1,
  },
});
