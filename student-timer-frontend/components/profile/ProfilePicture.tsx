import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { User2 } from 'lucide-react-native';
import { Edit2 } from 'lucide-react-native';
import { COLORTHEME } from '@/constants/Theme';

type ProfilePictureProps = {
    imagePath: string;
    editMode?: boolean;
    style?: object;
};

export default function ProfilePicture({
                                           imagePath,
                                           editMode=false,
                                           style
}:  ProfilePictureProps)  {
    return (
        <View style={[styles.profileImageContainer, style]}>
            {imagePath ? (
                <Image source={{ uri: imagePath }} style={styles.profileImage} />
            ) : (
                <User2 size={100} color={COLORTHEME.light.primary} />
            )}
            {editMode && (
                <View style={styles.editIcon}>
                    <Edit2 size={24} color={COLORTHEME.light.background} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EEEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
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
