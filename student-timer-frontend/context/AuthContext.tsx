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
import { useToast } from "react-native-toast-notifications";

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
  onLogin?: (
    email: string,
    password?: string,
    idToken?: string,
    userSecret?: string,
    name?: string,
    provider?: LOGIN_PROVIDER
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
  onUpdate?: (
      userName: string,
      userStudyCourse: string,
      userEmail: string
  ) => Promise<any>;
  onChangePassword?: (
      newPassword: string,
      newPassword2: string,
      ) => Promise<any>
  onRemove?: (userId: number) => Promise<any>;
  onNewToken?: (token: TokenType) => Promise<any>;
};

export enum LOGIN_PROVIDER {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
}
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

      //toDo: how to make reload with data of logged in user possible?
      if (token.accessToken && user.id) {
        setAuthState({ token: token, authenticated: true, user: user });
      } else {

        // toDo: Clear user data if the token or user ID is missing: could have been deleted or logged out
        //await deleteStoredItem(TOKEN_KEY);
        //await deleteStoredItem(USER_KEY);

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

      setAuthState({
        token: token,
        authenticated: true,
        user: user,
      });

      await saveItem(TOKEN_KEY, JSON.stringify(token));

      await saveItem(USER_KEY, JSON.stringify(user));

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const login = async (
    email: string,
    password?: string,
    idToken?: string,
    userSecret?: string,
    name?: string,
    provider?: LOGIN_PROVIDER
  ) => {
    try {
      console.log(`Provider: ${provider}`);
      let result = null;
      switch (provider) {
        case LOGIN_PROVIDER.GOOGLE:
          console.log(`GOOGLE: ${email}, ${idToken}`);
          result = await axios.post(`${API_URL}/auth/login/oauth2`, {
            email,
            tokenId: idToken,
            provider,
          });
          console.log(`GOOGLE: ${JSON.stringify(result, null, 2)}`);
          break;

        case LOGIN_PROVIDER.APPLE:
          console.log(`APPLE: ${email}, ${idToken}, ${userSecret}, ${name}`);
          result = await axios.post(`${API_URL}/auth/login/oauth2`, {
            email,
            userSecret,
            name,
            tokenId: idToken,
            provider,
          });

          console.log(`APPLE: ${JSON.stringify(result, null, 2)}`);
          break;

        default:
          result = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          });
          break;
      }

      const token = {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      } as TokenType;

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
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const update = async (
      userName: string,
      userStudyCourse: string,
      userEmail: string
  ) => {
    try {
      const result = await axios.put(
        `${API_URL}/students/${authState.user.id}`,
        {
          name: userName,
          studyCourse: userStudyCourse,
          email: userEmail
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token.accessToken}`,
          },
        }
      );

      const user = {
        ...authState.user,
        name: userName,
        studyCourse: userStudyCourse,
        email: userEmail,
      } as UserType;

      setAuthState({
        token: authState.token,
        authenticated: true,
        user: user,
      });

      await saveItem(USER_KEY, JSON.stringify(user));

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const changePassword = async (
      newPassword: string,
      newPassword2: string
  ) => {
    try {
      const result = await axios.put(
          `${API_URL}/students/${authState.user.id}`,
          {
            name: authState.user.name,
            studyCourse: authState.user.studyCourse,
            email: authState.user.email,
            password: newPassword,
            password2: newPassword2,
          },
          {
            headers: {
              Authorization: `Bearer ${authState.token.accessToken}`,
            },
          }
      );

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };


  const remove = async (userId: number) => {
    try {
      const result = await axios.delete(`${API_URL}/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${authState.token.accessToken}`,
        },
      });

      await deleteStoredItem(TOKEN_KEY);
      await deleteStoredItem(USER_KEY);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };


  const router = useRouter();

  const toast = useToast();

  const logout = async () => {
    let id = toast.show('Logout...', { type: "loading" })
    await deleteStoredItem(TOKEN_KEY);
    await deleteStoredItem(USER_KEY);

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
    toast.update(id, "Logout erfolgreich", { type: "success" }); //toDo update funktioniert nicht?
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
    onUpdate: update,
    onRemove: remove,
    onChangePassword: changePassword,
    onNewToken: newToken,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
