import React, { useEffect, useState } from "react";
import { Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { PauseIcon, PlayIcon } from "lucide-react-native";

import { View } from "@/components/Themed";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import TrackingModeToggle from "@/components/tracking/TrackingModeToggle";
import ModulePicker from "@/components/modules/ModulePicker";
import Timer from "@/components/tracking/Timer";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { ModuleType } from "@/types/ModuleType";
import {
  enableLocalNotification,
  sendPushNotification,
} from "@/libs/handleLocalNotification";
import { roundNumber } from "@/libs/generalHelper";

export default function Tracking() {
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [rounds, setRounds] = useState("2");
  const [pauseLen, setPauseLen] = useState("20");
  const [roundLen, setRoundLen] = useState("40");
  const [trackingIsActive, setTrackingIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [selectedModule, setSelectedModule] = useState({} as ModuleType);
  const [timerIsDone, setTimerIsDone] = useState(false);
  const [isFirstFocus, setIsFirstFocus] = useState(true);
  const { trackingSaved, discard } = useLocalSearchParams<{
    trackingSaved: string;
    discard: string;
  }>();
  const inputsEditable = !trackingIsActive && startTime === 0;
  useFocusEffect(
    React.useCallback(() => {
      if (isFirstFocus) {
        enableLocalNotification();
        setIsFirstFocus(false);
      }
    }, [isFirstFocus])
  );

  useEffect(() => {
    if (timerIsDone) {
      sendPushNotification("tracking", "Tracking", "Der Timer ist vorbei");
      onTrackingDone();
    }
  }, [timerIsDone]);

  useEffect(() => {
    if (trackingSaved !== undefined || discard !== undefined) {
      resetTimer();
      router.push("/(tabs)/(tracking)");
    }
  }, [trackingSaved, discard]);

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
        id: selectedModule.id,
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
            onChangeText={(val) => {
              setRounds(Math.abs(roundNumber(val, 1)).toString());
            }}
            keyboardType="numeric"
            selectTextOnFocus
            editable={inputsEditable}
          />
        )}
        <InputField
          style={styles.input}
          label="Rundenlänge"
          value={roundLen}
          onChangeText={(val) => {
            setRoundLen(Math.abs(roundNumber(val, 1)).toString());
          }}
          keyboardType="numeric"
          inputUnit="min"
          selectTextOnFocus
          editable={inputsEditable}
        />
        <InputField
          style={styles.input}
          label="Pausenlänge"
          value={pauseLen}
          onChangeText={(val) => {
            setPauseLen(Math.abs(roundNumber(val, 1)).toString());
          }}
          keyboardType="numeric"
          inputUnit="min"
          selectTextOnFocus
          editable={inputsEditable}
        />
      </View>
      <ModulePicker setSelectedModule={setSelectedModule} />
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
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    maxWidth: 100,
  },
  trackerButtons: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
    marginBottom: BASE_STYLES.horizontalPadding,
  },
  button: {
    flexGrow: 1,
  },
});
