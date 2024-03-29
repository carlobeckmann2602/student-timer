import { Dimensions, PixelRatio, Platform, StyleSheet } from "react-native";

import { Text, TextProps } from "./Themed";
import { SIZES } from "@/constants/Theme";

const SCREEN_WIDTH: number = Dimensions.get("window").width;

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 380;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

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
    fontFamily: "OpenSans_Bold",
    fontSize: normalize(SIZES.xxxLarge),
    textAlign: "center",
  },
  h1: {
    fontFamily: "OpenSans_SemiBold",
    fontSize: SIZES.xxLarge,
    textAlign: "center",
  },
  h2: {
    fontFamily: "OpenSans_SemiBold",
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
  h3: {
    fontFamily: "OpenSans_Medium",
    fontSize: SIZES.large,
    textAlign: "center",
  },
  h4: {
    fontFamily: "OpenSans_Medium",
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  subhead: {
    fontFamily: "OpenSans_SemiBold",
    fontSize: SIZES.small,
    textAlign: "center",
  },
  p: {
    fontFamily: "OpenSans_Regular",
    fontSize: SIZES.xsmall,
    textAlign: "justify",
  },
  labelS: {
    fontFamily: "OpenSans_Regular",
    fontSize: SIZES.xxsmall,
    textAlign: "center",
  },
});
