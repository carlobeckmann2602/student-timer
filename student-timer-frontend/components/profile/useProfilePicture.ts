import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

const defaultPictureName = 'profile-picture.jpg';
const profilePictureBasePath = '../../../assets/images/profile/';
const availableImageNames: string[] = ['profile-picture.jpg', 'phil.jpg', 'mareike.jpg', 'carlo.jpg', 'nils.png', 'konstantin.png', 'alex.jpg', 'random.jpg'];

export const useProfilePicture = () => {
    const { authState } = useAuth();

    const getProfilePictureName = () => {
        return availableImageNames.includes(authState?.user.profilePicture ?? '')
            ? authState?.user.profilePicture || ''
            : defaultPictureName;
    };

    const getImagePath = (profilePictureName: string) => {
        const fullPath = profilePictureName === 'empty'
            ? `${profilePictureBasePath}${defaultPictureName}`
            : `${profilePictureBasePath}${profilePictureName}`;
        return fullPath;
    };

    const [profilePictureName, setProfilePictureName] = useState<string>(getProfilePictureName());
    const [imagePath, setImagePath] = useState<string>(getImagePath(getProfilePictureName()));

    return { profilePictureName, setProfilePictureName, imagePath, setImagePath, getImagePath, getProfilePictureName };
};
