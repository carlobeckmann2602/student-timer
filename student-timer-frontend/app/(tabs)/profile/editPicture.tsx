import React, {useEffect, useState} from "react";
import {Alert, Dimensions} from "react-native";
import {ScrollView, View} from "@/components/Themed";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import {BASE_STYLES} from "@/constants/Theme";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {H2, H3, H4} from "@/components/StyledText";
import Pressable from "@/components/Pressable";
import { Picker } from "@react-native-picker/picker";
import Button from "@/components/Button";
import { COLORTHEME } from '@/constants/Theme';
import { Text } from '@/components/Themed';
import { useProfilePicture, availableImageNames } from '@/components/profile/useProfilePicture';

const { width } = Dimensions.get('window');

export default function EditPicture() {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);
    const {
        profilePictureName,
        setProfilePictureName,
        imagePath,
        setImagePath,
        getImagePath, getProfilePictureName ,

    } = useProfilePicture();
    const [error, setError] = useState("");

    useEffect(() => {
        setImagePath(getImagePath(profilePictureName));
    }, [profilePictureName]);

    const handleImageNameChange = (imageName: string) => {
        setProfilePictureName(imageName);
        setImagePath(getImagePath(imageName));
        setIsChanged(true);
    };

    const changePicture = async () => {
        let id = toast.show("Speichern...", { type: "loading" });
        const result = await onChangePicture!(profilePictureName);
        if (result && result.error) {
            setError(result.msg);
            toast.update(id, result.msg, { type: "danger" });
        } else {
            toast.update(id, "Profilbild erfolgreich geändert", { type: "success" });
            router.push("/profile/");
        }
    };

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
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
        <ScrollView contentContainerStyle={{ borderRadius: BASE_STYLES.borderRadius }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ProfilePicture imagePath={imagePath} editMode={true} />
                <H3>Profilbild ändern</H3>
                <Text>Pfad:{imagePath}</Text>
                <View style={{marginVertical: 40}}>
                    <H4>Bildauswahl</H4>
                    <Picker
                        style={{ width: width * 0.5 }}
                        selectedValue={profilePictureName}
                        onValueChange={(itemValue) => handleImageNameChange(itemValue)}
                    >
                        {availableImageNames.map((imageName, index) => (
                            <Picker.Item key={index} label={imageName} value={imageName} />
                        ))}
                    </Picker>
                </View>
                <Button
                    text="Speichern"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor={COLORTHEME.light.grey2}
                    onPress={changePicture}
                    style={{ width: 200 }}
                    disabled={!isChanged}
                />
                <Pressable
                    text={"Abbrechen"}
                    ariaLabel={"Abbrechen"}
                    accessibilityRole={"button"}
                    onPress={onCancel}
                />
            </View>
        </ScrollView>
    );
}

