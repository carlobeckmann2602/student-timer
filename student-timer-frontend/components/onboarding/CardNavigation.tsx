// CardNavigation.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import {Octicons } from "@expo/vector-icons";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react-native";
import {COLORTHEME} from "../../constants/Theme";

export default function CardNavigation({
   onboardingData,
   activeIndex,
   onPrevPress,
   onNextPress,
}: {
    onboardingData: { title: string; description: string; image: any }[];
    activeIndex: number;
    onPrevPress: () => void;
    onNextPress: () => void;
}) {
    return (
        <View style={styles.navigation}>
            <TouchableOpacity onPress={onPrevPress} disabled={activeIndex === 0}>
                <ChevronLeftCircle
                    color={activeIndex === 0 ? COLORTHEME.light.grey1 : COLORTHEME.light.primary}
                    size={50}
                />
            </TouchableOpacity>
            {onboardingData.map((_, index) => (
                <Octicons
                    key={index}
                    style={index === activeIndex ? styles.active : styles.inactive}
                    name="dot-fill"
                    size={50}
                />
            ))}
            <TouchableOpacity onPress={onNextPress}>
                <ChevronRightCircle color={COLORTHEME.light.primary} size={50} />
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    navigation: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: COLORTHEME.light.grey1,
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    inactive: {
        fontSize: 24,
        color: COLORTHEME.light.grey1,
    },
    active: {
        fontSize: 24,
        color: COLORTHEME.light.primary,
    },
};
