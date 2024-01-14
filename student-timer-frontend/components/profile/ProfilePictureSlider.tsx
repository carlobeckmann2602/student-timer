import React, { useState } from 'react';
import {View, FlatList, Image, TouchableOpacity, Text, Dimensions, Pressable} from 'react-native';
import { useProfilePicture } from '@/components/profile/useProfilePicture';

import {ScrollView} from "@/components/Themed";
import { Picker } from "@react-native-picker/picker";


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

    const {
        profilePictureName,
        setProfilePictureName,
        imagePath,
        setImagePath,
        getProfilePictureName,
    } = useProfilePicture();
    const handleImageSelect = (index: number) => {
        setSelectedIndex(index);
        onSelect(availableImages[index]);
    };

    return (
        <View>
            <FlatList
                data={availableImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => handleImageSelect(index)}>
                        <Image
                            source={{ uri: getImagePath(item) }}
                            style={{ width: 70, height: 70, margin: 5, resizeMode: 'cover' }}
                        />
                    </Pressable>
                )}
            />
            {/*
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {availableImages.map((imageName, index) => (
                    <TouchableOpacity key={index} onPress={() => onSelect(imageName)}>
                        <Image source={{ uri: getImagePath(imageName) }} style={{ width: 70, height: 70 }} />
                    </TouchableOpacity>
                ))}

            </ScrollView>
            */}
            {/*
            <Picker
                style={{ width: width * 0.5 }}
                selectedValue={profilePictureName}
                onValueChange={(itemValue) => onSelect(itemValue)}
            >
                {availableImages.map((imageName, index) => (
                    <Picker.Item key={index} label={imageName} value={imageName} />
                ))}
            </Picker>
            */}
            <View style={{ alignItems: 'center' }}>
                <Text>Aktuelles Bild: {availableImages[selectedIndex]}</Text>
            </View>
        </View>
    );
}
