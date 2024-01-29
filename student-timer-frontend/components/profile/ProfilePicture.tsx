import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { User2 } from "lucide-react-native";
import { Edit2 } from "lucide-react-native";
import { COLORTHEME } from "@/constants/Theme";
import {
  profileImages,
  defaultPictureName,
} from "@/components/profile/useProfilePicture";

type ProfilePictureProps = {
  imageName: string;
  editStyle?: boolean;
  miniature?: boolean;
  style?: object;
  onPress?: () => void;
  color?: string;
};

export default function ProfilePicture({
  imageName,
  editStyle = false,
  miniature = false,
  onPress,
  color = COLORTHEME.light.primary,
}: ProfilePictureProps) {
  const imagePath =
    profileImages[imageName] || profileImages[defaultPictureName];
  const accessibilityLabel = onPress
    ? "Profilbild ändern"
    : "Aktuelles Profilbild";
  const accessibilityRole = onPress ? "button" : "image";

  const imageWidth = miniature ? 30 : 120;

  return (
    <View style={[
        styles.profileImageContainer,
        { width: imageWidth, height: imageWidth, borderRadius: imageWidth / 2 },
    ]}>
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
      >
        {imagePath ? (
          <Image
            source={imagePath}
            style={{ width: imageWidth, height: imageWidth, borderRadius: imageWidth / 2, borderWidth: imageWidth/24, borderColor: color }}
            accessibilityLabel={"Aktuelles Profilbild"}
          />
        ) : (
          <User2 size={100} color={COLORTHEME.light.primary} />
        )}
        {editStyle && (
          <View style={styles.editIcon}>
            <Edit2 size={24} color={COLORTHEME.light.background} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    backgroundColor: "#EEEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 60,
    backgroundColor: COLORTHEME.light.primary,
    borderColor: COLORTHEME.light.primary,
    borderWidth: 6,
  },
});
