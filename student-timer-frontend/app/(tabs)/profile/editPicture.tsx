import React, { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { ScrollView, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { BASE_STYLES, COLORS } from "@/constants/Theme";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {H3, H4} from "@/components/StyledText";
import Button from "@/components/Button";
import { COLORTHEME } from '@/constants/Theme';
import {profileImages, useProfilePicture} from '@/components/profile/useProfilePicture';
import ProfilePictureSlider from "@/components/profile/ProfilePictureSlider";

export default function EditPicture() {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);
    const {
        profilePictureName,
        setProfilePictureName,
        setImagePath,
        getImagePath,
    } = useProfilePicture();
    const [, setError] = useState("");

    useEffect(() => {
        setImagePath(getImagePath(profilePictureName));
    }, [profilePictureName]);

    const handleImageNameChange = (imageName: string) => {
        setProfilePictureName(imageName);
        setImagePath(imageName);
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
            Alert({
                title: "Änderungen verwerfen?",
                message: "Du hast dein Profilbild geändert. Wenn Du fortfährst, gehen alle ungespeicherten Änderungen verloren. Möchten Du die Änderung wirklich verwerfen?",
                onPressConfirm: cancel,
            });
        } else {
            cancel();
        }
    };

    return (
        <ScrollView contentContainerStyle={{ borderRadius: BASE_STYLES.borderRadius }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ProfilePicture imageName={profilePictureName} />
                <H3>Profilbild ändern</H3>
                <View style={{marginVertical: 20}}>
                    <H4>Bildauswahl</H4>
                    <View style={{marginTop: 5}}>
                        <ProfilePictureSlider
                            profileImages={profileImages}
                            onSelect={handleImageNameChange}
                        />
                    </View>
                </View>
                <View style={{gap: 15}}>
                    <Button
                        text="Speichern"
                        backgroundColor={COLORTHEME.light.primary}
                        textColor={COLORTHEME.light.grey2}
                        onPress={changePicture}
                        style={{ width: 200 }}
                        disabled={!isChanged}
                    />
                    <Button
                        text="Abbrechen"
                        backgroundColor={COLORS.white}
                        borderColor={COLORTHEME.light.primary}
                        textColor={COLORTHEME.light.grey3}
                        style={{ width: 200 }}
                        onPress={onCancel}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
