import React from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface OnboardingItem {
    title: string;
    description: string;
    image: ImageSourcePropType;
}

interface OnboardingCardProps {
    onboardingItem: OnboardingItem;
}

export default function OnboardingCard({ onboardingItem }: OnboardingCardProps) {
    const { title, description, image } = onboardingItem;
    return (
        <View style={styles.onboardingItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Image source={image} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: "100%",
        height: 250, //toDo styling für mobile klein anpassen
        resizeMode: "contain",
    },
})
