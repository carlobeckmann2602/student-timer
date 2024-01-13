import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, ScrollView } from "@/components/Themed";
import { useRouter } from "expo-router";
import { COLORTHEME } from "@/constants/Theme";

import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import ProfilePicturePicker from "@/components/profile/ProfilePicturePicker";

export default function EditPicture() {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);


    const [error, setError] = useState("");


    {/* Profilbilder */}
    const defaultPictureName="profile-picture.jpg";
    const profilePictureBasePath = "../../../assets/images/profile/";

    const userProfilePicture = authState?.user.profilePicture || defaultPictureName;
    const [profilePicture, setProfilePicture] = useState<string>(userProfilePicture);

    const userImagePath = userProfilePicture === 'empty' || null
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

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
    };


    //toDo: das profilePicture muss wahrscheinlich noch gesettet werden - speichert momentan noch nicht.
    const changePicture = async () => {
        let id = toast.show("Speichern...", { type: "loading" });
        const result = await onChangePicture!(
            profilePicture,
        );
        if (result && result.error) {
            setError(result.msg);
            toast.update(id, result.msg, { type: "danger" });
        } else {
            toast.update(id, "Profilbild erfolgreich geändert", {
                type: "success",
            });
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
            <ProfilePicturePicker
                updateOnSelect={changePicture}
                cancelAction={onCancel}
            />
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
