import { View } from "@/components/Themed";
import { Dimensions, StyleSheet } from "react-native";
import { H3 } from "@/components/StyledText";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function ChartContainer({ children, title }: Props) {
  return (
    <View style={styles.container}>
      <H3 style={styles.title}>{title}</H3>
      <View style={styles.chart}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORTHEME.light.grey2,
    borderRadius: BASE_STYLES.borderRadius,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: BASE_STYLES.padding,
    gap: BASE_STYLES.gap,
    minHeight: 200,
    width: Dimensions.get("window").width - BASE_STYLES.horizontalPadding * 2,
  },
  title: {
    textAlign: "left",
  },
  chart: {
    alignSelf: "center",
    backgroundColor: "transparent",
    gap: BASE_STYLES.wrapperGap,
  },
});
