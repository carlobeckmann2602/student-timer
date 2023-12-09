import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react-native";
import { COLORTHEME } from "@/constants/Theme";
import { ViewStyle } from 'react-native';

type CardNavigationProps = {
    cardAmount: number;
    activeIndex: number;
    reachedLastItem: boolean;
    onPrevPress: () => void;
    onNextPress: () => void;
}

export default function CardNavigation({
    cardAmount,
    activeIndex,
    reachedLastItem,
    onPrevPress,
    onNextPress,
}: CardNavigationProps) {
    return (
        <View style={viewStyles.navigation}>
            <TouchableOpacity onPress={onPrevPress} disabled={activeIndex === 0}>
                <ChevronLeftCircle
                    color={activeIndex === 0 ? COLORTHEME.light.grey1 : COLORTHEME.light.primary}
                    size={50}
                />
            </TouchableOpacity>
            {[...Array(cardAmount)].map((_, index) => (
                <Octicons
                    key={index}
                    style={index === activeIndex ? styles.active : styles.inactive}
                    name="dot-fill"
                    size={50}
                />
            ))}
            <TouchableOpacity onPress={onNextPress} disabled={reachedLastItem == true} >
                <ChevronRightCircle
                    color={reachedLastItem == true ? COLORTHEME.light.grey1 : COLORTHEME.light.primary}
                    size={50}
                />
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

const viewStyles: { [key: string]: ViewStyle } = {
    navigation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        maxWidth: 600,
    },
};
