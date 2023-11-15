import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import Ionicons from "@/components/Ionicons";
import Colors from "@/constants/Colors";
import TrackingModeToggle from "./TrackingModeToggle";
import Timer from "./Timer";

export default function Tracking() {
  const [isStopWatch, setIsStopWatch] = useState(true);
  const [rounds, setRounds] = useState("2");
  const [pauseLen, setPauseLen] = useState("20");
  const [roundLen, setRoundLen] = useState("40");
  const [trackingIsActive, setTrackingIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);

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
        <TrackingModeToggle onPress={setIsStopWatch} />
      </View>
      <Timer trackingIsActive={trackingIsActive} startTime={startTime} />
      <View style={styles.inputs}>
        <View style={styles.inputLabelGroup}>
          <Text style={styles.inputLabelText}>Runden</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRounds}
            value={rounds}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputLabelGroup}>
          <Text style={styles.inputLabelText}>Pause</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPauseLen}
            value={pauseLen}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputLabelGroup}>
          <Text style={styles.inputLabelText}>Rundenlänge</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRoundLen}
            value={roundLen}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View>
        <Text style={styles.inputLabelText}>Modul</Text>
      </View>
      <View style={styles.trackerButtons}>
        {trackingIsActive ? (
          <>
            <Button
              text="Pausieren"
              backgroundColor={Colors.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              Icon={() => (
                <Ionicons name="md-pause" color="white" styles={styles.icon} />
              )}
            />
            <Button
              text="Tracking beenden"
              backgroundColor={Colors.light.primary}
              textColor="#FFFFFF"
              onPress={resetTimer}
            />
          </>
        ) : startTime === 0 ? (
          <>
            <Button
              text="Tracking starten"
              backgroundColor={Colors.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              Icon={() => (
                <Ionicons name="md-play" color="white" styles={styles.icon} />
              )}
            />
          </>
        ) : (
          <>
            <Button
              text="Play"
              backgroundColor={Colors.light.primary}
              textColor="#FFFFFF"
              onPress={toggleTracking}
              Icon={() => (
                <Ionicons name="md-play" color="white" styles={styles.icon} />
              )}
            />
            <Button
              text="Tracking beenden"
              backgroundColor={Colors.light.primary}
              textColor="#FFFFFF"
              onPress={resetTimer}
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
    color: Colors.light.primary,
  },
  input: {
    backgroundColor: Colors.light.grey2,
    color: Colors.light.grey4,
    borderRadius: 12,
    width: 100,
    height: 40,
    paddingHorizontal: 10,
  },
  trackerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});
