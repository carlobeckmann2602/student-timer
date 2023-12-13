import {
  GoogleIOSClientID,
  GoogleWebClientID,
} from "@/constants/OAuthCredentials";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import * as AppleAuthentication from "expo-apple-authentication";
import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "@/components/Themed";
import { useAuth } from "@/context/AuthContext";

export default function OtherLogins() {
  const router = useRouter();
  const { onLogin } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GoogleWebClientID,
      offlineAccess: true,
      iosClientId: GoogleIOSClientID,
    });
  }, []);

  /* const onLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const result = await onLogin!(
        userInfo.user.email,
        undefined,
        userInfo.idToken ? userInfo.idToken : "",
        undefined,
        undefined,
        "GOOGLE"
      );
      if (result && result.error) {
        console.error(result.error);
      } else {
        router.push("/(tabs)/(tracking)");
      }
    } catch (error: any) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  }; */

  const onLoginApple = async () => {
    try {
      const user = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(`Apple User: ${JSON.stringify(user, null, 2)}`);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [appleAuthAvailible, setAppleAuthAvailible] = useState(false);

  useEffect(() => {
    const checkAppleAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailible(isAvailable);
    };
    checkAppleAvailable();
  });

  return (
    <View style={styles.buttons}>
      {/* <GoogleButton onPress={onLoginGoogle} /> */}
      {appleAuthAvailible ? <AppleButton onPress={onLoginApple} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "column",
    width: 200,
    gap: 15,
  },
});
