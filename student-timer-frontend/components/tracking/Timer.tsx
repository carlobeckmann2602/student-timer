import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";

import { View } from "@/components/Themed";
import { COLORTHEME, COLORS } from "@/constants/Theme";
import { msToTimeObject, formatTime } from "@/libs/timeHelper";
import { sendPushNotification } from "@/libs/handleLocalNotification";

export default function Timer(props: {
  isStopwatch: boolean;
  trackingIsActive: boolean;
  startTime: number;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  rounds: number;
  pauseLen: number;
  roundLen: number;
  setTimerIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  moduleColor?: string;
}) {
  const {
    isStopwatch,
    trackingIsActive,
    startTime,
    currentTime,
    setCurrentTime,
    rounds,
    pauseLen,
    roundLen,
    setTimerIsDone,
    moduleColor,
  } = props;
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
  const [progress, setProgress] = useState({ data: [{}] });
  const moduleColorRef = useRef(moduleColor);

  useEffect(() => {
    moduleColorRef.current = moduleColor;
    let currentPauseTime = undefined;
    if (isPause) {
      const timeInCurrentRound = currentTime % (roundLen + pauseLen);
      currentPauseTime = isStopwatch
        ? roundLen + pauseLen - timeInCurrentRound
        : pauseLen - (pauseLen - (timeInCurrentRound - roundLen));
    }
    setProgress({ data: getProgressData(currentTime, currentPauseTime) });
  }, [moduleColor]);

  useEffect(() => {
    if (!trackingIsActive) return;
    sendPushNotification(
      "tracking",
      "Tracking",
      `${isPause ? "Gönn dir eine Pause" : "Pause ist vorbei"}`
    );
  }, [isPause]);

  const getProgressData = (curTime: number, curPauseTime?: number) => {
    if (isStopwatch) {
      let percent =
        ((curTime % (roundLen + pauseLen)) / (roundLen + pauseLen)) * 100;
      curPauseTime =
        ((curPauseTime === undefined ? pauseLen : curPauseTime) /
          (roundLen + pauseLen)) *
        100;
      return [
        { y: percent, color: moduleColorRef.current },
        { y: 100 - percent - curPauseTime, color: COLORTHEME.light.grey3 },
        { y: curPauseTime, color: COLORS.progressBarPauseColor },
      ];
    } else {
      let totalTime = rounds * (roundLen + pauseLen) - pauseLen;
      let elapsedTime = totalTime - curTime;
      let currentRound = Math.ceil(elapsedTime / (roundLen + pauseLen)) || 1;
      let percent = 100 - (curTime / totalTime) * 100;
      curPauseTime =
        ((curPauseTime === undefined ? pauseLen : curPauseTime) / totalTime) *
        100;
      let data = [{ y: percent, color: moduleColorRef.current }];
      for (let i = 1; i <= rounds; i++) {
        if (i < currentRound) {
          data.push({ y: 0, color: COLORTHEME.light.grey3 });
          data.push({ y: 0, color: COLORS.progressBarPauseColor });
        } else if (i === currentRound) {
          let timeInCurrentRound = elapsedTime % (roundLen + pauseLen);
          data.push({
            y:
              timeInCurrentRound < roundLen
                ? ((roundLen - timeInCurrentRound) / totalTime) * 100
                : 0,
            color: COLORTHEME.light.grey3,
          });
          if (i !== rounds) {
            data.push({
              y: curPauseTime,
              color: COLORS.progressBarPauseColor,
            });
          }
        } else {
          data.push({
            y: (roundLen / totalTime) * 100,
            color: COLORTHEME.light.grey3,
          });
          if (i !== rounds) {
            data.push({
              y: (pauseLen / totalTime) * 100,
              color: COLORS.progressBarPauseColor,
            });
          }
        }
      }
      return data;
    }
  };

  const resetTimer = () => {
    if (isStopwatch) {
      setCurrentTime(0);
      setDisplayTime({ hours: 0, mins: 0, secs: 0 });
      setProgress({ data: getProgressData(0) });
    } else {
      let totalTime = rounds * roundLen + (rounds - 1) * pauseLen;
      setCurrentTime(totalTime);
      setDisplayTime(msToTimeObject(totalTime));
      setProgress({ data: getProgressData(totalTime) });
    }
    setDisplayPauseTime({ hours: 0, mins: 0, secs: 0 });
    setIsPause(false);
  };

  useEffect(() => {
    let interval: any;
    if (trackingIsActive) {
      interval = setInterval(() => {
        let elapsedTime, pauseTime;
        if (isStopwatch) {
          elapsedTime = Date.now() - startTime + currentTime;
        } else {
          elapsedTime = currentTime - (Date.now() - startTime);
          if (elapsedTime <= 0) {
            setCurrentTime(0);
            setDisplayTime({ hours: 0, mins: 0, secs: 0 });
            setDisplayPauseTime({ hours: 0, mins: 0, secs: 0 });
            setProgress({ data: getProgressData(0) });
            clearInterval(interval);
            setTimerIsDone(true);
            return;
          }
        }
        const timeInCurrentRound = elapsedTime % (roundLen + pauseLen);
        setIsPause(timeInCurrentRound > roundLen);
        let curPauseTime = undefined;
        if (timeInCurrentRound < roundLen) {
          pauseTime = isStopwatch
            ? roundLen - timeInCurrentRound
            : roundLen - (roundLen - timeInCurrentRound);
        } else {
          pauseTime = isStopwatch
            ? roundLen + pauseLen - timeInCurrentRound
            : pauseLen - (pauseLen - (timeInCurrentRound - roundLen));
          curPauseTime = pauseTime;
        }
        setCurrentTime(elapsedTime);
        setDisplayTime(msToTimeObject(elapsedTime));
        setDisplayPauseTime(msToTimeObject(pauseTime));
        setProgress({ data: getProgressData(elapsedTime, curPauseTime) });
      }, 100);
    } else if (startTime === 0) {
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [trackingIsActive, startTime]);

  useEffect(() => resetTimer(), [isStopwatch, rounds, roundLen, pauseLen]);

  return (
    <View style={styles.container}>
      <Svg viewBox="50 50 300 300" width={300} height={300}>
        <VictoryPie
          width={400}
          height={400}
          standalone={false}
          animate={
            trackingIsActive || startTime !== 0
              ? false
              : { duration: 1000, easing: "circle" }
          }
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
  timerText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  pauseText: {
    fontSize: 18,
  },
});
