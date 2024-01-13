import React, {useState} from "react";
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

  const userProfilePictureName = authState?.user.profilePicture || defaultPictureName;
  const imagePath = userProfilePictureName === 'empty'
      ? `${profilePictureBasePath}${defaultPictureName}`
      : `${profilePictureBasePath}${userProfilePictureName}`;

  const [profilePicture, setProfilePicture] = useState(userProfilePictureName);

  console.log("#### useState:", profilePicture, typeof profilePicture);
  console.log("authState?.user.profilePicture", authState?.user.profilePicture, typeof authState?.user.profilePicture);
  console.log("imagePath", imagePath);


  const user = {
    name: authState?.user.name,
    studySubject: authState?.user.studyCourse,
  };

  const handleEditData = () => {
    router.push("/profile/editData/");
    console.log("Profildaten bearbeiten");
  };
  const handleEditPassword = () => {
    router.push("/profile/editPassword/");
    console.log("Passwort ändern");
  };
  const handleEditPicture = () => {
    router.push("/profile/editPicture/");
    console.log("Profilbild ändern");
  };
  const handleEditProfile = () => {
    router.push("/profile/edit/");
    console.log("Profil bearbeiten");
  };

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
          <Button
              text="Profil bearbeiten (alt)"
              backgroundColor={COLORTHEME.light.primary}
              textColor="#FFFFFF"
              onPress={handleEditProfile}
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
    marginTop: 20,
  },
});
