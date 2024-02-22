import { useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

import Button from "@/components/Button";
import { GoogleIcon } from "@/components/Icons";
import {
  GoogleIOSClientID,
  GoogleWebClientID,
} from "@/constants/OAuthCredentials";

import { LOGIN_PROVIDER, useAuth } from "@/context/AuthContext";
import { toastShow, toastUpdate } from "../Toast";

export default function GoogleButton() {
  const toast = useToast();
  const { onLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GoogleWebClientID,
      offlineAccess: true,
      iosClientId: GoogleIOSClientID,
    });
  }, []);

  const onLoginGoogle = async () => {
    let id = toastShow(toast, "Login...", { type: "loading" });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const result = await onLogin!(
        userInfo.user.email,
        undefined,
        userInfo.idToken ? userInfo.idToken : "",
        undefined,
        undefined,
        LOGIN_PROVIDER.GOOGLE
      );
      if (result && result.error) {
        toastUpdate(toast, id, "Login fehlgeschlagen.", {
          type: "danger",
        });
        console.error(result.error);
      } else {
        toastUpdate(toast, id, "Login erfolgreich", { type: "success" });
        router.push("/(tabs)/(tracking)");
      }
    } catch (error: any) {
      toastUpdate(toast, id, "Login fehlgeschlagen.", {
        type: "danger",
      });
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
  };
  return (
    <Button
      text="Weiter mit Google"
      backgroundColor="#fff"
      textColor="#1F1F1F"
      borderColor="#747775"
      onPress={onLoginGoogle}
      iconLeft={<GoogleIcon size={20} />}
      centerIcon
    />
  );
}
