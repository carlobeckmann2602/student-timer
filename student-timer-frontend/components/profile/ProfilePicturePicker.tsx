import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';
import { Text } from '@/components/Themed';
import { User2 } from 'lucide-react-native';
import { Edit2 } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { COLORTHEME } from '@/constants/Theme';
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get('window');

const ProfilePicturePicker = () => {
    const { authState } = useAuth();

    const defaultPictureName = 'profile-picture.jpg';
    const profilePictureBasePath = '../../../assets/images/profile/';
    const userProfilePictureName = authState?.user.profilePicture || defaultPictureName;
    const getImagePath = (profilePictureName: string) => {
        const fullPath = userProfilePictureName === 'empty'
            ? `${profilePictureBasePath}${defaultPictureName}`
            : `${profilePictureBasePath}${userProfilePictureName}`;

        return fullPath;
    };
    const [imagePath, setImagePath] = useState<string>(getImagePath(userProfilePictureName));
    const [selectedImageName, setSelectedImageName] = useState<string>(userProfilePictureName);
    const availableImageNames: string[] = ['profile-picture.jpg', 'phil.jpg', 'mareike.jpg', 'carlo.jpg', 'nils.png', 'konstantin.png'];

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
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.pictureWrapper}>
                    <Text style={styles.inputLabelText}>Bildauswahl</Text>
                    <Picker
                        style={{ width: width * 0.7 }}
                        selectedValue={selectedImageName}
                        onValueChange={(itemValue) => handleImageNameChange(itemValue)}
                    >
                        {availableImageNames.map((imageName, index) => (
                            <Picker.Item key={index} label={imageName} value={imageName} />
                        ))}
                    </Picker>
                </View>
                <View style={{ width: '70%', backgroundColor: 'transparent' }} />
            </View>
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

export default ProfilePicturePicker;
