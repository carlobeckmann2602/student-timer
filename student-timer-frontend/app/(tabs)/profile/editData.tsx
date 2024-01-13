import React, { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { View} from "@/components/Themed";
import { useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";
import { User2 } from "lucide-react-native";
import { Edit2 } from 'lucide-react-native';
import { useAuth } from "@/context/AuthContext";
import UserDetailsInput from "@/components/userInput/UserDetailsInput";
import Pressable from "@/components/Pressable";
import { useToast } from "react-native-toast-notifications";

export default function EditData() {

    const toast = useToast();
    const { onUpdate, onRemove, authState } = useAuth();
    const router = useRouter();


    const [isChanged, setIsChanged] = useState(false);

    const [userName, setUserName] = useState(authState?.user.name || "");
    const [userStudyCourse, setUserStudyCourse] = useState(authState?.user.studyCourse || "");
    const [userEmail, setUserEmail] = useState(authState?.user.email || "");

    const [nameError, setNameError] = useState("");
    const [studyCourseError, setStudyCourseError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");


    {/* Profilbilder */}
    const defaultPictureName="profile-picture.jpg";
    const profilePictureBasePath = "../../../assets/images/profile/";

    const userProfilePicture = authState?.user.profilePicture || defaultPictureName;
    const [profilePicture, setProfilePicture] = useState<string>(userProfilePicture);

    const userImagePath = userProfilePicture === 'empty'
        ? `${profilePictureBasePath}${defaultPictureName}`
        : `${profilePictureBasePath}${userProfilePicture}`;
    const [imagePath, setImagePath] = useState<string>(userImagePath);



    console.log("#### useState:", userProfilePicture, typeof userProfilePicture);
    console.log("authState?.user.profilePicture", authState?.user.profilePicture, typeof authState?.user.profilePicture);
    console.log("imagePath", imagePath);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (value: string) => {
            setter(value);
            setIsChanged(true);
        };
    };

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
        return (nameValid && studyCourseValid && emailValid);
    };

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
    };

    const update = async () => {
        if (validateInput()) {
            const id = toast.show("Speichern...", { type: "loading" });
            const result = await onUpdate!(
                userName,
                userStudyCourse,
                userProfilePicture,
                userEmail,
            );
            console.log("validateInput");
            if (result && result.error) {
                setError(result.msg);
                toast.update(id, result.msg, { type: "danger" });
            } else {
                toast.update(id, "Profildaten erfolgreich gespeichert", {
                    type: "success",
                });
                router.push("/profile/");
            }
        } else {
            toast.show("Validierung fehlgeschlagen", { type: "warning" });
        }
    };


    const removeUser = async () => {
        console.log("User removed:", authState?.user.email)
        let id = toast.show("Löschen...", { type: "loading" });
        if (authState?.user.id) {
            const result = await onRemove!(
                authState?.user.id
            );
            console.log("remove")
            if (result && result.error) {
                setError(result.msg);
            } else {
                toast.update(id, "Ihr Konto wurde erfolgreich gelöscht", { type: "success" });
                router.push("/(auth)/signup");
            }
        }
    };

    const onCancel = () => {
        if (isChanged) {
            console.log("Alert für Änderung verwerfen aktiviert:", authState?.user.email)
            Alert.alert(
                "Änderungen verwerfen?",
                `Sie haben ungespeicherte Änderungen vorgenommen. Wenn Sie fortfahren, gehen alle ungespeicherten Daten verloren. Möchten Sie wirklich abbrechen?`,
                [
                    {
                        text: "Nein",
                        onPress: () => console.log("Alert closed"),
                        style: "cancel",
                    },
                    {
                        text: "Ja",
                        onPress: () => {
                            cancel();
                        },
                        style: "destructive",
                    },
                ],
                { cancelable: false }
            );
        } else {
            cancel();
        }
    };

    const onDelete = () => {
        console.log("Alert für User-Löschung aktiviert:", authState?.user.email)
        Alert.alert(
            "Profil wirklich löschen?",
            `Möchtest du deinen Account mit der E-Mail-Adresse "${authState?.user.email}" wirklich unwiderruflich löschen? Alle zum Profil gehörenden Daten, Module, Lerneinheiten und Trackings werden dabei gelöscht.`,
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
            <View style={{ alignItems: "center" }}>
                <View style={styles.profileImageContainer}>
                    {imagePath ? (
                        <Image source={{ uri: imagePath }} style={styles.profileImage} />
                    ) : (
                        <User2 size={100} color={COLORTHEME.light.primary} />
                    )}
                </View>
            </View>
            {/*Benutzerinformationen bearbeiten*/}
            <View>
                <UserDetailsInput
                    title={"Daten bearbeiten"}
                    userName={userName}
                    setUserName={handleInputChange(setUserName)}
                    nameError={nameError}
                    userStudyCourse={userStudyCourse}
                    setUserStudyCourse={handleInputChange(setUserStudyCourse)}
                    studyCourseError={studyCourseError}
                    userEmail={userEmail}
                    setUserEmail={handleInputChange(setUserEmail)}
                    emailError={emailError}
                    buttonAction={update}
                    disabled={!isChanged}
                    cancelAction={onCancel}
                />
            </View>
            {/*Löschen*/}
            <View style={styles.actionContainer}>
                <Pressable
                    text={"Konto löschen"}
                    textColor={'#F00'}
                    accessibilityLabel={"Konto löschen"}
                    accessibilityRole={"button"}
                    onPress={onDelete}
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
        marginBottom: 40,
    },
    row: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 16,
    },
});
