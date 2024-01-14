import { Tabs, router, usePathname } from "expo-router";

import { BASE_STYLES, COLORTHEME, SIZES } from "@/constants/Theme";
import {
  BarChart2,
  ChevronLeft,
  LayoutList,
  TimerReset,
  User2,
} from "lucide-react-native";
import { Pressable } from "react-native";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      sceneContainerStyle={{
        paddingHorizontal: BASE_STYLES.horizontalPadding,
        backgroundColor: COLORTHEME.light.background,
      }}
      screenOptions={{
        tabBarActiveTintColor: COLORTHEME.light.primary,
        tabBarInactiveTintColor: COLORTHEME.light.tabIconDefault,
        headerTitleStyle: {
          fontSize: SIZES.xLarge,
          fontWeight: "500",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          borderTopWidth: 1,
          paddingBottom: 15,
        },
        headerLeft: () => {
          const pathname = usePathname();
          switch (pathname) {
            case "/modules/new":
              return (
                <Pressable onPress={() => router.push("/modules")}>
                  <ChevronLeft />
                </Pressable>
              );
            case "/modules/new/learningUnits":
              return (
                <Pressable onPress={() => router.back()}>
                  <ChevronLeft />
                </Pressable>
              );

            case "/profile/editData":
            case "/profile/editPassword":
            case "/profile/editPicture":
              return (
                <Pressable onPress={() => router.push("/profile")}>
                  <ChevronLeft />
                </Pressable>
              );

            default:
              return null;
          }
        },
      }}
    >
      <Tabs.Screen
        name="(tracking)"
        options={{
          title: "Tracking",
          tabBarIcon: ({ color }) => (
            <TimerReset name="clock-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="modules"
        options={{
          title: "Module",
          href: "/modules",
          tabBarIcon: ({ color }) => <LayoutList name="module" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistik",
          tabBarIcon: ({ color }) => (
            <BarChart2 name="statistic" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          href: "/profile",
          tabBarIcon: ({ color }) => <User2 name="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}
