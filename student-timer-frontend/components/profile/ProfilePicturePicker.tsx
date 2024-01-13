import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { User2 } from 'lucide-react-native';
import { Edit2 } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { COLORTHEME } from '@/constants/Theme';
import { Picker } from "@react-native-picker/picker";
import {H3} from "@/components/StyledText";
import Button from "@/components/Button";
import Pressable from "@/components/Pressable";
import {useToast} from "react-native-toast-notifications";
import {useRouter} from "expo-router";

const { width } = Dimensions.get('window');

type ProfilePicturePickerProps = {
    profilePicture: string;
    setProfilePicture: (value: string) => void;
    updateOnSelect?: (value: string) => void;
    disabled?: boolean;
    cancelAction: (value: string) => void;
};

export default function ProfilePicturePicker({
    profilePicture,
    setProfilePicture,
    updateOnSelect,
    disabled,
    cancelAction,
}: ProfilePicturePickerProps) {

    const toast = useToast();
    const { onChangePicture, authState } = useAuth();
    const router = useRouter();

    const defaultPictureName = 'profile-picture.jpg';
    const profilePictureBasePath = '../../../assets/images/profile/';
    const availableImageNames: string[] = ['profile-picture.jpg', 'phil.jpg', 'mareike.jpg', 'carlo.jpg', 'nils.png', 'konstantin.png', 'alex.jpg', 'random.jpg'];

    const userProfilePictureName: string = availableImageNames.includes(authState?.user.profilePicture ?? '')
        ? authState?.user.profilePicture || ''
        : defaultPictureName;
    const getImagePath = (profilePictureName: string) => {
        const fullPath = profilePictureName === 'empty'
            ? `${profilePictureBasePath}${defaultPictureName}`
            : `${profilePictureBasePath}${profilePictureName}`;

        return fullPath;
    };
    const [imagePath, setImagePath] = useState<string>(getImagePath(userProfilePictureName));
    const [selectedImageName, setSelectedImageName] = useState<string>(userProfilePictureName);
    const [error, setError] = useState("");


    useEffect(() => {
        const imagePath = getImagePath(selectedImageName);
        setImagePath(imagePath);
    }, [selectedImageName]);

    const handleImageNameChange = (imageName: string) => {
        console.log('Selected Image Name:', imageName);
        setSelectedImageName(imageName);
        const newPath = getImagePath(imageName);
        console.log('New Image Path:', newPath);
        setImagePath(newPath);
        setProfilePicture(imageName);
        //console.log("new profile picture", authState?.user.profilePicture);
    };

    const changePicture = async () => {
        let id = toast.show("Speichern...", { type: "loading" });
        console.log("ProfilePicturePicker: selectedImage Name in changePicture)", selectedImageName);
        const result = await onChangePicture!(
            selectedImageName,
        );
        if (result && result.error) {
            setError(result.msg);
            toast.update(id, result.msg, { type: "danger" });
        } else {
            toast.update(id, "Profilbild erfolgreich geändert", {
                type: "success",
            });
            router.push("/profile/");
            console.log("after onChangePicture", authState?.user.profilePicture);
        }
    };

    return (
        <View style={styles.container}>
            <H3>Profilbild ändern</H3>
              <View style={styles.profileImageContainer}>
                {imagePath ? (
                    <Image source={{ uri: imagePath }} style={styles.profileImage} />
                ) : (
                    <User2 size={100} color={COLORTHEME.light.primary} />
                )}
                <TouchableOpacity style={styles.editIcon}>
                    <Edit2 size={24} color={COLORTHEME.light.background} />
                </TouchableOpacity>
            </View>
            <Text>Test {imagePath}</Text>
            <View style={styles.row}>
                <View style={styles.pictureWrapper}>
                    <Text style={styles.inputLabelText}>Bildauswahl</Text>
                    <Picker
                        style={{ width: width * 0.5 }}
                        selectedValue={selectedImageName}
                        onValueChange={(itemValue) => handleImageNameChange(itemValue)}
                    >
                        {availableImageNames.map((imageName, index) => (
                            <Picker.Item key={index} label={imageName} value={imageName} />
                        ))}
                    </Picker>
                </View>
            </View>
            <Button
                text="Speichern"
                backgroundColor={COLORTHEME.light.primary}
                textColor={COLORTHEME.light.grey2}
                onPress={changePicture}
                style={{ width: 200 }}
                disabled={disabled}
            />
            <Pressable
                text={"Abbrechen"}
                accessibilityLabel={"Abbrechen"}
                accessibilityRole={"button"}
                onPress={cancelAction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        width: "100%",
    },
    pictureWrapper: {
        width: '30%',
        marginRight: 10,
    },
    inputLabelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EEEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: COLORTHEME.light.primary,
        borderWidth: 5,
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
});
