import { Tabs, router, usePathname } from "expo-router";
import { Dimensions, Platform } from "react-native";

import { BASE_STYLES, COLORTHEME, SIZES } from "@/constants/Theme";
import {
    BarChart2,
    ChevronLeft,
    LayoutList,
    TimerReset,
    User2,
} from "lucide-react-native";
import { Pressable } from "react-native";
import Alert from "@/components/Alert";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {useProfilePicture} from "@/components/profile/useProfilePicture";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";

export default function TabLayout() {
    // const colorScheme = useColorScheme();
    const { authState } = useAuth();

    const { profilePictureName, getProfilePictureName, setProfilePictureName } =
        useProfilePicture();

    useEffect(() => {
        setProfilePictureName(getProfilePictureName());
    }, [authState]);

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
                headerTitleAlign: "center",
                headerShadowVisible: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    paddingBottom:
                        Platform.OS === "ios" && Dimensions.get("window").height >= 1350
                            ? 15
                            : 5,
                },
                headerLeft: () => {
                    const pathname = usePathname();
                    switch (pathname) {
                        case "/profile/editData":
                        case "/profile/editPassword":
                        case "/profile/editPicture":
                            return (
                                <Pressable
                                    onPress={() => {
                                        Alert({
                                            title: "Änderungen verwerfen?",
                                            message:
                                                "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                                            onPressConfirm: () => router.push("/profile"),
                                        });
                                    }}
                                >
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
                    headerShown: false,
                    href: "/modules",
                    title: "Module",
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
                    tabBarIcon: ({ color }) => <ProfilePicture imageName={profilePictureName} miniature={true} color={color} onPress={() => router.push("/profile") }/>,
                }}
            />
        </Tabs>
    );
}
