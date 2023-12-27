import Constants from "expo-constants";
import { Platform } from "react-native";

export const API_URL = __DEV__
  ? `http://${
      Platform.OS === "web"
        ? "localhost"
        : Constants.expoConfig?.hostUri?.split(":").shift() || "localhost"
    }:8080`
  : "https://student-timer-backend.onrender.com";
export const TOKEN_KEY = "jwt-token";
