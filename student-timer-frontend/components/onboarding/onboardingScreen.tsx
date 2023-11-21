import React, { useState, Fragment } from 'react';
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import Ionicons from "@/components/Ionicons";
import { COLORTHEME } from "@/constants/Theme";
import { useNavigation } from '@react-navigation/native';
import { onboardingData } from '@/components/onboarding/onboardingItems';


export default function OnboardingScreen() {
    const { width, height } = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" as never }] // toDo: das muss irgendwie besser gehen als mit "as never"
        });
    };

    const navigateToAuthentication = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "authentication" as never }]
        });
    };

    const onPrevPress = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const onNextPress = () => {
        if (activeIndex < onboardingData.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        } else {
            navigateToHome();
        }
    };

    const renderOnboardingItem = ({ title, description, image }: { title: string, description: string, image: any }) => (
        <View style={styles.onboardingItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Image source={image} />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Onboarding-Beschreibungs-Daten */}
            {onboardingData.map((item, index) => (
                <Fragment key={index}>
                    {index === activeIndex && renderOnboardingItem(item)}
                </Fragment>
            ))}

            {/* Onboarding-Navigation */}
            <View style={styles.navigation}>
                <TouchableOpacity onPress={onPrevPress} disabled={activeIndex === 0} >
                    <Ionicons
                        name="md-caret-back-outline"
                        size={24}
                        color={activeIndex === 0 ? '#E8E8E8' : '#958AAA'} />
                </TouchableOpacity>

                {/* Punkte für jeden Onboarding-Screen */}
                {onboardingData.map((_, index) => (
                    <Octicons key={index} style={index === activeIndex ? styles.active : styles.inactive} name="dot" size={24} />
                ))}

                <TouchableOpacity onPress={onNextPress}>
                    <Ionicons name="md-caret-forward-outline" size={24} color={COLORTHEME.light.primary} />
                </TouchableOpacity>
            </View>


            <View style={styles.button}>
                <Button
                    text="Überspringen"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={navigateToHome}
                />
            </View>
            <View style={styles.button}>
                <Button
                    text="Login"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={navigateToAuthentication}
                />
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    onboardingItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
    },
    inactive: {
        fontSize: 24,
        color: '#E8E8E8',
    },
    active: {
        fontSize: 24,
        color: COLORTHEME.light.primary,
    },
    button: {
        width: 175,
        height: 49.84439468383789,
        borderRadius: 50,
        backgroundColor: COLORTHEME.light.primary,
        padding: 10,
        margin: 5,
    },
    buttontext: {
        textAlign: "center",
        color: "#F6F6F6",
    }

});

