import React, { useState, useRef } from "react";
import { Link, useRouter } from "expo-router";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import { Text, View } from "../../components/Themed";
import { onboardingData } from "../../constants/onboardingItems";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import OnboardingCard from "../../components/onboarding/OnboardingCard";
import CardNavigation from "../../components/onboarding/CardNavigation";

export default function OnboardingScreen() {

  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView | null>(null);

  const isSwipeEnabled = () => {
    return Platform.OS === 'android' || Platform.OS === 'ios';
  };

  const navigateToAuthentication = () => {
    router.push("/(auth)/signup");
  };

  const onPrevPress = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      if (isSwipeEnabled()) {
        scrollViewRef.current?.scrollTo({ x: width * (activeIndex - 1), animated: true });
      }
    }
  };

  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      if (isSwipeEnabled()) {
        scrollViewRef.current?.scrollTo({ x: width * (activeIndex + 1), animated: true });
      }
    } else {
      navigateToAuthentication();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Header title="StudentTimer" />
      </View>
      {/* Onboarding-Cards web und smart */}
      {Platform.OS === 'web' ? (
        <OnboardingContainer
          onboardingData={onboardingData}
          activeIndex={activeIndex}
        />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={isSwipeEnabled()}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            if (isSwipeEnabled()) {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveIndex(newIndex);
            }
          }}
        >
          {onboardingData.map((item, index) => (
            <View key={index} style={{ width }}>
              {index === activeIndex && <OnboardingCard onboardingItem={item} />}
            </View>
          ))}
        </ScrollView>
      )}
      <CardNavigation
        cardAmount={onboardingData.length}
        activeIndex={activeIndex}
        onPrevPress={onPrevPress}
        onNextPress={onNextPress}
      />
      <Text style={{ marginTop: 15, marginBottom: 15 }}>
        <Link href="/signup" style={{ textDecorationLine: "underline" }}>
          Überspringen
        </Link>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white" //toDo ScrollView in Themed.tsx reparieren und stattdessen importieren
  },
});
