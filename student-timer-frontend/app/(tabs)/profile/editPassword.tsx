import React, { useState } from "react";
import { Image, StyleSheet, Alert } from "react-native";
import { View, ScrollView } from "@/components/Themed";
import { useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";
import { User2 } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/userInput/PasswordInput";
import { useToast } from "react-native-toast-notifications";

export default function EditPassword() {

    const toast = useToast();
    const { onChangePassword, authState } = useAuth();
    const router = useRouter();


    const [isChanged, setIsChanged] = useState(false);

    const [userPassword, setUserPassword] = useState("");
    const [userCheckPassword, setUserCheckPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");


    {/* Profilbilder */}
    const defaultPictureName="profile-picture.jpg";
    const profilePictureBasePath = "../../../assets/images/profile/";

    const userProfilePicture = authState?.user.profilePicture || defaultPictureName;
    const [profilePicture, setProfilePicture] = useState<string>(userProfilePicture);

    const userImagePath = profilePicture === 'empty'
        ? `${profilePictureBasePath}${defaultPictureName}`
        : `${profilePictureBasePath}${profilePicture}`;
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



    const changePassword = async () => {
        if (validatePassword()) {
            const id = toast.show("Speichern...", { type: "loading" });
            const result = await onChangePassword!(
                userPassword,
                userCheckPassword,
            );
            if (result && result.error) {
                setError(result.msg);
                toast.update(id, result.msg, { type: "danger" });
            } else {
                toast.update(id, "Passwort erfolgreich geändert", {
                    type: "success",
                });
                router.push("/profile/");
            }
        } else {
            toast.show("Validierung fehlgeschlagen", { type: "warning" });
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
                {/*Passwort ändern*/}
                <PasswordInput
                    title={"Passwort ändern"}
                    userPassword={userPassword}
                    setUserPassword={handleInputChange(setUserPassword)}
                    userCheckPassword={userCheckPassword}
                    setUserCheckPassword={handleInputChange(setUserCheckPassword)}
                    passwordError={passwordError}
                    buttonAction={changePassword}
                    disabled={!isChanged}
                    cancelAction={onCancel}
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
