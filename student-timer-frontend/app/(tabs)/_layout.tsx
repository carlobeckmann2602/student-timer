import { Tabs } from "expo-router";

import { COLORTHEME } from "@/constants/Theme";
import Header from "@/components/Header";
import { BarChart2, LayoutList, TimerReset, User2 } from "lucide-react-native";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORTHEME.light.primary,
        tabBarInactiveTintColor: COLORTHEME.light.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="(tracking)"
        options={{
          title: "Tracking",
          tabBarIcon: ({ color }) => (
            <TimerReset name="clock-o" color={color} />
          ),
          header: () => <Header title="Tracking" />,
        }}
      />
      <Tabs.Screen
        name="modules"
        options={{
          title: "Module",
          tabBarIcon: ({ color }) => <LayoutList name="module" color={color} />,
          header: () => <Header title="Module" />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistik",
          tabBarIcon: ({ color }) => (
            <BarChart2 name="statistic" color={color} />
          ),
          header: () => <Header title="Statistik" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User2 name="profile" color={color} />,
          header: () => <Header title="Profil" />,
        }}
      />
    </Tabs>
  );
}
