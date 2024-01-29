import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerTitle: "Index", headerTitleAlign: "center" }} />
            <Stack.Screen name="editData" options={{ headerTitle: "Bearbeiten", headerTitleAlign: "center"  }} />
            <Stack.Screen name="editPassword" options={{ headerTitle: "Passwort", headerTitleAlign: "center"  }} />
            <Stack.Screen name="editPicture" options={{ headerTitle: "Bild", headerTitleAlign: "center"  }} />
        </Stack>
    );
}
