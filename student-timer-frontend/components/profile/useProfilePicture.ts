import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

//export const defaultPictureName = 'user-round.png';
export const defaultPictureName = '';

const profilePictureBasePath = '../../assets/images/profile/';
export interface ProfileImages {
    [key: string]: any;
}

export const allProfileImages: ProfileImages = {
    "rot.jpg": require(`${profilePictureBasePath}rot.jpg`),
    "agata.jpg": require(`${profilePictureBasePath}agata.jpg`),
    "punk_gechilled.jpg": require(`${profilePictureBasePath}punk_gechilled.jpg`),
    "elephant.jpg": require(`${profilePictureBasePath}elephant.jpg`),
    "aquarell.jpg": require(`${profilePictureBasePath}aquarell.jpg`),
    "ken.jpg": require(`${profilePictureBasePath}ken.jpg`),
    "genie.jpg": require(`${profilePictureBasePath}genie.jpg`),
    "tiger.jpg": require(`${profilePictureBasePath}tiger.jpg`),
    "schwarzweiß2.jpg": require(`${profilePictureBasePath}schwarzweiß2.jpg`),
    "papierschlacht.jpg": require(`${profilePictureBasePath}papierschlacht.jpg`),
    "drache.jpg": require(`${profilePictureBasePath}drache.jpg`),
    "newyork.jpg": require(`${profilePictureBasePath}newyork.jpg`),
    "regenschirm.jpg": require(`${profilePictureBasePath}regenschirm.jpg`),
    "muster_orange.jpg": require(`${profilePictureBasePath}muster_orange.jpg`),
    "monster.jpg": require(`${profilePictureBasePath}monster.jpg`),
    "apfel.jpg": require(`${profilePictureBasePath}apfel.jpg`),
    "gelb2.jpg": require(`${profilePictureBasePath}gelb2.jpg`),
    "random1.jpg": require(`${profilePictureBasePath}random1.jpg`),
    "punk_lieb.jpg": require(`${profilePictureBasePath}punk_lieb.jpg`),
    "schwarzweiß.jpg": require(`${profilePictureBasePath}schwarzweiß.jpg`),
    "muster_gelb.jpg": require(`${profilePictureBasePath}muster_gelb.jpg`),
    "maxine.jpg": require(`${profilePictureBasePath}maxine.jpg`),
    "grün.jpg": require(`${profilePictureBasePath}grün.jpg`),
    "random2.jpg": require(`${profilePictureBasePath}random2.jpg`),
    "punk_wuetend.jpg": require(`${profilePictureBasePath}punk_wuetend.jpg`),
    "gelb.jpg": require(`${profilePictureBasePath}gelb.jpg`),
    "nico.jpg": require(`${profilePictureBasePath}nico.jpg`),
    "random.jpg": require(`${profilePictureBasePath}random.jpg`),
    "wueste.jpg": require(`${profilePictureBasePath}wueste.jpg`),
    "lila.jpg": require(`${profilePictureBasePath}lila.jpg`),
    "robby.jpg": require(`${profilePictureBasePath}robby.jpg`),
    "picasso.jpg": require(`${profilePictureBasePath}picasso.jpg`),
    "muster_lila.jpg": require(`${profilePictureBasePath}muster_lila.jpg`),
    "nerd.jpg": require(`${profilePictureBasePath}nerd.jpg`),
    "abstrakt.jpg": require(`${profilePictureBasePath}abstrakt.jpg`),
    "bollywood.jpg": require(`${profilePictureBasePath}bollywood.jpg`),
    "neutral.jpg": require(`${profilePictureBasePath}neutral.jpg`),
    "punk.jpg": require(`${profilePictureBasePath}punk.jpg`),
    "hoody.jpg": require(`${profilePictureBasePath}hoody.jpg`),
    "kim.jpg": require(`${profilePictureBasePath}kim.jpg`),
    "elf.jpg": require(`${profilePictureBasePath}elf.jpg`),
    "muster_blau.jpg": require(`${profilePictureBasePath}muster_blau.jpg`),
    "muster_nerd.jpg": require(`${profilePictureBasePath}muster_nerd.jpg`),
    "muster_gruen.jpg": require(`${profilePictureBasePath}muster_gruen.jpg`),
    "user-round.png": require(`${profilePictureBasePath}user-round.png`),
};

