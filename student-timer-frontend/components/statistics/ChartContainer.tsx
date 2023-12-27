import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { H3 } from "@/components/StyledText";
import { COLORTHEME } from "@/constants/Theme";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function ChartContainer({ children, title }: Props) {
  return (
    <View style={styles.container}>
      <H3 style={styles.title}>{title}</H3>
      {children}
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
