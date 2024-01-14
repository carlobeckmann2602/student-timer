import React, { useEffect } from "react";
import {View, StyleSheet} from "react-native";
import Button from "@/components/Button";
import { ScrollView } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { COLORTHEME } from "@/constants/Theme";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ProfilePicture from "@/components/profile/ProfilePicture";
import { useProfilePicture } from '@/components/profile/useProfilePicture';
import {H2, H3} from "@/components/StyledText";

export default function Profile() {
  const { onLogout, authState } = useAuth();
  const { profilePictureName, imagePath, setImagePath, getImagePath, getProfilePictureName } = useProfilePicture();

  useEffect(() => {
    setImagePath(getImagePath(getProfilePictureName()));
  }, [authState]);

  console.log("#### useState:", profilePictureName, typeof profilePictureName);
  console.log("authState?.user.profilePicture", authState?.user.profilePicture, typeof authState?.user.profilePicture);
  console.log("imagePath", imagePath);


  const handleEditData = () => router.push("/profile/editData/");
  const handleEditPassword = () => router.push("/profile/editPassword/");
  const handleEditPicture = () => router.push("/profile/editPicture/");
  const handleTest = () => router.push("/profile/pictureSliderTest/");

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <ProfilePicture imagePath={imagePath} />
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
          <Button
              text="Profilbild wechseln"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={handleEditPicture}
          />
          <Button
              text="Test"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={handleTest}
          />
        </View>
        <View>
          <Pressable
              text={"Logout"}
              ariaLabel={"Logout"}
              accessibilityRole={"button"}
              onPress={onLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: "column",
    width: 200,
    gap: 15,
    marginVertical: 40,
  },
});
