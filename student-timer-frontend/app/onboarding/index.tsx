// OnboardingScreen.tsx bzw. index.tsx
import React, { useState } from "react";
import { View } from "@/components/Themed";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import {onboardingData} from "../../constants/onboardingItems";
import OnboardingCards from "../../components/onboarding/OnboardingCards";
import CardNavigation from "../../components/onboarding/CardNavigation";
import Header from "../../components/Header";
import {router} from "expo-router";
import {StyleSheet} from "react-native";

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigateToAuthentication = () => {
    router.push("/(auth)/signup");
  };

  const onPrevPress = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      navigateToAuthentication();
    }
  };

  return (
      <View style={styles.container}>
        <View>
          <Header title="StudentTimer" />
        </View>
        <OnboardingCards
            onboardingData={onboardingData}
            activeIndex={activeIndex}
        />
        <CardNavigation
            cardAmount={onboardingData.length}
            activeIndex={activeIndex}
            onPrevPress={onPrevPress}
            onNextPress={onNextPress}
        />
        <Button
            text="Überspringen"
            backgroundColor={COLORTHEME.light.primary}
            textColor="#FFFFFF"
            onPress={navigateToAuthentication}
            style={{ width: 300, marginVertical: 20, height: 50 }}
        />
      </View>
  );
}

//toDo styling für iPhone SE anpassenfpo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
