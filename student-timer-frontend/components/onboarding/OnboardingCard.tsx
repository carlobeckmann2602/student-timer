import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { OnboardingItem } from "@/constants/onboardingItems";
import {COLORTHEME} from "@/constants/Theme";
import {black} from "colorette";
import {green} from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type OnboardingCardProps = {
  onboardingItem: OnboardingItem;
};

export default function OnboardingCard({
  onboardingItem,
}: OnboardingCardProps) {
  const { title, description, image } = onboardingItem;
  return (
    <View style={styles.onboardingItem}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingItem: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: COLORTHEME.light.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
    image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    margin: 10,
  },
});
