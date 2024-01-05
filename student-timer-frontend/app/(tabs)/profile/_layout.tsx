import { Stack } from "expo-router";
import ConfirmModal from "@/app/(tabs)/profile/confirmModal";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="edit" options={{ headerShown: false }} />
            <Stack.Screen
                name="confirm"
                options={{ headerShown: true, presentation: "modal", animation: "default",}}
            />
        </Stack>
    );
}
