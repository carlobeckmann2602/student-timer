import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";

import { COLORTHEME } from "@/constants/Theme";

type Props = {
  text?: string;
};

export default function Separator(props: Props) {
  if (props.text) {
    return (
      <View style={styles.container}>
        <View
          style={[{ flexGrow: 1 }, styles.separator]}
          lightColor={COLORTHEME.light.text}
          darkColor={COLORTHEME.dark.text}
        />
        <Text
          lightColor={COLORTHEME.light.text}
          darkColor={COLORTHEME.dark.text}
        >
          {props.text}
        </Text>
        <View
          style={[{ flexGrow: 1 }, styles.separator]}
          lightColor={COLORTHEME.light.text}
          darkColor={COLORTHEME.dark.text}
        />
      </View>
    );
  }
  return (
    <View
      style={[{ width: "80%" }, styles.separator]}
      lightColor={COLORTHEME.light.text}
      darkColor={COLORTHEME.dark.text}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    gap: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
