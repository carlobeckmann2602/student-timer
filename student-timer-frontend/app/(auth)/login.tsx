import { StyleSheet, TextInput } from "react-native";
import Header from "@/components/Header";
import { Title } from "@/components/StyledText";
import { COLORTHEME } from "@/constants/Theme";
import { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import Button from "@/components/Button";
import Separator from "@/components/Separator";
import { Link, useRouter } from "expo-router";

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

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLogin = () => {
    router.push("/");
  };

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
    <>
      <Header title="Login"></Header>
      <View style={styles.container}>
        <Title>Student Time Tracker</Title>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Passwort"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <View style={styles.buttons}>
            <Button
              text="Log In"
              backgroundColor={COLORTHEME.light.primary}
              textColor={COLORTHEME.light.grey2}
              onPress={onLogin}
            />
          </View>
          <Text>
            Sie haben kein Konto?{" "}
            <Link href="/signup" style={{ textDecorationLine: "underline" }}>
              Account erstellen
            </Link>
          </Text>
          <Separator text="oder" />
          <View style={styles.buttons}>
            <GoogleButton onPress={onLoginGoogle} />
            {appleAuthAvailible ? <AppleButton onPress={onLoginApple} /> : null}
          </View>
        </View>
      </View>
    </>
  );
}

/*<Apple.AppleAuthenticationButton
                buttonType={Apple.AppleAuthenticationButtonType.CONTINUE}
                buttonStyle={Apple.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={50}
                style={styles.appleButton}
                onPress={onLoginApple}
              />*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  inputs: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  input: {
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    width: 350,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "column",
    width: 200,
    gap: 15,
  },
  appleButton: {
    width: 200,
    height: 50,
    fontSize: 16,
    fontWeight: "600",
  },
});
