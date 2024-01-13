import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import Button from "@/components/Button";
import { ScrollView } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { COLORTHEME } from "@/constants/Theme";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ProfilePicture from "@/components/profile/ProfilePicture";

export default function Profile() {
  const { onLogout, authState } = useAuth();
  const defaultPictureName="profile-picture.jpg";
  const profilePictureBasePath = "../../../assets/images/profile/";
  const availableImageNames: string[] = ['profile-picture.jpg', 'phil.jpg', 'mareike.jpg', 'carlo.jpg', 'nils.png', 'konstantin.png', 'alex.jpg', 'random.jpg'];

  const getProfilePictureName = () => {
    return availableImageNames.includes(authState?.user.profilePicture ?? '')
        ? authState?.user.profilePicture || ''
        : defaultPictureName;
  };
  const getImagePath = (profilePictureName: string) => {
    const fullPath = profilePictureName === 'empty'
        ? `${profilePictureBasePath}${defaultPictureName}`
        : `${profilePictureBasePath}${profilePictureName}`;
    return fullPath;
  };

  const [profilePictureName, setProfilePictureName] = useState<string>(getProfilePictureName());
  const [imagePath, setImagePath] = useState<string>(getImagePath(getProfilePictureName()));

  useEffect(() => {
    setImagePath(getImagePath(getProfilePictureName()));
  }, [authState]);


  console.log("#### useState:", profilePictureName, typeof profilePictureName);
  console.log("authState?.user.profilePicture", authState?.user.profilePicture, typeof authState?.user.profilePicture);
  console.log("imagePath", imagePath);


  const handleEditData = () => router.push("/profile/editData/");
  const handleEditPassword = () => router.push("/profile/editPassword/");
  const handleEditPicture = () => router.push("/profile/editPicture/");
  const handleEditProfile = () => router.push("/profile/edit/");

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <ProfilePicture imagePath={imagePath} />
        <Text style={styles.title}>{authState?.user.name}</Text>
        <Text>{authState?.user.studyCourse}</Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginVertical: 40,
  },
});
