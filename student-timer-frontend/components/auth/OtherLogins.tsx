import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleAndroidClientID,
  GoogleIOSClientID,
  GoogleWebClientID,
} from "@/constants/OAuthCredentials";

import * as Apple from "expo-apple-authentication";
import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "@/components/Themed";

WebBrowser.maybeCompleteAuthSession();

export default function OtherLogins() {
  const router = useRouter();

  const onLoginGoogle = () => promptAsync();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GoogleAndroidClientID,
    iosClientId: GoogleIOSClientID,
    webClientId: GoogleWebClientID,
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfoGoogle(response.authentication?.accessToken);
      }
    } else {
      router.push("/");
    }
  }

  const getUserInfoGoogle = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      router.push("/");
    } catch (error) {}
  };

  const onLoginApple = async () => {
    try {
      const user = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.FULL_NAME,
          Apple.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      router.push("/");
    } catch (error) {}
  };

  const [appleAuthAvailible, setAppleAuthAvailible] = useState(false);

  useEffect(() => {
    const checkAppleAvailable = async () => {
      const isAvailable = await Apple.isAvailableAsync();
      setAppleAuthAvailible(isAvailable);
    };
    checkAppleAvailable();
  });
  return (
    <View style={styles.buttons}>
      <GoogleButton onPress={onLoginGoogle} />
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
