import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "@/constants/Colors";
import Header from "@/components/Header";
import { BarChart2, LayoutList, TimerReset, User2 } from "lucide-react-native";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index"
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
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User2 name="profil" color={color} />,
          header: () => <Header title="Module" />,
        }}
      />
    </Tabs>
  );
}
