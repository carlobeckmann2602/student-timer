import ChartContainer from "@/components/statistics/ChartContainer";
import StarRating from "@/components/StarRating";
import { View } from "@/components/Themed";
import { P } from "@/components/StyledText";
import { StyleSheet } from "react-native";
import { COLORTHEME } from "@/constants/Theme";

export type StarChartProps = {
  type: string;
  title: string;
  starValues: {
    name: string;
    value: number;
    color: string;
  }[];
};

export default function StarChart({ title, starValues }: StarChartProps) {
  return (
    <ChartContainer title={title}>
      {starValues.map((item) => {
        return (
          <View style={styles.starContainer}>
            <P style={styles.label}>{item.name}</P>
            <StarRating starAmount={item.value} color={item.color} />
          </View>
        );
      })}
    </ChartContainer>
  );
}

const styles = StyleSheet.create({
  starContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 6,
  },
  label: { color: COLORTHEME.light.grey3 },
});