export const profileHumanAvatarImages: ProfileImages = {
    "maxine.jpg": require(`${profilePictureBasePath}maxine.jpg`),
    "hoody.jpg": require(`${profilePictureBasePath}hoody.jpg`),
    "genie.jpg": require(`${profilePictureBasePath}genie.jpg`),
    "kim.jpg": require(`${profilePictureBasePath}kim.jpg`),
    "schwarzweiß2.jpg": require(`${profilePictureBasePath}schwarzweiß2.jpg`),
    "nico.jpg": require(`${profilePictureBasePath}nico.jpg`),
    "bollywood.jpg": require(`${profilePictureBasePath}bollywood.jpg`),
    "ken.jpg": require(`${profilePictureBasePath}ken.jpg`),
    "newyork.jpg": require(`${profilePictureBasePath}newyork.jpg`),
    "punk_gechilled.jpg": require(`${profilePictureBasePath}punk_gechilled.jpg`),
}

export const profileFantasyAvatarImages: ProfileImages = {
    "gelb2.jpg": require(`${profilePictureBasePath}gelb2.jpg`),
    "agata.jpg": require(`${profilePictureBasePath}agata.jpg`),
    "rot.jpg": require(`${profilePictureBasePath}rot.jpg`),
    "drache.jpg": require(`${profilePictureBasePath}drache.jpg`),
    "tiger.jpg": require(`${profilePictureBasePath}tiger.jpg`),
    "gelb.jpg": require(`${profilePictureBasePath}gelb.jpg`),
    "monster.jpg": require(`${profilePictureBasePath}monster.jpg`),
    "apfel.jpg": require(`${profilePictureBasePath}apfel.jpg`),
    "elephant.jpg": require(`${profilePictureBasePath}elephant.jpg`),
    "elf.jpg": require(`${profilePictureBasePath}elf.jpg`),
}

export const profilePatternImages: ProfileImages = {
    "muster_lila.jpg": require(`${profilePictureBasePath}muster_lila.jpg`),
    "muster_gelb.jpg": require(`${profilePictureBasePath}muster_gelb.jpg`),
    "random1.jpg": require(`${profilePictureBasePath}random1.jpg`),
    "aquarell.jpg": require(`${profilePictureBasePath}aquarell.jpg`),
    "muster_blau.jpg": require(`${profilePictureBasePath}muster_blau.jpg`),
    "random2.jpg": require(`${profilePictureBasePath}random2.jpg`),
    "muster_nerd.jpg": require(`${profilePictureBasePath}muster_nerd.jpg`),
    "muster_orange.jpg": require(`${profilePictureBasePath}muster_orange.jpg`),
    "abstrakt.jpg": require(`${profilePictureBasePath}abstrakt.jpg`),
    "muster_gruen.jpg": require(`${profilePictureBasePath}muster_gruen.jpg`),
}

export const useProfilePicture = () => {
    const { authState } = useAuth();

    const getProfilePictureName = () => {
        const userPicture = authState?.user.profilePicture || '';
        return allProfileImages[userPicture] ? userPicture : defaultPictureName;
    };

    const getImagePath = (profilePictureName: string) => {
        return allProfileImages[profilePictureName] || allProfileImages[defaultPictureName];
    };

    const [profilePictureName, setProfilePictureName] = useState<string>(getProfilePictureName());
    const [imagePath, setImagePath] = useState<string>(getImagePath(getProfilePictureName()));

    return { profilePictureName, setProfilePictureName, imagePath, setImagePath, getImagePath, getProfilePictureName };
};

