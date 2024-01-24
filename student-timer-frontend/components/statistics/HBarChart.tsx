import { VictoryBar, VictoryContainer, VictoryLabel } from "victory-native";
import ChartContainer from "@/components/statistics/ChartContainer";
import { Dimensions } from "react-native";
import { COLORTHEME } from "@/constants/Theme";

export type HBarChartProps = {
  type: string;
  title: string;
  xTotal: number;
  bars: {
    name?: string;
    value: number;
    color?: string;
    unit?: string;
    average?: boolean;
  }[];
};

export default function HBarChart({ title, xTotal, bars }: HBarChartProps) {
  return (
    <ChartContainer title={title}>
      <VictoryContainer
        height={bars.length * 75}
        width={Dimensions.get("window").width - 90}
      >
        <VictoryBar
          horizontal
          animate={{
            duration: 2000,
            onLoad: { duration: 750 },
          }}
          data={bars.slice(0).reverse()}
          y="value"
          x="name"
          labels={({ datum }) => [
            `${Number(datum.value.toFixed(1))}${
              /* datum.average ? " Ø" : "" */ " Ø" //uncomment if more statistics without average values are created
            }`,
            datum.unit,
          ]}
          labelComponent={
            <VictoryLabel
              style={[
                {
                  fontSize: 24,
                  fontFamily: "OpenSans_Regular",
                  fill: ({ datum }) => datum.color || COLORTHEME.light.primary,
                },
                {
                  fontSize: 12,
                  fontFamily: "OpenSans_Regular",
                  fill: ({ datum }) => datum.color || COLORTHEME.light.primary,
                },
              ]}
              dy={5}
              dx={45}
              textAnchor="middle"
            />
          }
          height={bars.length * 75}
          barWidth={30}
          cornerRadius={{ top: 15 }}
          padding={{ right: 160, top: 50, bottom: 30 }}
          maxDomain={{ y: xTotal, x: bars.length }}
          style={{
            data: {
              fill: ({ datum }) => datum.color || COLORTHEME.light.primary,
            },
          }}
        />
        <>
          {bars.map(
            (item, index) =>
              item.name && (
                <VictoryLabel
                  key={index}
                  y={21 + index * 73}
                  text={item.name}
                  style={{ fontSize: 14, fontFamily: "OpenSans_Regular" }}
                />
              )
          )}
        </>
      </VictoryContainer>
    </ChartContainer>
  );
}
