import React from "react";
import { Image, Pressable, View } from "react-native";
import { User2 } from "lucide-react-native";
import { Edit2 } from "lucide-react-native";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import {
  allProfileImages,
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
    allProfileImages[imageName] || allProfileImages[defaultPictureName];
  const accessibilityLabel = onPress
    ? "Profilbild ändern"
    : "Aktuelles Profilbild";
  const accessibilityRole = onPress ? "button" : "image";

  const imageSize = miniature ? 22 : 120;
  const iconSize = miniature ? 20 : 112;
  const iconWidth = miniature ? BASE_STYLES.iconWidth : 6;
  const containerBackgroundColor = miniature
    ? COLORTHEME.light.background
    : COLORTHEME.light.grey1;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        borderWidth: iconWidth - 0.1,
        borderColor: color,
        backgroundColor: containerBackgroundColor,
      }}
    >
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
      >
        {imagePath ? (
          <Image
            source={imagePath}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
              borderWidth: iconWidth,
              borderColor: color,
            }}
            accessibilityLabel={"Aktuelles Profilbild"}
          />
        ) : (
          <View
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <User2
              size={iconSize}
              color={color}
              strokeWidth={iconWidth}
              absoluteStrokeWidth
              style={{ marginTop: 4 }}
            />
          </View>
        )}
        {editStyle && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: 60,
              backgroundColor: COLORTHEME.light.primary,
              borderColor: COLORTHEME.light.primary,
              borderWidth: 8,
            }}
          >
            <Edit2
              size={20}
              color={COLORTHEME.light.background}
              strokeWidth={BASE_STYLES.iconWidth}
              absoluteStrokeWidth
            />
          </View>
        )}
      </Pressable>
    </View>
  );
}
