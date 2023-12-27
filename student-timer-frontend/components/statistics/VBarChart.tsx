import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
} from "victory-native";
import ChartContainer from "@/components/statistics/ChartContainer";

export type VBarChartProps = {
  type: string;
  title: string;
  yTotal: number;
  bars: {
    name?: string;
    value: number;
    color: string;
  }[];
  avgBars: { value: number; color: string; unit?: string; average?: boolean }[];
};

export default function VBarChart({
  title,
  yTotal,
  bars,
  avgBars,
}: VBarChartProps) {
  return (
    <ChartContainer title={title}>
      <VictoryContainer height={300} width={320}>
        <VictoryChart
          width={320}
          standalone={false}
          padding={{ left: 80, right: 30, bottom: 30, top: 10 }}
        >
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 750 },
            }}
            data={bars}
            y="value"
            x="name"
            barWidth={14}
            cornerRadius={{ top: 7 }}
            domain={{ x: [0, bars.length], y: [0, yTotal] }}
            maxDomain={{ y: yTotal, x: bars.length }}
            style={{ data: { fill: ({ datum }) => datum.color } }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
            }}
          />
        </VictoryChart>
        <VictoryBar
          horizontal
          width={320}
          standalone={false}
          animate={{
            duration: 2000,
            onLoad: { duration: 750 },
          }}
          data={avgBars.map((item) => ({ ...item, y: 20 }))}
          x="value"
          barWidth={8}
          padding={{ left: 20, right: 0, bottom: 30, top: 10 }}
          cornerRadius={{ top: 4, bottom: 4 }}
          domain={{ x: [0, yTotal], y: [0, 20] }}
          style={{ data: { fill: ({ datum }) => datum.color } }}
        />
        <>
          {avgBars.map((item, index) => (
            <VictoryLabel
              key={index}
              text={[
                item.value.toString() + (item.average && " Ø"),
                item.unit ? item.unit : "",
              ]}
              style={[
                { fontSize: 24, fill: item.color },
                { fontSize: 12, fill: item.color },
              ]}
              textAnchor="middle"
              y={310 - (275 / yTotal - 1) * item.value} // 40 - 280 => 240 / 10 = 24
              x={50}
            />
          ))}
        </>
      </VictoryContainer>
    </ChartContainer>
  );
}
