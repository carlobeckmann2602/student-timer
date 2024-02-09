import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { OnboardingItem } from "@/constants/onboardingItems";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";

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
    gap: BASE_STYLES.gap,
  },
  textContainer: {
    alignItems: "center",
    gap: BASE_STYLES.headingGap,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    textAlign: "center",
  },
  imageContainer: {
    borderWidth: BASE_STYLES.iconWidth * 2,
    borderColor: COLORTHEME.light.primary,
    borderRadius: BASE_STYLES.borderRadius * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    margin: BASE_STYLES.padding,
  },
});
