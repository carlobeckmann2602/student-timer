import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "@/components/Button";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { View } from "@/components/Themed";
import { onboardingData } from "@/constants/onboardingItems";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import CardNavigation from "@/components/onboarding/CardNavigation";
import {saveItem} from "@/libs/deviceStorage";
import {useAuth} from "@/context/AuthContext";
import Pressable from "@/components/Pressable";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const [reachedLastItem, setReachedLastItem] = useState(false);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { authState } = useAuth();

  const isSwipeEnabled = () => {
    return Platform.OS === "android" || Platform.OS === "ios";
  };

  const navigateToApp = () =>{
    if (authState?.authenticated) {
      router.push("/(tabs)/(tracking)/");
    } else {
      saveItem("onboarding", JSON.stringify(true));
      router.push("/(auth)/signup");    }
  }

  const onPrevPress = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      if (isSwipeEnabled()) {
        scrollViewRef.current?.scrollTo({
          x: (width - BASE_STYLES.horizontalPadding * 2) * (activeIndex - 1),
          animated: true,
        });
      }
      setReachedLastItem(false);
    }
  };

  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      if (isSwipeEnabled()) {
        scrollViewRef.current?.scrollTo({
          x: (width - BASE_STYLES.horizontalPadding * 2) * (activeIndex + 1),
          animated: true,
        });
      }
    } else {
      navigateToApp();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Onboarding-Cards web und smart */}
      {Platform.OS === "web" ? (
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
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x /
                (width - BASE_STYLES.horizontalPadding * 2)
            );
            setActiveIndex(newIndex);
            if (newIndex === onboardingData.length - 1) {
              setReachedLastItem(true);
            } else {
              setReachedLastItem(false);
            }
          }}
        >
          {onboardingData.map((item, index) => (
            <View
              key={index}
              style={{ width: width - BASE_STYLES.horizontalPadding * 2 }}
            >
              {index === activeIndex && (
                <OnboardingCard onboardingItem={item} />
              )}
            </View>
          ))}
        </ScrollView>
      )}
      <CardNavigation
        cardAmount={onboardingData.length}
        activeIndex={activeIndex}
        reachedLastItem={reachedLastItem}
        onPrevPress={onPrevPress}
        onNextPress={onNextPress}
      />
      {reachedLastItem ? (
        <Button
          text={
            authState?.authenticated
                ? "zum Tracking"
                : "zur Registrierung"
          }
          backgroundColor={COLORTHEME.light.primary}
          textColor="#FFFFFF"
          onPress={navigateToApp}
          style={{ width: 300, marginVertical: 20, height: 50 }}
        />
      ) : (
        <View style={{ marginTop: 10, marginBottom: 30, height: 50 }}>
          <Pressable text={"Überspringen"} accessibilityRole={"link"} onPress={navigateToApp}/>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
});
