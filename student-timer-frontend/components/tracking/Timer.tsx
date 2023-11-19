import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";

import { View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";

const msToTimeObject = (
  timeInMs: number
): { mins: number; secs: number; ms: number } => {
  const mins = Math.floor(timeInMs / (1000 * 60));
  const secs = Math.floor((timeInMs % (1000 * 60)) / 1000);
  const ms = timeInMs % 1000;
  return { mins, secs, ms };
};

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
  const [currentTime, setCurrentTime] = useState({ mins: 0, secs: 0, ms: 0 });
  const [pauseTime, setPauseTime] = useState({
    mins: 0,
    secs: 0,
    ms: 0,
  });
  const [isPause, setIsPause] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, data: getData(0) });

  const resetCurrentTime = () => {
    if (isStopwatch) {
      setCurrentTime({ mins: 0, secs: 0, ms: 0 });
    } else {
      let totalTime = rounds * roundLen + (rounds - 1) * pauseLen;
      setCurrentTime({
        mins: Math.floor(totalTime / (1000 * 60)),
        secs: Math.floor((totalTime % (1000 * 60)) / 1000),
        ms: totalTime % 1000,
      });
    }
  };

  useEffect(() => {
    let interval: any;
    if (trackingIsActive) {
      interval = setInterval(() => {
        let elapsedTime, currentTimeMs, percent, pauseTime;
        currentTimeMs =
          currentTime.mins * 1000 * 60 +
          currentTime.secs * 1000 +
          currentTime.ms;
        if (isStopwatch) {
          elapsedTime = Date.now() - startTime + currentTimeMs;
          percent = (elapsedTime / (roundLen + pauseLen)) * 100;
        } else {
          elapsedTime = currentTimeMs - (Date.now() - startTime);
          if (elapsedTime <= 0) {
            setCurrentTime({ mins: 0, secs: 0, ms: 0 });
            setPauseTime({ mins: 0, secs: 0, ms: 0 });
            clearInterval(interval);
            return;
          }
          percent =
            100 -
            (elapsedTime / (rounds * roundLen + (rounds - 1) * pauseLen)) * 100;
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
        setCurrentTime(msToTimeObject(elapsedTime));
        setPauseTime(msToTimeObject(pauseTime));
        setProgress({ percent, data: getData(percent) });
      }, 10);
    } else if (startTime === 0) {
      resetCurrentTime();
      setPauseTime({ mins: 0, secs: 0, ms: 0 });
      setIsPause(false);
      setProgress({ percent: 0, data: getData(0) });
    }
    return () => clearInterval(interval);
  }, [trackingIsActive, startTime]);

  useEffect(
    () => resetCurrentTime(),
    [isStopwatch, rounds, roundLen, pauseLen]
  );

  return (
    <View style={styles.container}>
      <Svg viewBox="50 50 300 300" width={300} height={300}>
        <VictoryPie
          width={400}
          height={400}
          standalone={false}
          animate={{ duration: 1000 }}
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
          text={formatTime(currentTime)}
          style={styles.timerText}
        />
        {(trackingIsActive || startTime !== 0) && (
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={250}
            text={`Pause ${isPause ? "vorbei " : ""}in ${formatTime(
              pauseTime
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
