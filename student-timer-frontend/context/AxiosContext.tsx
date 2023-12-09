import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { useAuth } from "./AuthContext";
import { TokenType } from "@/types/AuthType";
import { getStoredItem } from "@/libs/deviceStorage";
import { API_URL, TOKEN_KEY } from "@/constants/Api";

type AxiosProps = {
  authAxios?: AxiosInstance;
  publicAxios?: AxiosInstance;
};

const AxiosContext = createContext<AxiosProps>({});

export const useAxios = () => {
  return useContext(AxiosContext);
};

export const AxiosProvider = ({ children }: any) => {
  const { authState, onNewToken, onLogout } = useAuth();

  const authAxios = axios.create({
    baseURL: API_URL,
  });

  const publicAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authState?.token.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const tokenString = await getStoredItem(TOKEN_KEY);
          let token = {} as TokenType;
          if (tokenString) token = JSON.parse(tokenString) as TokenType;
          const refreshToken = token.refreshToken;
          const response = await publicAxios.post(
            "/auth/refreshToken",
            refreshToken,
            {
              headers: {
                "Content-Type": "",
              },
            }
          );
          const newToken = response.data;

          if (onNewToken) await onNewToken(newToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
          return publicAxios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
          if (onLogout) await onLogout();
        }
      }

      return Promise.reject(error);
    }
  );

  const value = {
    authAxios: authAxios,
    publicAxios: publicAxios,
  };

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};
