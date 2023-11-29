// CardNavigation.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import {Octicons } from "@expo/vector-icons";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react-native";
import {COLORTHEME} from "../../constants/Theme";
import {onboardingData} from "../../constants/onboardingItems";

export default function CardNavigation({
   activeIndex,
   onPrevPress,
   onNextPress,
}: {
    activeIndex: number;
    onPrevPress: () => void;
    onNextPress: () => void;
}) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
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
    inactive: {
        fontSize: 24,
        color: COLORTHEME.light.grey1,
    },
    active: {
        fontSize: 24,
        color: COLORTHEME.light.primary,
    },
};
