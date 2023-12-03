import React, { useState } from "react";
import { Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import Picker from "react-native-picker-select";

import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import TrackingModeToggle from "@/components/tracking/TrackingModeToggle";
import Timer from "@/components/tracking/Timer";
import { PauseIcon, PlayIcon } from "lucide-react-native";

export default function Tracking() {
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [rounds, setRounds] = useState("2");
  const [pauseLen, setPauseLen] = useState("20");
  const [roundLen, setRoundLen] = useState("40");
  const [trackingIsActive, setTrackingIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [selectedModule, setSelectedModule] = useState(3);

  const inputsEditable = !trackingIsActive && startTime === 0;
  const toggleTracking = () => {
    trackingIsActive ? "" : setStartTime(Date.now());
    setTrackingIsActive(!trackingIsActive);
  };

  const resetTimer = () => {
    setStartTime(0);
    setTrackingIsActive(false);
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
        rounds={Number(rounds)}
        pauseLen={Number(pauseLen) * 1000 * 60}
        roundLen={Number(roundLen) * 1000 * 60}
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
              inputWeb: styles.picker,
              inputAndroid: { color: COLORTHEME.light.grey3 },
              inputIOS: { color: COLORTHEME.light.grey3 },
            }}
            placeholder={{}}
            items={[
              { label: "Mediengestaltung 1", value: 0 },
              { label: "Mediengestaltung 2", value: 1 },
              { label: "Mediengestaltung 3", value: 2 },
              { label: "Mediengestaltung 4", value: 3 },
              { label: "Mediengestaltung 5", value: 4 },
              { label: "Mediengestaltung 6", value: 5 },
              { label: "Mediengestaltung 7", value: 6 },
              { label: "Mediengestaltung 8", value: 7 },
              { label: "Mediengestaltung 9", value: 8 },
              { label: "Mediengestaltung 10", value: 9 },
            ]}
            onValueChange={(module: number) => setSelectedModule(module)}
            disabled={!inputsEditable}
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
              onPress={resetTimer}
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
              onPress={resetTimer}
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
    color: COLORTHEME.light.grey3,
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
