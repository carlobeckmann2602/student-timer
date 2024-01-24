import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Button from "@/components/Button";
import { ScrollView, Text, View } from "@/components/Themed";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ProfilePicture from "@/components/profile/ProfilePicture";
import { useProfilePicture } from "@/components/profile/useProfilePicture";
import { H2, H3 } from "@/components/StyledText";
import Separator from "@/components/Separator";
import Pressable from "@/components/Pressable";

export default function Profile() {
  const { onLogout, authState } = useAuth();
  const { profilePictureName, getProfilePictureName, setProfilePictureName } =
    useProfilePicture();

  useEffect(() => {
    setProfilePictureName(getProfilePictureName());
  }, [authState]);

  const handleEditData = () => router.push("/profile/editData/");
  const handleEditPassword = () => router.push("/profile/editPassword/");
  const handleEditPicture = () => router.push("/profile/editPicture/");
  const handleStartOnboardingTour = () => router.push("/onboarding");

  return (
    <View style={styles.container}>
      <ProfilePicture
        imageName={profilePictureName}
        editStyle={true}
        onPress={handleEditPicture}
      />
      <View style={styles.title}>
        <H2>{authState?.user.name}</H2>
        <H3>{authState?.user.studyCourse}</H3>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.actionContainer}>
          <Button
            text="Profildaten bearbeiten"
            backgroundColor={COLORTHEME.light.primary}
            textColor="#FFFFFF"
            onPress={handleEditData}
          />
          <Button
            text="Passwort ändern"
            backgroundColor={COLORTHEME.light.primary}
            textColor="#FFFFFF"
            onPress={handleEditPassword}
          />
        </View>
        <Button
          text="Logout"
          backgroundColor={COLORS.white}
          borderColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey3}
          onPress={onLogout}
        />
      </View>
      <Separator text="oder" />
      <View style={styles.tour}>
        <Text>Möchtest Du eine Student-Timer-Tour?{"\n "}</Text>
        <Pressable
          text="Tour starten"
          accessibilityRole="link"
          onPress={handleStartOnboardingTour}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: BASE_STYLES.horizontalPadding,
    flex: 1,
  },
  actionContainer: {
    flexDirection: "column",
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    width: 200,
    gap: 25,
  },
  tour: {
    alignItems: "center",
  },
  title: {
    paddingVertical: 15,
  },
});
