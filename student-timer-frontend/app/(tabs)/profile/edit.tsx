import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import {useRouter} from "expo-router";
import {COLORTHEME} from "@/constants/Theme";
import Button from "@/components/Button";
import {User2} from "lucide-react-native";
import { Edit2 } from 'lucide-react-native';
import UserDetailsInput from "@/components/UserDetailsInput";
import Header from "@/components/Header";
import {useAuth} from "@/context/AuthContext";


export default function Edit() {

    //toDo in Context korrekt implementieren
    //const { onUpdate, authState } = useAuth();


    const onUpdate = async (name: string, studySubject: string, password: string, email: string) => {
        user.name = name;
        user.studySubject = studySubject;
        user.email = email;
        console.log(user);
    };


    const router = useRouter();

    const pic = require("../../../assets/images/profile/profile-picture.jpg");

/*    const user = {
        name: authState?.user.name,
        studySubject: authState?.user.studyCourse,
        email:  authState?.user.email,
        profileImage: pic,
    };*/

    const user = {
        name: "Maxine Hellas",
        studySubject: "Master Medieninformatik",
        email: "maxine.hellas@study.hs-duesseldorf.de",
        profileImage: pic,
    };



    const [userName, setUserName] = useState(user.name);
    const [userStudySubject, setUserStudySubject] = useState(user.studySubject);
    const [userEmail, setUserEmail] = useState(user.email);

    const [nameError, setNameError] = useState("");
    const [studySubjectError, setStudySubjectError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");

    const validateInput = () => {
        let nameValid = false;
        if (userName.length == 0) {
            setNameError("Name ist erforderlich");
        } else {
            setNameError("");
            nameValid = true;
        }

        let studyCourseValid = false;
        if (userStudySubject.length == 0) {
            setStudySubjectError("Studienfach ist erforderlich");
        } else {
            setStudySubjectError("");
            studyCourseValid = true;
        }

        let emailValid = false;
        if (userEmail.length == 0) {
            setEmailError("E-Mail ist erforderlich");
        } else if (userEmail.length < 6) {
            setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
        } else if (userEmail.indexOf(" ") >= 0) {
            setEmailError("E-Mail kann keine Leerzeichen enthalten");
        } else {
            setEmailError("");
            emailValid = true;
        }

        if (nameValid && studyCourseValid && emailValid ) {
            return true;
        }

        return false;
    };

    const cancel = () => {
        router.push("/profile/");
        console.log("Profil bearbeiten");
    };

    //toDo: implementieren in context
    const save = async () => {
        if (validateInput()) {
            const result = await onUpdate!(
                userName,
                userStudySubject,
                "empty",
                userEmail,
            );
            /*
            if (result && result.error) {
                setError(result.msg);
            } else {
                router.push("/profile/");
            }*/
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profilbild */}
            <View style={styles.profileImageContainer}>
                {user.profileImage ? (
                    <Image source={user.profileImage} style={styles.profileImage} />
                ) : (
                    <User2 size={100} color={COLORTHEME.light.primary} />
                )}
                <TouchableOpacity style={styles.editIcon}>
                    <Edit2 size={24} color={COLORTHEME.light.background} />
                </TouchableOpacity>
            </View>
            {/*Benutzerinformationen bearbeiten*/}
            <Header title="Profil bearbeiten"></Header>
            <UserDetailsInput
                    userName={userName}
                    setUserName={setUserName}
                    nameError={nameError}
                    userStudyCourse={userStudySubject}
                    setUserStudyCourse={setUserStudySubject}
                    studyCourseError={studySubjectError}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    emailError={emailError}
                />
            <View style={styles.actionContainer}>
                <Button
                    text="Speichern"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor={COLORTHEME.light.grey2}
                    onPress={save}
                    style={{ width: 200 }}
                />
                <Button
                    text="Abbrechen"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor="#FFFFFF"
                    onPress={cancel}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORTHEME.light.background,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#EEEAEA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: COLORTHEME.light.primary,
        borderWidth: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    actionContainer: {
        flexDirection: "column",
        width: 200,
        gap: 15,
        marginTop: 20,
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
    row: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 16,
    },
});
