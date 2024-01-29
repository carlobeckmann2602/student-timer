import Alert from "@/components/Alert";
import { SIZES } from "@/constants/Theme";
import { Stack, router, usePathname } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable } from "react-native";

export default function ModulesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontSize: SIZES.xLarge,
          fontWeight: "500",
        },
        headerShadowVisible: false,
        headerLeft: () => {
          const pathname = usePathname();
          switch (pathname) {
            case pathname.match(/\d+\/learningUnits\/\d+\/edit/)?.input:
              return (
                <Pressable
                  onPress={() => {
                    Alert({
                      title: "Änderungen verwerfen?",
                      message:
                        "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                      onPressConfirm: () => {
                        const dynamicPath = pathname.replace(/\/learningUnits\/\d+/, "");
                        router.push(`/${dynamicPath.substring(1, dynamicPath.length)}`);
                      },
                    });
                  }}
                >
                  <ChevronLeft />
                </Pressable>
              );
            case pathname.match(/\d+\/learningUnits\/new/)?.input:
              return (
                <Pressable
                  onPress={() => {
                    Alert({
                      title: "Änderungen verwerfen?",
                      message:
                        "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                      onPressConfirm: () => {
                        const dynamicPath = pathname.replace(/\/learningUnits\/new/, "/edit");
                        router.push(`/${dynamicPath.substring(1, dynamicPath.length)}`);
                      },
                    });
                  }}
                >
                  <ChevronLeft />
                </Pressable>
              );
            case "/modules/new":
            case pathname.match(/\d+\/edit/)?.input:
              return (
                <Pressable
                  onPress={() => {
                    Alert({
                      title: "Änderungen verwerfen?",
                      message:
                        "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                      onPressConfirm: () => router.push("/(tabs)/modules"),
                    });
                  }}
                >
                  <ChevronLeft />
                </Pressable>
              );
            case "/modules/new/learningUnits":
              return (
                <Pressable
                  onPress={() => {
                    Alert({
                      title: "Änderungen verwerfen?",
                      message:
                        "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                      onPressConfirm: () => router.push("/modules/new"),
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
      <Stack.Screen
        name="index"
        options={{
            headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "default",
        }}
      />
      <Stack.Screen
          name="[id]/edit"
          options={{
              title: "Modul bearbeiten",
              headerTitleAlign: "center",
          }}
      />
      <Stack.Screen
          name="[id]/learningUnits/new"
          options={{
            title: "Lerneinheit hinzufügen",
            headerTitleAlign: "center",
          }}
      />
      <Stack.Screen
        name="[id]/learningSessions/[learningSessionId]/edit"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "default",
        }}
      />
      <Stack.Screen
        name="new/index"
        options={{
          title: "Neues Modul anlegen",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
          name="new/learningUnits"
          options={{
            title: "Lerneinheiten hinzufügen",
            headerTitleAlign: "center",
          }}
      />
      <Stack.Screen
        name="[id]/learningUnits/[learningUnitId]/edit"
        options={{
          title: "Lerneinheit bearbeiten",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
