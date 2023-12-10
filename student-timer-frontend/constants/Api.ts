import { Platform } from "react-native";
export const API_URL = `http://${
  Platform.OS === "android" ? "10.0.2.2" : "localhost"
}:8080`;
export const TOKEN_KEY = "jwt-token";
