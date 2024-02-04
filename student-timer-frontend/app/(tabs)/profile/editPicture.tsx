import React, { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { View } from "@/components/Themed";
import { StyleSheet} from "react-native";
//@ts-ignore
import SwitchSelector from "react-native-switch-selector";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { BASE_STYLES, COLORS } from "@/constants/Theme";
import ProfilePicture from "@/components/profile/ProfilePicture";
import { H3 } from "@/components/StyledText";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import {
  profilePatternImages,
  profileHumanAvatarImages,
  profileFantasyAvatarImages,
  useProfilePicture,
} from "@/components/profile/useProfilePicture";
import ProfilePictureSlider from "@/components/profile/ProfilePictureSlider";

export default function EditPicture() {
  const toast = useToast();
  const { onChangePicture} = useAuth();
  const router = useRouter();

  const [isChanged, setIsChanged] = useState(false);
  const {
    profilePictureName,
    setProfilePictureName,
    setImagePath,
    getImagePath,
  } = useProfilePicture();
  const switchCategoryOptions: Array<{ label: string; value: string }> = [
    { label: 'Fantasie', value: 'fantasy' },
    { label: 'Portraits', value: 'portraits' },
    { label: 'Muster', value: 'abstract' },
  ];
  const [, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = React.useState('fantasy');

  useEffect(() => {
    setImagePath(getImagePath(profilePictureName));
  }, [profilePictureName]);

  const handleImageNameChange = (imageName: string) => {
    setProfilePictureName(imageName);
    setImagePath(imageName);
    setIsChanged(true);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const changePicture = async () => {
    let id = toast.show("Speichern...", { type: "loading" });
    const result = await onChangePicture!(profilePictureName);
    if (result && result.error) {
      setError(result.msg);
      toast.update(id, result.msg, { type: "danger" });
    } else {
      toast.update(id, "Profilbild erfolgreich geändert", { type: "success" });
      router.push("/profile/");
    }
  };

  const cancel = () => {
    router.push("/profile/");
  };

  const onCancel = () => {
    if (isChanged) {
      Alert({
        title: "Änderungen verwerfen?",
        message:
          "Du hast dein Profilbild geändert. Wenn Du fortfährst, gehen alle ungespeicherten Änderungen verloren. Möchten Du die Änderung wirklich verwerfen?",
        onPressConfirm: cancel,
      });
    } else {
      cancel();
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePicture imageName={profilePictureName} />
      <H3 style={styles.title}>Profilbild ändern</H3>
      <View style={styles.pictureContainer}>
          <SwitchSelector
              options={switchCategoryOptions}
              initial={switchCategoryOptions.findIndex((option) => option.value === selectedCategory)}
              onPress={(value: string) => handleCategoryChange(value)}
              backgroundColor={COLORS.white}
              buttonColor={COLORS.primary}
              selectedColor={COLORS.white}
              textColor={COLORS.grey3}
              hasPadding
              valuePadding={2}
              borderWidth={3}
              borderColor={COLORS.grey1}
              //fontSize={16}
          />
          <ProfilePictureSlider
              profileImages={
                selectedCategory === 'portraits'
                    ? profileHumanAvatarImages
                    : selectedCategory === 'fantasy'
                        ? profileFantasyAvatarImages
                        : profilePatternImages
              }
              onSelect={handleImageNameChange}
          />
      </View>
      <View style={styles.actionContainer}>
        <Button
          text="Speichern"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={changePicture}
          style={{ width: 200 }}
          disabled={!isChanged}
        />
        <Button
          text="Abbrechen"
          backgroundColor={COLORS.white}
          borderColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey3}
          style={{ width: 200 }}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: BASE_STYLES.horizontalPadding,
    flex: 1,
  },
  pictureContainer: {
    marginVertical: 20,
    gap: 10
  },
  actionContainer: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    paddingVertical: 10,
  },
});
