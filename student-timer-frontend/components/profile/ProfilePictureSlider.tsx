import React, { useState } from 'react';
import { View, FlatList, Image, Text, Dimensions, Pressable } from 'react-native';
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import {P} from "@/components/StyledText";
import {ProfileImages} from "@/components/profile/useProfilePicture";

type ProfilePictureSliderProps = {
    profileImages: ProfileImages;
    onSelect: (imageName: string) => void;
};

const { width } = Dimensions.get('window');

export default function ProfilePictureSlider({
                                                 profileImages,
                                                 onSelect,
}: ProfilePictureSliderProps): React.ReactElement {
    const availableImages = Object.keys(profileImages);

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
                            source={profileImages[item]}
                            style={{ width: 150, height: 150, margin: 5, resizeMode: 'cover', backgroundColor: "lightgrey" }}
                        />
                    </Pressable>
                )}
            />
        </View>
    );
}
