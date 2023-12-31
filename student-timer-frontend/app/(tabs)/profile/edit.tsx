import React, { useState } from "react";
import {Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Text} from "react-native";
import { View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";
import Button from "@/components/Button";
import { User2 } from "lucide-react-native";
import { Edit2 } from 'lucide-react-native';
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import UserDetailsInput from "@/components/userInput/UserDetailsInput";
import PasswordInput from "@/components/userInput/PasswordInput";
export default function Edit() {

    const { onUpdate, onRemove, onChangePassword, authState } = useAuth();
    const router = useRouter();

    const defaultPic = require("../../../assets/images/profile/profile-picture.jpg");

    const [userName, setUserName] = useState(authState?.user.name || "");
    const [userStudyCourse, setUserStudyCourse] = useState(authState?.user.studyCourse || "");
    const [userEmail, setUserEmail] = useState(authState?.user.email || "");
    const [userPassword, setUserPassword] = useState("");
    const [userCheckPassword, setUserCheckPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [studyCourseError, setStudyCourseError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");

    const validateInput = () => {
        let nameValid = false;
        if (userName.length == 0) {
            setNameError("Name ist erforderlich");
        } else {
            setNameError("");
            nameValid = true;
        }

        let studyCourseValid = false;
        if (userStudyCourse.length == 0) {
            setStudyCourseError("Studienfach ist erforderlich");
        } else {
            setStudyCourseError("");
            studyCourseValid = true;
        }

        let emailValid = false;
        if (userEmail.length == 0) {
            setEmailError("E-Mail ist erforderlich");
        } else if (userEmail.length < 6) {
            setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
        } else if (userEmail.indexOf(" ") >= 0) {
            setEmailError("E-Mail kann keine Leerzeichen enthalten");
        } else {
            setEmailError("");
            emailValid = true;
        }

        if (nameValid && studyCourseValid && emailValid) {
            return true;
        }

        return false;
    };

    const validatePassword = () => {
        let passwordValid = false;
        if (userPassword.length == 0) {
            setPasswordError("Passwort ist erforderlich");
        } else if (userPassword.length < 6) {
            setPasswordError("Das Passwort sollte mindestens 6 Zeichen lang sein");
        } else if (userPassword.indexOf(" ") >= 0) {
            setPasswordError("Passwort kann keine Leerzeichen enthalten");
        } else if (userPassword != userCheckPassword) {
            setPasswordError("Passwörter stimmen nicht überein");
        } else {
            setPasswordError("");
            passwordValid = true;
        }
        return passwordValid;
    }

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
    };

    const update = async () => {
        if (validateInput()) {
            const result = await onUpdate!(
                userName,
                userStudyCourse,
                userEmail,
            );
            console.log("validateInput")
            if (result && result.error) {
                console.log("error")
                setError(result.msg);
            } else {
                console.log("router")
                router.push("/profile/");
            }
        }
    };

    const changePassword = async () => {
        if (validatePassword()) {
            const result = await onChangePassword!(
                userPassword,
                userCheckPassword,
            );
            console.log("validatePassword")
            if (result && result.error) {
                console.log("error")
                setError(result.msg);
            } else {
                console.log("router")
                router.push("/profile/");
            }
        }
    };

    const removeUser = async () => {
        console.log("User removed:" , authState?.user.email)
        if (authState?.user.id) {
            const result = await onRemove!(
                authState?.user.id
            );
            console.log("remove")
            if (result && result.error) {
                console.log("error")
                setError(result.msg);
            } else {
                console.log("router")
                router.push("/(auth)/signup");
            }
        }
    };

    const onDelete = () => {
        console.log("Alert für User-Löschung aktiviert:", authState?.user.email)
        Alert.alert(
            "Profil wirklich löschen?",
            `Möchtest du deinen Account mit der E-Mail-Adresse "${authState?.user.email}" wirklich unwideruflich löschen? Alle zum Profil gehörenden Daten, Module, Lerneinheiten und Trackings werden dabei gelöscht.`,
            [
                {
                    text: "Abbrechen",
                    onPress: () => console.log("Alert closed"),
                    style: "cancel",
                },
                {
                    text: "Löschen",
                    onPress: () => {
                        removeUser();
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };

return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* Profilbild */}
            <View style={{alignItems: "center"}}>
                <View style={styles.profileImageContainer}>
                    {defaultPic ? (
                        <Image source={defaultPic} style={styles.profileImage} />
                    ) : (
                        <User2 size={100} color={COLORTHEME.light.primary} />
                    )}
                    <TouchableOpacity style={styles.editIcon}>
                        <Edit2 size={24} color={COLORTHEME.light.background} />
                    </TouchableOpacity>
                </View>
            </View>
            {/*Benutzerinformationen bearbeiten*/}
            <View>
                <Header title="Profil bearbeiten"></Header>
                <UserDetailsInput
                    userName={userName}
                    setUserName={setUserName}
                    nameError={nameError}
                    userStudyCourse={userStudyCourse}
                    setUserStudyCourse={setUserStudyCourse}
                    studyCourseError={studyCourseError}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    emailError={emailError}
                    buttonAction={update}
                    cancelAction={cancel}
                />
                {/*Passwort ändern*/}
                <PasswordInput
                    userPassword={userPassword}
                    setUserPassword={setUserPassword}
                    userCheckPassword={userCheckPassword}
                    setUserCheckPassword={setUserCheckPassword}
                    passwordError={passwordError}
                    buttonAction={changePassword}
                    cancelAction={cancel}
                />
            </View>
            {/*Löschen*/}
            <View style={styles.actionContainer}>
                <Button
                    text="Konto löschen"
                    backgroundColor={'transparent'}
                    textColor={'#F00'}
                    onPress={onDelete}
                    style={{ width: 200 }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORTHEME.light.background,
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
        borderColor: COLORTHEME.light.primary,
        borderWidth: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        marginTop: 20,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 60,
        backgroundColor: COLORTHEME.light.primary,
        borderColor: COLORTHEME.light.primary,
        borderWidth: 6,
    },
    row: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 16,
    },
});
