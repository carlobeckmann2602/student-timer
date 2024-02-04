import React, { useState } from "react";
import { View, FlatList, Image, Dimensions, Pressable } from "react-native";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { ProfileImages } from "@/components/profile/useProfilePicture";

type ProfilePictureSliderProps = {
  profileImages: ProfileImages;
  onSelect: (imageName: string) => void;
};

const { width } = Dimensions.get("window");

export default function ProfilePictureSlider({
  profileImages,
  onSelect,
}: ProfilePictureSliderProps): React.ReactElement {
  const availableImages = Object.keys(profileImages);

  const [, setSelectedIndex] = useState(0);

  const handleImageSelect = (index: number) => {
    setSelectedIndex(index);
    onSelect(availableImages[index]);
  };

  return (
    <View
      style={{
        width: width - BASE_STYLES.horizontalPadding * 2,
        backgroundColor: COLORTHEME.light.grey1,
        borderRadius: BASE_STYLES.borderRadius,
      }}
    >
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: BASE_STYLES.borderRadius,
        }}
        style={{ borderRadius: BASE_STYLES.borderRadius }}
        data={availableImages}
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => handleImageSelect(index)}>
            <Image
              source={profileImages[item]}
              style={{
                width: 150,
                height: 150,
                margin: 5,
                resizeMode: "cover",
                backgroundColor: "lightgrey",
                borderRadius: BASE_STYLES.borderRadius,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
