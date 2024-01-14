import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="editData" options={{ headerShown: false }} />
            <Stack.Screen name="editPassword" options={{ headerShown: false }} />
            <Stack.Screen name="editPicture" options={{ headerShown: false }} />
            <Stack.Screen name="pictureSliderTest" options={{ headerShown: false }} />
        </Stack>
    );
}
