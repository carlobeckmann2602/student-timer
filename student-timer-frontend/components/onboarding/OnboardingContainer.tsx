import React from "react";
import { View, StyleSheet } from "react-native";
import OnboardingCard from "./OnboardingCard";

interface OnboardingContainerProps {
    onboardingData: OnboardingCard[];
    activeIndex: number;
}

export default function OnboardingContainer({ onboardingData, activeIndex }: OnboardingContainerProps){

    return (
        <View style={styles.container}>
            {onboardingData.map((item, index) => (
                <View key={index}>
                    {index === activeIndex && <OnboardingCard onboardingItem={item} />}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
