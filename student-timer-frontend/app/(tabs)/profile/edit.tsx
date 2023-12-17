import React, { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { View, Text } from "@/components/Themed";
import { Link, router, useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";
import Button from "@/components/Button";
import { User2 } from "lucide-react-native";
import { Edit2 } from 'lucide-react-native';
import UserDetailsInput from "@/components/UserDetailsInput";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { ConfirmModal } from "@/app/(tabs)/profile/confirm";


export default function Edit() {

    const { onUpdate, onRemove, authState } = useAuth();

    const router = useRouter();

    const defaultPic = require("../../../assets/images/profile/profile-picture.jpg");

    const [userName, setUserName] = useState(authState?.user.name || "");
    const [userStudyCourse, setUserStudyCourse] = useState(authState?.user.studyCourse || "");
    const [userEmail, setUserEmail] = useState(authState?.user.email || "");

    const [nameError, setNameError] = useState("");
    const [studyCourseError, setStudyCourseError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");

    const [RemoveModalVisible, setRemoveModalVisible] = useState(false);


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

    const removeUser = async () => {
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

    const removeUserConfirmation = async () => {
        if (authState?.user.id) {
            console.log("removeUserConfirmation");
            console.log("UserId: " + authState?.user.id)
            setRemoveModalVisible(true);
        }
    };

    const testModal = () => {
        router.push({
            pathname: "/profile/confirmModal",
            params: {
                title: "Konto löschen",
                message: "Möchtest du dein Konto wirklich löschen?",
            }

        });
    };

    /*
    // ToDo: Alert funktioniert angeblich nur in App, nicht im Web
    const removeUserAlert = async () => {
        if (authState?.user.id) {
            console.log("removeUserTest");
            console.log("UserId: " + authState?.user.id)
            confirmAction(
                "Konto löschen",
                "Möchtest du dein Konto wirklich löschen?",
                async () => {
                    if (authState?.user.id) {
                        const result = await onRemove!(authState.user.id);
                        if (result && result.error) {
                            console.log("remove error")
                            setError(result.msg);
                        } else {
                            console.log("remove router")
                            router.push("/(auth)/signup");
                        }
                    }
                }
            );
        }
    };
 
    const confirmAction = (title: string, message: string, onConfirm: () => void) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Nein",
                    style: "cancel"
                },
                {
                    text: "Ja",
                    onPress: onConfirm
                }
            ]
        );
    };
    */

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
            />
            <View style={styles.actionContainer}>
                <Button
                    text="Speichern"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor={COLORTHEME.light.grey2}
                    onPress={update}
                    style={{ width: 200 }}
                />
                <Button
                    text="Abbrechen"
                    backgroundColor={COLORTHEME.light.grey3}
                    textColor="#FFFFFF"
                    onPress={cancel}
                    style={{ width: 200 }}
                />
                <Button
                    text="Konto (sofort) löschen"
                    backgroundColor={COLORTHEME.light.grey3}
                    textColor="#FFFFFF"
                    onPress={removeUser}
                    style={{ width: 200 }}
                />
                <Button
                    text="Modal-Test"
                    backgroundColor={COLORTHEME.light.grey3}
                    textColor="#FFFFFF"
                    onPress={testModal}
                    style={{ width: 200 }}
                />
            </View>
            <ConfirmModal
                title="Konto löschen"
                message="Möchtest du dein Konto wirklich löschen?"
                onConfirm={async () => {
                    await removeUser();
                }
                }
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
