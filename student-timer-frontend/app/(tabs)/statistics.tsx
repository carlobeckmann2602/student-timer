import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Separator from "@/components/Separator";

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik</Text>
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
