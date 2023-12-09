import { StyleSheet } from "react-native";

import { Text, TextProps } from "./Themed";
import { SIZES } from "@/constants/Theme";

export function Title(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function H1(props: TextProps) {
  return <Text {...props} style={[styles.h1, props.style]} />;
}

export function H2(props: TextProps) {
  return <Text {...props} style={[styles.h2, props.style]} />;
}

export function H3(props: TextProps) {
  return <Text {...props} style={[styles.h3, props.style]} />;
}

export function H4(props: TextProps) {
  return <Text {...props} style={[styles.h4, props.style]} />;
}

export function Subhead(props: TextProps) {
  return <Text {...props} style={[styles.subhead, props.style]} />;
}

export function P(props: TextProps) {
  return <Text {...props} style={[styles.p, props.style]} />;
}

export function LabelS(props: TextProps) {
  return <Text {...props} style={[styles.labelS, props.style]} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xxxLarge,
    fontWeight: "600",
    textAlign: "center",
  },
  h1: {
    fontSize: SIZES.xxLarge,
    fontWeight: "600",
    textAlign: "center",
  },
  h2: {
    fontSize: SIZES.xLarge,
    fontWeight: "600",
    textAlign: "center",
  },
  h3: {
    fontSize: SIZES.large,
    fontWeight: "500",
    textAlign: "center",
  },
  h4: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    textAlign: "center",
  },
  subhead: {
    fontSize: SIZES.small,
    fontWeight: "600",
    textAlign: "center",
  },
  p: {
    fontSize: SIZES.xsmall,
    fontWeight: "normal",
    textAlign: "justify",
  },
  labelS: {
    fontSize: SIZES.xxsmall,
    fontWeight: "normal",
    textAlign: "center",
  },
});
