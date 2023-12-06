import { Stack } from "expo-router";

export default function TrackingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "default",
        }}
      />
    </Stack>
  );
}
