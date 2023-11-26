import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";

import { View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";

const msToTimeObject = (
  timeInMs: number
): { hours: number; mins: number; secs: number } => {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const mins = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((timeInMs % (1000 * 60)) / 1000);
  return { hours, mins, secs };
};

const formatTime = ({
  hours,
  mins,
  secs,
}: {
  hours: number;
  mins: number;
  secs: number;
}): string => {
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getData = (percent: number) => [
  { x: 1, y: percent, color: COLORTHEME.light.primary },
  { x: 2, y: 100 - percent, color: COLORTHEME.light.grey3 },
];

export default function Timer(props: {
  isStopwatch: boolean;
  trackingIsActive: boolean;
  startTime: number;
  rounds: number;
  pauseLen: number;
  roundLen: number;
}) {
  const {
    isStopwatch,
    trackingIsActive,
    startTime,
    rounds,
    pauseLen,
    roundLen,
  } = props;
  const [currentTime, setCurrentTime] = useState(0);
  const [displayTime, setDisplayTime] = useState({
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [displayPauseTime, setDisplayPauseTime] = useState({
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [isPause, setIsPause] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, data: getData(0) });

  const resetTime = () => {
    if (isStopwatch) {
      setCurrentTime(0);
      setDisplayTime({ hours: 0, mins: 0, secs: 0 });
    } else {
      let totalTime = rounds * roundLen + (rounds - 1) * pauseLen;
      setCurrentTime(totalTime);
      setDisplayTime(msToTimeObject(totalTime));
    }
  };

  useEffect(() => {
    let interval: any;
    if (trackingIsActive) {
      interval = setInterval(() => {
        let elapsedTime, pauseTime, percent;
        if (isStopwatch) {
          elapsedTime = Date.now() - startTime + currentTime;
          percent = (elapsedTime / (roundLen + pauseLen)) * 100;
        } else {
          elapsedTime = currentTime - (Date.now() - startTime);
          percent =
            100 -
            (elapsedTime / (rounds * roundLen + (rounds - 1) * pauseLen)) * 100;
          if (elapsedTime <= 0) {
            setCurrentTime(0);
            setDisplayTime({ hours: 0, mins: 0, secs: 0 });
            setDisplayPauseTime({ hours: 0, mins: 0, secs: 0 });
            clearInterval(interval);
            return;
          }
        }
        const timeInCurrentRound = elapsedTime % (roundLen + pauseLen);
        setIsPause(timeInCurrentRound > roundLen);
        if (timeInCurrentRound < roundLen) {
          pauseTime = isStopwatch
            ? roundLen - timeInCurrentRound
            : roundLen - (roundLen - timeInCurrentRound);
        } else {
          pauseTime = isStopwatch
            ? roundLen + pauseLen - timeInCurrentRound
            : pauseLen - (pauseLen - (timeInCurrentRound - roundLen));
        }
        setCurrentTime(elapsedTime);
        setDisplayTime(msToTimeObject(elapsedTime));
        setDisplayPauseTime(msToTimeObject(pauseTime));
        setProgress({ percent, data: getData(percent) });
      }, 100);
    } else if (startTime === 0) {
      resetTime();
      setDisplayPauseTime({ hours: 0, mins: 0, secs: 0 });
      setIsPause(false);
      setProgress({ percent: 0, data: getData(0) });
    }
    return () => clearInterval(interval);
  }, [trackingIsActive, startTime]);

  useEffect(() => resetTime(), [isStopwatch, rounds, roundLen, pauseLen]);

  return (
    <View style={styles.container}>
      <Svg viewBox="50 50 300 300" width={300} height={300}>
        <VictoryPie
          width={400}
          height={400}
          standalone={false}
          animate={false}
          innerRadius={120}
          labels={() => null}
          data={progress.data}
          style={{ data: { fill: (entry) => entry.datum.color } }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          text={formatTime(displayTime)}
          style={styles.timerText}
        />
        {(trackingIsActive || startTime !== 0) && (
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={250}
            text={`Pause ${isPause ? "vorbei " : ""}in ${formatTime(
              displayPauseTime
            )}`}
            style={styles.pauseText}
          />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    fontSize: 50,
    fontWeight: "bold",
  },
  pauseText: {
    fontSize: 20,
  },
});
