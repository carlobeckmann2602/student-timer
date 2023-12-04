import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  saveItem,
  deleteStoredItem,
  getStoredItem,
} from "@/libs/deviceStorage";
import { API_URL, TOKEN_KEY } from "@/constants/Api";
import { useRouter } from "expo-router";
import { AuthStateType, TokenType, UserType } from "@/types/AuthType";

type AuthProps = {
  authState?: AuthStateType;
  onRegister?: (
    name: string,
    studyCourse: string,
    profilePicture: string,
    email: string,
    password: string,
    password2: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onNewToken?: (token: TokenType) => Promise<any>;
};

const USER_KEY = "user";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthStateType>({
    token: { accessToken: null, refreshToken: null, tokenType: null },
    authenticated: null,
    user: {
      id: null,
      name: null,
      studyCourse: null,
      profilePicture: null,
      email: null,
    },
  });

  useEffect(() => {
    const loadToken = async () => {
      let token = {} as TokenType;
      const tokenString = await getStoredItem(TOKEN_KEY);
      if (tokenString) token = JSON.parse(tokenString);

      let user = {} as UserType;
      const userString = await getStoredItem(USER_KEY);
      if (userString) user = JSON.parse(userString);

      if (token.accessToken && user.id) {
        /* axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.refreshToken}`; */
        setAuthState({ token: token, authenticated: true, user: user });
      }
    };
    loadToken();
  }, []);

  const register = async (
    name: string,
    studyCourse: string,
    profilePicture: string,
    email: string,
    password: string,
    password2: string
  ) => {
    try {
      const result = await axios.post(`${API_URL}/auth/signUp`, {
        name,
        studyCourse,
        profilePicture,
        email,
        password,
        password2,
      });

      const user = {
        id: result.data.studentId,
        name: result.data.name,
        studyCourse: result.data.studyCourse,
        profilePicture: result.data.profilePicture,
        email: result.data.email,
      } as UserType;

      const token = {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      } as TokenType;

      /* axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.accessToken}`; */

      setAuthState({
        token: token,
        authenticated: true,
        user: user,
      });

      await saveItem(TOKEN_KEY, JSON.stringify(token));

      await saveItem(USER_KEY, JSON.stringify(user));

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const token = {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      } as TokenType;

      /* axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.accessToken}`; */

      const resultUser = await axios.get(
        `${API_URL}/students/${result.data.studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      const user = resultUser.data as UserType;

      setAuthState({
        token: token,
        authenticated: true,
        user: user,
      });

      await saveItem(TOKEN_KEY, JSON.stringify(token));

      await saveItem(USER_KEY, JSON.stringify(user));

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const router = useRouter();

  const logout = async () => {
    await deleteStoredItem(TOKEN_KEY);
    await deleteStoredItem(USER_KEY);

    //axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: { accessToken: null, refreshToken: null, tokenType: null },
      authenticated: false,
      user: {
        id: null,
        name: null,
        studyCourse: null,
        profilePicture: null,
        email: null,
      },
    });

    router.push("/(auth)/login");
  };

  const newToken = async (token: TokenType) => {
    setAuthState({
      token: token,
      authenticated: true,
      user: authState.user,
    });
    await saveItem(TOKEN_KEY, JSON.stringify(token));
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onNewToken: newToken,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
