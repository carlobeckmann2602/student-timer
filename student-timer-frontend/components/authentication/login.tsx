import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Ionicons from "@/components/Ionicons";
import { COLORTHEME } from "@/constants/Theme";
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Hier kannst du die Authentifizierungslogik implementieren
        // Zum Beispiel eine Anfrage an deinen Backend-Server senden
        // und die Antwort überprüfen.
        navigateToHome;
        console.log(`Benutzername: ${username}, Passwort: ${password}`);
    };

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" as never }] // toDo: das muss irgendwie besser gehen als mit "as never"
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Header title='Student Time Tracker' />
            <TextInput
                style={styles.input}
                placeholder="Benutzername"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Passwort"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <View style={styles.button}>
                <Button
                    text="Login (console)"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={handleLogin}
                />
            </View>
            <View style={styles.button}>
                <Button
                    text="Home"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={navigateToHome}
                />
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
    input: {
        width: 350,
        height: 50,
        borderRadius: 12,
        backgroundColor: "#EEEAEA",
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        width: 175,
        height: 49.84439468383789,
        borderRadius: 50,
        backgroundColor: "#958AAA",
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Login;
