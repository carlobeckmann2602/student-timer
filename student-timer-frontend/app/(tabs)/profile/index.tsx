import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Button from "@/components/Button";
import { ScrollView, Text } from "@/components/Themed";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ProfilePicture from "@/components/profile/ProfilePicture";
import { useProfilePicture } from '@/components/profile/useProfilePicture';
import { H2, H3 } from "@/components/StyledText";
import Separator from "@/components/Separator";
import Pressable from "@/components/Pressable";

export default function Profile() {
  const { onLogout, authState } = useAuth();
  const { profilePictureName, getProfilePictureName, setProfilePictureName } = useProfilePicture();

  useEffect(() => {
    setProfilePictureName(getProfilePictureName());
  }, [authState]);

  const handleEditData = () => router.push("/profile/editData/");
  const handleEditPassword = () => router.push("/profile/editPassword/");
  const handleEditPicture = () => router.push("/profile/editPicture/");
  const handleStartOnboardingTour = () => router.push("/onboarding");

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfilePicture imageName={profilePictureName} editStyle={true} onPress={handleEditPicture} />
        <H2>{authState?.user.name}</H2>
        <H3>{authState?.user.studyCourse}</H3>
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
          <Button style={styles.logout}
              text="Logout"
              backgroundColor={COLORS.white}
              borderColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey3}
              onPress={onLogout}
          />
        </View>
        <Separator text="oder"/>
        <View style={styles.tour}>
          <Text>
            Möchtest Du eine Student-Timer-Tour?{"\n "}
          </Text>
          <Pressable
              text="Tour starten"
              accessibilityRole="link"
              onPress={handleStartOnboardingTour}
          />
        </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: "column",
    width: 200,
    gap: 15,
    marginVertical: 30,
  },
  logout: {
    marginTop: 20,
  },
  tour: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  }
});
