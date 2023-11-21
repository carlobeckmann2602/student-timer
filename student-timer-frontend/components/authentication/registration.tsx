import React, { useState } from "react";
import { useNavigation, Link } from '@react-navigation/native';
import { Text, View } from "@/components/Themed";
import { Image, TouchableOpacity } from 'react-native';
import Button from "@/components/Button";
import Header from "@/components/Header";
import Ionicons from "@/components/Ionicons";
import { COLORTHEME } from "@/constants/Theme";
import { TextInput, StyleSheet } from 'react-native';

export default function Register() {
    const [profileImage, setProfileImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studySubject, setStudySubject] = useState('');
    const [studentID, setStudentID] = useState('');
    const [universityEmail, setUniversityEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const handleRegister = () => {
        // Hier kannst du die Registrierungslogik implementieren
        // Zum Beispiel eine Anfrage an deinen Backend-Server senden
        // und die Antwort überprüfen.
        navigateToHome();
        console.log(`Vorname: ${firstName}, Nachname: ${lastName}, Studienfach: ${studySubject}, Matrikelnummer: ${studentID}, E-Mail: ${universityEmail}, Passwort: ${password}`);
    };

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" as never }] // toDo: das muss irgendwie besser gehen als mit "as never"
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Registrieren</Text>
            <Header title='Student Time Tracker' />

            {/* Profilbild */}
            <TouchableOpacity onPress={() => console.log("Logik zum Hochladen eines Profilbilds")}>
                <View style={styles.profileImageContainer}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <Ionicons name="camera" size={24} color="#000" />
                    )}
                </View>
            </TouchableOpacity>

            {/* Registrierungsformular */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Vorname"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nachname"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Studienfach"
                    onChangeText={(text) => setStudySubject(text)}
                    value={studySubject}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Matrikelnummer"
                    onChangeText={(text) => setStudentID(text)}
                    value={studentID}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Universitäts-E-Mail"
                    onChangeText={(text) => setUniversityEmail(text)}
                    value={universityEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort wiederholen"
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                />
            </View>

            {/* Registrieren-Button */}
            <View style={styles.button}>
                <Button
                    text="Registrieren"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={handleRegister}
                />
            </View>

            {/* Login-Link */}
            <View>
                <Text>
                    <Link to='/login'>Bereits registriert? Hier einloggen</Link>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 24,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#EEEAEA",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    inputContainer: {
        width: 350,
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderRadius: 12,
        backgroundColor: "#EEEAEA",
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        width: 175,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#958AAA",
        padding: 10,
        margin: 5,
    },
});