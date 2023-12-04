import { COLORTHEME } from "@/constants/Theme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORTHEME.light.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
