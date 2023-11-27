import { StyleSheet } from "react-native";

import { View } from "./Themed";
import { H1 } from "./StyledText";

export default function Header(props: { title: string }) {
  const { title } = props;
  return (
    <View style={styles.headerContainer}>
      <H1>{title}</H1>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 12,
  },
});
