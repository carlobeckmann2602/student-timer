import Constants from "expo-constants";
import { Platform } from "react-native";

export const API_URL = __DEV__
  ? `http://${
      Platform.OS === "web"
        ? "localhost"
        : Constants.expoConfig?.hostUri?.split(":").shift() || "localhost"
    }:8080`
  : process.env.EXPO_PUBLIC_BACKEND_URL;
export const TOKEN_KEY = "jwt-token";
