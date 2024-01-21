import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

export const defaultPictureName = 'gelb2.jpg';
const profilePictureBasePath = '../../assets/images/profile/';
export interface ProfileImages {
    [key: string]: any;
}

export const profileImages: ProfileImages = {
    "agata.jpg": require(`${profilePictureBasePath}agata.jpg`),
    "elephant.jpg": require(`${profilePictureBasePath}elephant.jpg`),
    "rot.jpg": require(`${profilePictureBasePath}rot.jpg`),
    "aquarell.jpg": require(`${profilePictureBasePath}aquarell.jpg`),
    "random.jpg": require(`${profilePictureBasePath}random.jpg`),
    "ken.jpg": require(`${profilePictureBasePath}ken.jpg`),
    "genie.jpg": require(`${profilePictureBasePath}genie.jpg`),
    "apfel.jpg": require(`${profilePictureBasePath}apfel.jpg`),
    "schwarzweiß2.jpg": require(`${profilePictureBasePath}schwarzweiß2.jpg`),
    "drache.jpg": require(`${profilePictureBasePath}drache.jpg`),
    "newyork.jpg": require(`${profilePictureBasePath}newyork.jpg`),
    "regenschirm.jpg": require(`${profilePictureBasePath}regenschirm.jpg`),
    "muster_orange.jpg": require(`${profilePictureBasePath}muster_orange.jpg`),
    "monster.jpg": require(`${profilePictureBasePath}monster.jpg`),
    "gelb2.jpg": require(`${profilePictureBasePath}gelb2.jpg`),
    "random1.jpg": require(`${profilePictureBasePath}random1.jpg`),
    "punk_lieb.jpg": require(`${profilePictureBasePath}punk_lieb.jpg`),
    "schwarzweiß.jpg": require(`${profilePictureBasePath}schwarzweiß.jpg`),
    "muster_gelb.jpg": require(`${profilePictureBasePath}muster_gelb.jpg`),
    "maxine.jpg": require(`${profilePictureBasePath}maxine.jpg`),
    "grün.jpg": require(`${profilePictureBasePath}grün.jpg`),
    "random2.jpg": require(`${profilePictureBasePath}random2.jpg`),
    "punk_wuetend.jpg": require(`${profilePictureBasePath}punk_wuetend.jpg`),
    "punk_gechilled.jpg": require(`${profilePictureBasePath}punk_gechilled.jpg`),
    "gelb.jpg": require(`${profilePictureBasePath}gelb.jpg`),
    "nico.jpg": require(`${profilePictureBasePath}nico.jpg`),
    "wueste.jpg": require(`${profilePictureBasePath}wueste.jpg`),
    "tiger.jpg": require(`${profilePictureBasePath}tiger.jpg`),
    "lila.jpg": require(`${profilePictureBasePath}lila.jpg`),
    "robby.jpg": require(`${profilePictureBasePath}robby.jpg`),
    "picasso.jpg": require(`${profilePictureBasePath}picasso.jpg`),
    "papierschlacht.jpg": require(`${profilePictureBasePath}papierschlacht.jpg`),
    "muster_lila.jpg": require(`${profilePictureBasePath}muster_lila.jpg`),
    "nerd.jpg": require(`${profilePictureBasePath}nerd.jpg`),
    "abstrakt.jpg": require(`${profilePictureBasePath}abstrakt.jpg`),
    "bollywood.jpg": require(`${profilePictureBasePath}bollywood.jpg`),
    "profil.jpg": require(`${profilePictureBasePath}profil.jpg`),
    "neutral.jpg": require(`${profilePictureBasePath}neutral.jpg`),
    "punk_neutral.jpg": require(`${profilePictureBasePath}punk_neutral.jpg`),
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

