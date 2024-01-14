import React from 'react';
import {View, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { P } from "@/components/StyledText";
import { useProfilePicture, availableImageNames } from '@/components/profile/useProfilePicture';
import {COLORTHEME} from "@/constants/Theme";

const ProfilePictureSelection = () => {
    const { profilePictureName, setProfilePictureName, imagePath, setImagePath, getImagePath } = useProfilePicture();

    return (
        <View style={styles.row }>
            <View style={styles.colorWrapper}>
                <P style={styles.inputLabelText}>Bildauswahl</P>
                <FlatList
                    style={{ width: '100%' }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                    }}
                    contentContainerStyle={{ gap: 20 }}
                    data={availableImageNames}
                    numColumns={4}
                    renderItem={({ item: imageName }) => (
                        <TouchableOpacity
                            style={styles.colorOptionWrapper}
                            onPress={() => {
                                setProfilePictureName(imageName);
                                setImagePath(getImagePath(imageName));
                            }}
                            key={imageName}
                        >
                            <Image
                                source={{ uri: getImagePath(imageName) }}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};

export default ProfilePictureSelection;

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
        alignItems: "center"
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
