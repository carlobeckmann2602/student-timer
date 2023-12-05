import React, { useState, useRef } from "react";
import { View, Text } from "../../components/Themed";
import {onboardingData} from "@/constants/onboardingItems";
import OnboardingCards from "@/components/onboarding/OnboardingCards";
import CardNavigation from "@/components/onboarding/CardNavigation";
import Header from "@/components/Header";
import {Link, router} from "expo-router";
import {StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
//import {ScrollView} from "react-native-gesture-handler";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const navigateToAuthentication = () => {
    router.push("/signup");
  };


  const onPrevPress = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    console.log('clicked to prev!');
    scrollViewRef.current?.scrollTo({ x: width * (activeIndex - 1), animated: true });
  };
  const onNextPress = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      scrollViewRef.current?.scrollTo({ x: width * (activeIndex + 1), animated: true });
    } else {
      navigateToAuthentication();
    }
    console.log('Clicked to next!');
  };

  const onSwipeLeft = () => {
    //onNextPress();
    console.log('Swiped to the left!');
  };

  const onSwipeRight = () => {
    //onPrevPress();
    console.log('Swiped to the right!');
  };


  return (
      <>
      <View>
        <Header title="StudentTimer" />
      </View>
      <ScrollView
          contentContainerStyle={styles.container}
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(newIndex);
          }}
      >

        <OnboardingContainer
            onboardingData={onboardingData}
            activeIndex={activeIndex}
        />
      </ScrollView>
        <CardNavigation
            cardAmount={onboardingData.length}
            activeIndex={activeIndex}
            onPrevPress={onPrevPress}
            onNextPress={onNextPress}
        />
        <Text style={{marginTop: 15}}>
          <Link href="/signup" alt="Überspringen zur Registrierung" style={{ textDecorationLine: "underline"}}>
            Überspringen
          </Link>
        </Text>


      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
});
