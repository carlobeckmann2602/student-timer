import React, { useState, useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const formatTime = ({
  mins,
  secs,
  ms,
}: {
  mins: number;
  secs: number;
  ms: number;
}): string => {
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}:${ms.toString().padStart(3, "0").slice(0, 2)}`;
};

export default function Timer(props: {
  trackingIsActive: boolean;
  startTime: number;
}) {
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState({ mins: 0, secs: 0, ms: 0 });
  const { trackingIsActive, startTime } = props;

  useEffect(() => {
    let interval: any;
    if (trackingIsActive) {
      interval = setInterval(() => {
        const elapsedTime =
          Date.now() -
          startTime +
          currentTime.mins * 1000 * 60 +
          currentTime.secs * 1000 +
          currentTime.ms;
        const mins = Math.floor(elapsedTime / (1000 * 60));
        const secs = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const ms = elapsedTime % 1000;
        setCurrentTime({ mins, secs, ms });
      }, 10);
    } else if (!trackingIsActive && startTime === 0) {
      setCurrentTime({ mins: 0, secs: 0, ms: 0 });
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [trackingIsActive, startTime]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.clock,
          {
            borderRadius: 250,
            width: width / 2,
            height: width / 2,
            borderColor: trackingIsActive ? Colors.light.primary : "#00000",
          },
        ]}
      >
        <View>
          <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 500,
    maxHeight: 500,
    minWidth: 300,
    minHeight: 300,
  },
  timerText: {
    fontSize: 60,
    fontWeight: "bold",
  },
});
