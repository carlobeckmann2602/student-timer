import React from "react";
import { Text, View } from "../Themed";
import { Svg } from "react-native-svg";
import { VictoryBar, VictoryContainer, VictoryLabel } from "victory-native";
import { StyleSheet } from "react-native";
import { COLORTHEME, COLORS } from "@/constants/Theme";
import { H2, H3, H4, LabelS } from "../StyledText";

type Props = {
  title: string;
  xTotal: number;
  bars: {
    name?: string;
    value: number;
    color: string;
    unit?: string;
    average?: boolean;
  }[];
};

export default function HBar({ title, xTotal, bars }: Props) {
  return (
    <View style={styles.container}>
      <H3 style={styles.title}>{title}</H3>
      <VictoryContainer height={bars.length * 75} width={300}>
        <VictoryBar
          horizontal
          animate={{
            duration: 2000,
            onLoad: { duration: 500 },
          }}
          data={bars.slice(0).reverse()}
          y="value"
          x="name"
          labels={({ datum }) => [
            datum.value + (datum.average && " Ø"),
            datum.unit,
          ]}
          labelComponent={
            <VictoryLabel
              style={[
                { fontSize: 24, fill: ({ datum }) => datum.color },
                { fontSize: 12, fill: ({ datum }) => datum.color },
              ]}
              dy={5}
              dx={35}
              textAnchor="middle"
            />
          }
          height={bars.length * 75}
          barWidth={30}
          cornerRadius={{ top: 15 }}
          padding={{ right: 160, top: 50, bottom: 30 }}
          maxDomain={{ y: xTotal, x: bars.length }}
          style={{ data: { fill: ({ datum }) => datum.color } }}
        />
        <>
          {bars.map(
            (item, index) =>
              item.name && (
                <VictoryLabel
                  key={index}
                  y={21 + index * 73}
                  text={item.name}
                  style={{ fontSize: 14 }}
                />
              )
          )}
        </>
      </VictoryContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "4%",
    gap: 16,
    minHeight: 280,
  },
  title: {
    textAlign: "left",
  },
});
