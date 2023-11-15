import React, { useState, Fragment } from 'react';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onboardingData } from './onboardingItems';


export default function OnboardingScreen() {
    const { width } = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" as never }] // toDo: das muss irgendwie besser gehen als mit "as never"
        });
    };

    const onNextPress = () => {
        if (activeIndex < onboardingData.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        } else {
            navigateToHome();
        }
    };

    const onPrevPress = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
            <Text>Hello, I am your Onboarding!</Text>
            {/* Onboarding-Beschreibungs-Daten */}
            {onboardingData.map((item, index) => (
                <Fragment key={index}>
                    {index === activeIndex && renderOnboardingItem(item)}
                </Fragment>
            ))}

            {/* Onboarding-Navigation */}
            <View style={styles.navigation}>
                <TouchableOpacity onPress={onPrevPress}>
                    <Ionicons name="md-caret-back-outline" size={24} color="#958AAA" />
                </TouchableOpacity>

                {/* Punkte für jeden Onboarding-Screen */}
                {onboardingData.map((_, index) => (
                    <Octicons key={index} style={index === activeIndex ? styles.activeDot : styles.dot} name="dot" size={24} />
                ))}

                <TouchableOpacity onPress={onNextPress}>
                    <Ionicons name="md-caret-forward-outline" size={24} color="#958AAA" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button_customized} onPress={navigateToHome}>
                <Text style={styles.buttontext}>Überspringen</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'lightgray',
        borderColor: 'lightseagreen',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 5,
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
    dot: {
        fontSize: 24,
        color: '#E8E8E8',
    },
    activeDot: {
        fontSize: 24,
        color: '#958AAA',
    },
    button_customized: {
        width: 175,
        height: 49.84439468383789,
        borderRadius: 50,
        backgroundColor: "#958AAA",
        padding: 10,
        margin: 5,

    },
    buttontext: {
        textAlign: "center",
        color: "#F6F6F6",
    }

});

