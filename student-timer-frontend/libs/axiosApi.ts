import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { getStoredItem } from "@/libs/deviceStorage";
import { TokenType } from "@/types/AuthType";
import { API_URL, TOKEN_KEY } from "@/constants/Api";

const api = axios.create({
  baseURL: API_URL,
});

const { onLogout, onNewToken, authState } = useAuth();

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = authState?.token.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Token invalid");

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokenString = await getStoredItem(TOKEN_KEY);
        let token = {} as TokenType;
        if (tokenString) token = JSON.parse(tokenString) as TokenType;
        const refreshToken = token.refreshToken;
        const response = await axios.post(`${API_URL}/auth/refreshToken`, {
          refreshToken,
        });
        const { newToken } = response.data;

        if (onNewToken) await onNewToken(newToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        if (onLogout) await onLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
