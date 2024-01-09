import { Stack } from "expo-router";

export default function ModulesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
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
    </Stack>
  );
}
