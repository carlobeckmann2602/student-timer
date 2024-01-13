import React, { useState } from "react";
import { Alert } from "react-native";
import {ScrollView, View} from "@/components/Themed";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import ProfilePicturePicker from "@/components/profile/ProfilePicturePicker";
import {BASE_STYLES} from "@/constants/Theme";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {H3} from "@/components/StyledText";

export default function EditPicture() {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);

    const [error, setError] = useState("");

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
            router.push("/profile/");
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
        <ScrollView contentContainerStyle={{borderRadius: BASE_STYLES.borderRadius}}>
            <View style={{ alignItems: "center" }}>
                <ProfilePicture imagePath={imagePath} editMode={true}/>
            </View>
            <H3>Profilbild ändern</H3>
            <ProfilePicturePicker
                profilePicture={profilePicture}
                setProfilePicture={handleInputChange(setProfilePicture)}
                updateOnSelect={changePicture}
                disabled={!isChanged}
                cancelAction={onCancel}
            />
        </ScrollView>
    )
}
