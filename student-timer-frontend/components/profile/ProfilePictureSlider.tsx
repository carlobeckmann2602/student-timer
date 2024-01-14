import React, { useState } from 'react';
import { View, FlatList, Image, Text, Dimensions, Pressable } from 'react-native';
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import {P} from "@/components/StyledText";

type ProfilePictureSliderProps = {
    availableImages: string[];
    onSelect: (imageName: string) => void;
    getImagePath: (imageName: string) => string;
};

const { width } = Dimensions.get('window');

export default function ProfilePictureSlider({
    availableImages,
    onSelect,
    getImagePath,
}: ProfilePictureSliderProps): React.ReactElement {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleImageSelect = (index: number) => {
        setSelectedIndex(index);
        onSelect(availableImages[index]);
    };

    return (
        <View style={{ width: width, backgroundColor: COLORTHEME.light.grey2 }}>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 10 }}
                style={{ borderRadius: BASE_STYLES.borderRadius }}
                data={availableImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => handleImageSelect(index)}>
                        <Image
                            source={{ uri: getImagePath(item) }}
                            style={{ width: 100, height: 100, margin: 5, resizeMode: 'cover', backgroundColor: "lightgrey" }}
                        />
                    </Pressable>
                )}
            />
            {/*
            <View style={{ alignItems: 'center', paddingBottom: 2 }}>
                <P>Aktuelles Bild: {availableImages[selectedIndex]}</P>
            </View>
            */}
        </View>
    );
}
