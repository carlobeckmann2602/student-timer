import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

const defaultPictureName = 'random.jpg';
const profilePictureBasePath = '../../assets/images/profile/';
export const availableImageNames: string[] = ['profile-picture.jpg', 'phil.jpg', 'mareike.jpg', 'carlo.jpg', 'nils.png', 'konstantin.png', 'alex.jpg', 'random.jpg'];

export interface ProfileImages {
    [key: string]: any;
}

export const profileImages: ProfileImages = {
    "alex.jpg": require(`${profilePictureBasePath}alex.jpg`),
    "konstantin.png": require(`${profilePictureBasePath}konstantin.png`),
    "phil.jpg": require(`${profilePictureBasePath}phil.jpg`),
    "mareike.jpg": require(`${profilePictureBasePath}mareike.jpg`),
    "carlo.jpg": require(`${profilePictureBasePath}carlo.jpg`),
    "nils.png": require(`${profilePictureBasePath}nils.png`),
    "random.jpg": require(`${profilePictureBasePath}random.jpg`),
    "default.jpg": require(`${profilePictureBasePath}${defaultPictureName}`),
    "profile-picture.jpg": require(`${profilePictureBasePath}profile-picture.jpg`),
    null: require(`${profilePictureBasePath}${defaultPictureName}`),
};


export const useProfilePicture = () => {
    const { authState } = useAuth();

    const getProfilePictureName = () => {
        const userPicture = authState?.user.profilePicture || '' ;
        return profileImages[userPicture] ? userPicture : defaultPictureName;
    };

    const getImagePath = (profilePictureName: string) => {
        return profileImages[profilePictureName] || profileImages[defaultPictureName];
    };

    const [profilePictureName, setProfilePictureName] = useState<string>(getProfilePictureName());
    const [imagePath, setImagePath] = useState<string>(getImagePath(getProfilePictureName()));

    return { profilePictureName, setProfilePictureName, imagePath, setImagePath, getImagePath, getProfilePictureName };
};

