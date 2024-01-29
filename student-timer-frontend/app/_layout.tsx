import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";

import { AuthProvider } from "@/context/AuthContext";
import { AxiosProvider } from "@/context/AxiosContext";
import { ModuleProvider } from "@/context/ModuleContext";
import Toast from "@/components/Toast";
import { BASE_STYLES, COLORTHEME, SIZES } from "@/constants/Theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OpenSans_Regular: require("../assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    OpenSans_Bold: require("../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    OpenSans_Italic: require("../assets/fonts/OpenSans/OpenSans-Italic.ttf"),
    OpenSans_Light: require("../assets/fonts/OpenSans/OpenSans-Light.ttf"),
    OpenSans_LightItalic: require("../assets/fonts/OpenSans/OpenSans-LightItalic.ttf"),
    OpenSans_Medium: require("../assets/fonts/OpenSans/OpenSans-Medium.ttf"),
    OpenSans_MediumItalic: require("../assets/fonts/OpenSans/OpenSans-MediumItalic.ttf"),
    OpenSans_SemiBold: require("../assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
    OpenSans_SemiBoldItalic: require("../assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf"),
    // Roboto: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme();

  const loggedIn = false;
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <ToastProvider
            placement="top"
            textStyle={{ fontFamily: "OpenSans_Regular" }}
            renderToast={Toast}
          >
            <AuthProvider>
              <AxiosProvider>
                <ModuleProvider>
                  <Stack
                    screenOptions={{
                      headerShadowVisible: false,
                    }}
                  >
                    <Stack.Screen
                      name="index"
                      options={{
                        headerShown: false,
                        contentStyle: {
                          paddingHorizontal: BASE_STYLES.horizontalPadding,
                          backgroundColor: COLORTHEME.light.background,
                        },
                      }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{
                        header: () => <></>,
                      }}
                    />
                    <Stack.Screen
                      name="(auth)/login"
                      options={{
                        headerTitle: "Login",
                        headerTitleStyle: {
                          fontSize: SIZES.xLarge,
                          fontWeight: "500",
                        },
                        headerTitleAlign: "center",
                        headerBackTitleVisible: false,
                        headerBackVisible: false,
                        contentStyle: {
                          paddingHorizontal: BASE_STYLES.horizontalPadding,
                          backgroundColor: COLORTHEME.light.background,
                        },
                      }}
                    />
                    <Stack.Screen
                      name="(auth)/signup"
                      options={{
                        headerTitle: "Registrieren",
                        headerTitleStyle: {
                          fontSize: SIZES.xLarge,
                          fontWeight: "500",
                        },
                        headerTitleAlign: "center",
                        headerBackTitleVisible: false,
                        contentStyle: {
                          paddingHorizontal: BASE_STYLES.horizontalPadding,
                          backgroundColor: COLORTHEME.light.background,
                        },
                      }}
                    />
                    <Stack.Screen
                      name="onboarding/index"
                      options={{
                        headerTitle: "Student Timer",
                        headerTitleStyle: {
                          fontSize: SIZES.xLarge,
                          fontWeight: "500",
                        },
                        headerTitleAlign: "center",
                        headerBackVisible: false,
                        contentStyle: {
                          paddingHorizontal: BASE_STYLES.horizontalPadding,
                          backgroundColor: COLORTHEME.light.background,
                        },
                      }}
                    />
                  </Stack>
                </ModuleProvider>
              </AxiosProvider>
            </AuthProvider>
          </ToastProvider>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
