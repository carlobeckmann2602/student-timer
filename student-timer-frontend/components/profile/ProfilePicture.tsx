import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import { User2 } from 'lucide-react-native';
import { Edit2 } from 'lucide-react-native';
import { COLORTHEME } from '@/constants/Theme';
import { profileImages, defaultPictureName } from "@/components/profile/useProfilePicture";

type ProfilePictureProps = {
    imageName: string;
    editStyle?: boolean;
    style?: object;
    onPress?: () => void;
};

export default function ProfilePicture({
    imageName,
    editStyle = false,
    onPress,
}: ProfilePictureProps) {

    const imagePath = profileImages[imageName] || profileImages[defaultPictureName];
    const ariaLabel = onPress
        ? "Profilbild ändern"
        : "Aktuelles Profilbild";
    const role = onPress
        ? "button"
        : "img"

    return (

        <View style={styles.profileImageContainer}>
            <Pressable
                onPress={onPress}
                aria-label={ariaLabel}
                role={role}
            >
            {imagePath ? (
                <Image source={imagePath} style={styles.profileImage} aria-label={"Aktuelles Profilbild"} />
            ) : (
                <User2 size={100} color={COLORTHEME.light.primary} aria-label={"Standard-Profilbild"} />
            )}
            {editStyle && (
                <View style={styles.editIcon}>
                    <Edit2 size={24} color={COLORTHEME.light.background} />
                </View>
            )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImageContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#EEEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
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
