import React, { useEffect } from "react";
import {View, StyleSheet, Pressable} from "react-native";
import Button from "@/components/Button";
import { ScrollView } from "@/components/Themed";
import {COLORS, COLORTHEME} from "@/constants/Theme";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ProfilePicture from "@/components/profile/ProfilePicture";
import { useProfilePicture } from '@/components/profile/useProfilePicture';
import {H2, H3} from "@/components/StyledText";

export default function Profile() {
  const { onLogout, authState } = useAuth();
  const { profilePictureName, getProfilePictureName, setProfilePictureName } = useProfilePicture();

  useEffect(() => {
    setProfilePictureName(getProfilePictureName());
  }, [authState]);

  const handleEditData = () => router.push("/profile/editData/");
  const handleEditPassword = () => router.push("/profile/editPassword/");
  const handleEditPicture = () => router.push("/profile/editPicture/");

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
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
        </View>
        <Button style={{width: 200}}
            text="Logout"
            backgroundColor={COLORS.white}
            borderColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey3}
            onPress={onLogout}
        />
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
