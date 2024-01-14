import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { Stack } from "expo-router";

export default function ModulesLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          paddingVertical: BASE_STYLES.horizontalPadding,
          backgroundColor: COLORTHEME.light.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            paddingVertical: 0,
          },
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
      <Stack.Screen name="[id]/edit" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/learningSessions/[learningSessionId]/edit"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "default",
        }}
      />
      <Stack.Screen name="new/index" options={{ headerShown: false }} />
      <Stack.Screen name="new/learningUnits" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/learningUnits/[learningUnitId]/edit"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
