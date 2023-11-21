import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@/components/Ionicons";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();

    // Daten aus Authentifizierung / Benutzersession ziehen
    const user = {
        firstName: "Maxine",
        lastName: "Hellas",
        studySubject: "Master Medieninformatik",
        profileImage: "@\assets\images\profile-picture.jpg",
    };

    const handleEditProfile = () => {
        // Hier implementiere die Logik für die Profilbearbeitung
        console.log("Profil bearbeiten");
    };

    const handleExportData = () => {
        // Hier implementiere die Logik für den Datenexport
        console.log("Daten exportieren");
    };

    const navigateToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "login" as never }] //toDo: wieder mal das never-Problem
        });
    };

    const handleLogout = () => {
        // Logik für den Logout, Abmeldung von Authentifizierungsdienst
        navigateToLogin();
    };

    return (
        <View style={styles.container}>
            {/* Profilbild */}
            <View style={styles.profileImageContainer}>
                {user.profileImage ? (
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                ) : (
                    <Ionicons name="person-circle-outline" size={100} color="#000" />
                )}
            </View>

            {/* Benutzerinformationen */}
            <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
            <Text>{user.studySubject}</Text>

            {/* Aktionen */}
            <View style={styles.actionContainer}>
                <View style={styles.button}>
                    <Button
                        text="Profil bearbeiten"
                        backgroundColor={COLORTHEME.light.primary}
                        textColor="#FFFFFF"
                        onPress={handleEditProfile}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        text="Daten exportieren"
                        backgroundColor={COLORTHEME.light.primary}
                        textColor="#FFFFFF"
                        onPress={handleExportData}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        text="Logout"
                        backgroundColor={COLORTHEME.light.primary}
                        textColor="#FFFFFF"
                        onPress={handleLogout}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#EEEAEA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    actionContainer: {
        marginTop: 16,
    },
    button: {
        width: 175,
        height: 49.84439468383789,
        borderRadius: 50,
        backgroundColor: COLORTHEME.light.primary,
        padding: 10,
        margin: 5,
    },
    buttontext: {
        textAlign: "center",
        color: "#F6F6F6",
    }
});
