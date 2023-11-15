import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

export default function Header(props: { title: string }) {
  const { title } = props;
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
  },
});
