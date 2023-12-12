import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {useRouter} from "expo-router";
import {COLORTHEME} from "@/constants/Theme";
import Button from "@/components/Button";

export default function Edit() {

    const router = useRouter();

    const handleCancel = () => {
        router.push("/profile/");
        console.log("Profil bearbeiten");
    };
    return (
        <View>
            <Text>Edit Profile (: </Text>
            <Button
                text="Abbrechen"
                backgroundColor={COLORTHEME.light.primary}
                textColor="#FFFFFF"
                onPress={handleCancel}
            />
        </View>
    );
}
