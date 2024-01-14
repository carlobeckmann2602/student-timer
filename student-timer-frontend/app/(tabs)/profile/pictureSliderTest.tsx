import React, { useEffect, useState } from "react";
import {Alert, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import { ScrollView, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { BASE_STYLES } from "@/constants/Theme";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {H3, H4, P} from "@/components/StyledText";
import Pressable from "@/components/Pressable";
import { Picker } from "@react-native-picker/picker";
import Button from "@/components/Button";
import { COLORTHEME } from '@/constants/Theme';
import { Text } from '@/components/Themed';
import { useProfilePicture, availableImageNames } from '@/components/profile/useProfilePicture';
import ProfilePictureSlider from "@/components/profile/ProfilePictureSlider";
import ProfilePictureSelection from "@/components/profile/ProfilePictureSelection";

const { width } = Dimensions.get('window');

export default function PictureSliderTest() {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);
    const {
        profilePictureName,
        setProfilePictureName,
        imagePath,
        setImagePath,
        getImagePath,
        getProfilePictureName,
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
        <View style={{ borderRadius: BASE_STYLES.borderRadius }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ProfilePicture imagePath={imagePath} editMode={true} />
                <H3>Profilbild ändern</H3>
                <Text>Pfad:{imagePath}</Text>
                <View style={{marginVertical: 40}}>
                    <H4>Bildauswahl</H4>
                    <View style={{width: width, alignItems: 'center', justifyContent: 'center' }}>
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
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <P>ProfilePictureSelection</P>
                        <ProfilePictureSelection/>
                    </View>
                    <View style={{width: width}}>
                        <ProfilePictureSlider
                            availableImages={availableImageNames}
                            onSelect={handleImageNameChange}
                            getImagePath={getImagePath}
                        />
                    </View>
                        <View style={styles.row}>
                        <View style={styles.colorWrapper}>
                            <P style={styles.inputLabelText}>Bildauswahl</P>
                            <FlatList
                                style={{ width: "100%" }}
                                columnWrapperStyle={{
                                    justifyContent: "space-between",
                                }}
                                contentContainerStyle={{ gap: 20 }}
                                data={availableImageNames}
                                numColumns={4}
                                renderItem={({ item: imageName }) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.colorOptionWrapper}
                                            onPress={() => setImagePath(imageName)}
                                            key={imageName}
                                        >
                                            <View
                                                style={[
                                                    styles.colorOptionIndicator,
                                                ]}
                                            />
                                            <View
                                                style={[styles.colorOption, { backgroundColor: 'green' }]}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    </View>
                    <View>
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
                </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "column",
        gap: 24,
        backgroundColor: COLORTHEME.light.background,
    },
    scrollViewContainerStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
    section: {
        width: "100%",
        gap: 12,
        backgroundColor: "transparent",
    },
    flatListContainer: {
        gap: 12,
    },
    outerWrapper: {
        width: "100%",
        backgroundColor: COLORTHEME.light.grey1,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        gap: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        gap: 16,
    },
    dateRowContainer: {
        gap: 5,
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    buttons: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
    },
    colorWrapper: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: "transparent",
        gap: 4,
    },
    inputLabelText: {
        color: COLORTHEME.light.primary,
    },
    colorOptionWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
    },
    colorOptionIndicator: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -26 }, { translateY: -26 }],
        width: 52,
        height: 52,
        backgroundColor: "transparent",
        borderRadius: 1000,
        borderWidth: 4,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 1000,
    },
});

