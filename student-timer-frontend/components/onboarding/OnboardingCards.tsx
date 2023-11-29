import React from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface OnboardingItem {
    title: string;
    description: string;
    image: ImageSourcePropType;
}

interface OnboardingCardsProps {
    onboardingData: OnboardingItem[];
    activeIndex: number;
}

export default function OnboardingCards({ onboardingData, activeIndex }: OnboardingCardsProps) {
    const renderOnboardingItem = ({ title, description, image }: OnboardingItem) => {
        return (
            <View style={styles.onboardingItem}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Image source={image} style={styles.image} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {onboardingData.map((item, index) => (
                <View key={index}>{index === activeIndex && renderOnboardingItem(item)}</View>
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
    onboardingItem: {
        flex: 1,
        justifyContent: "center",
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
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
});
