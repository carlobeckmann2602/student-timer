import React, { useState } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
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

  const toggleTracking = () => {
    trackingIsActive ? "" : setStartTime(Date.now());
    setTrackingIsActive(!trackingIsActive);
  };

  const resetTimer = () => {
    setStartTime(0);
    setTrackingIsActive(false);
  };

  return (
    <View style={styles.container}>
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
      <KeyboardAvoidingView
        style={styles.inputs}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {!isStopwatch && (
          <View style={styles.inputLabelGroup}>
            <Text style={styles.inputLabelText}>Runden</Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) =>
                val <= "1" ? setRounds("2") : setRounds(val)
              }
              value={rounds}
              keyboardType="numeric"
              selectTextOnFocus
              editable={!trackingIsActive && startTime === 0}
            />
          </View>
        )}
        <View style={styles.inputLabelGroup}>
          <Text style={styles.inputLabelText}>Rundenlänge</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRoundLen}
            value={roundLen}
            keyboardType="numeric"
            selectTextOnFocus
            editable={!trackingIsActive && startTime === 0}
          />
        </View>
        <View style={styles.inputLabelGroup}>
          <Text style={styles.inputLabelText}>Pause</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPauseLen}
            value={pauseLen}
            keyboardType="numeric"
            selectTextOnFocus
            editable={!trackingIsActive && startTime === 0}
          />
        </View>
      </KeyboardAvoidingView>
      <View>
        <Text style={styles.inputLabelText}>Modul</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedModule}
            onValueChange={(module) =>
              setSelectedModule(Number(module.toString()))
            }
            enabled={!trackingIsActive && startTime === 0}
          >
            <Picker.Item label="Datenbanksysteme 1" value={1} />
            <Picker.Item label="Datenbanksysteme 2" value={2} />
            <Picker.Item label="Mediengestaltung 1" value={3} />
            <Picker.Item label="Mediengestaltung 2" value={4} />
          </Picker>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabelGroup: {
    flexDirection: "column",
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  input: {
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    borderRadius: 12,
    width: 100,
    height: 40,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    justifyContent: "center",
    height: 40,
  },
  dropdown: {
    border: 0,
    borderRadius: 12,
    backgroundColor: "inherit",
    height: "100%",
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
