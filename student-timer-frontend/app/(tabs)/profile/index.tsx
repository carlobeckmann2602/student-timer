import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable"
import { COLORTHEME } from "@/constants/Theme";
import { User2 } from "lucide-react-native";
import {router} from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {

  const { onLogout, authState } = useAuth();

  const images: { [key: string]: any } = {
    "phil.jpg": require("../../../assets/images/profile/phil.jpg"),
    "mareike.jpg": require("../../../assets/images/profile/mareike.jpg"),
    "carlo.jpg": require("../../../assets/images/profile/carlo.jpg"),
    "nils.png": require("../../../assets/images/profile/nils.png"),
    "konstantin.png": require("../../../assets/images/profile/konstantin.png"),
    "": require("../../../assets/images/profile/profile-picture.jpg"),
    "empty":require("../../../assets/images/profile/profile-picture.jpg"),
    "default.jpg": require("../../../assets/images/profile/profile-picture.jpg"),
  };

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
    <View style={styles.container}>
      {/* Profilbild */}

      <View style={styles.profileImageContainer}>
        {imagePath ? (
          <Image source={{uri: imagePath}} style={styles.profileImage} />
        ) : (
          <User2 size={100} color={COLORTHEME.light.primary} />
        )}

      </View>

      {/* Benutzerinformationen */}
      <Text style={styles.title}>{authState?.user.name}</Text>
      <Text>{authState?.user.studyCourse}</Text>

      {/* Aktionen */}
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
            accessibilityLabel={"Logout"}
            accessibilityRole={"button"}
            onPress={onLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORTHEME.light.background,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EEEAEA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: COLORTHEME.light.primary,
    borderWidth: 5,
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
