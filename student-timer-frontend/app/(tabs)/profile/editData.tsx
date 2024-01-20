import React, {useEffect, useState} from "react";
import { View, ScrollView } from "@/components/Themed";
import Alert from "@/components/Alert";
import { useRouter } from "expo-router";
import {BASE_STYLES} from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import UserDetailsInput from "@/components/userInput/UserDetailsInput";
import Pressable from "@/components/Pressable";
import { useToast } from "react-native-toast-notifications";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {useProfilePicture} from "@/components/profile/useProfilePicture";
import { validateName, validateStudyCourse, validateEmail } from "@/components/auth/validationMethods"

export default function EditData() {

    const toast = useToast();
    const { onUpdate, onRemove, authState } = useAuth();
    const router = useRouter();


    const [isChanged, setIsChanged] = useState(false);

    const [userName, setUserName] = useState(authState?.user.name || "");
    const [userStudyCourse, setUserStudyCourse] = useState(authState?.user.studyCourse || "");
    const [userEmail, setUserEmail] = useState(authState?.user.email || "");

    const [nameError, setNameError] = useState("");
    const [studyCourseError, setStudyCourseError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [, setError] = useState("");


    const { profilePictureName, getProfilePictureName } = useProfilePicture();

    useEffect(() => {
        getProfilePictureName();
    }, [authState]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (value: string) => {
            setter(value);
            setIsChanged(true);
        };
    };

    const validateInput = () => {
        const nameError = validateName(userName);
        setNameError(nameError);
        const nameValid = nameError === "";

        const studyCourseError = validateStudyCourse(userStudyCourse);
        setStudyCourseError(studyCourseError);
        const studyCourseValid = studyCourseError === "";

        const emailError = validateEmail(userEmail);
        setEmailError(emailError);
        const emailValid = emailError === "";

        return (nameValid && studyCourseValid && emailValid);
    };

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
    };

    const update = async () => {
        if (validateInput()) {
            const id = toast.show("Speichern...", { type: "loading" });
            const result = await onUpdate!(
                userName,
                userStudyCourse,
                userEmail,
            );
            console.log("validateInput");
            if (result && result.error) {
                setError(result.msg);
                toast.update(id, result.msg, { type: "danger" });
            } else {
                toast.update(id, "Profildaten erfolgreich gespeichert", {
                    type: "success",
                });
                router.push("/profile/");
            }
        } else {
            toast.show("Validierung fehlgeschlagen", { type: "warning" });
        }
    };


    const removeUser = async () => {
        console.log("User removed:", authState?.user.email)
        let id = toast.show("Löschen...", { type: "loading" });
        if (authState?.user.id) {
            const result = await onRemove!(
                authState?.user.id
            );
            console.log("remove")
            if (result && result.error) {
                setError(result.msg);
            } else {
                toast.update(id, "Ihr Konto wurde erfolgreich gelöscht", { type: "success" });
                router.push("/(auth)/signup");
            }
        }
    };

    const onCancel = () => {
        if (isChanged) {
            Alert({
                title: "Änderungen verwerfen?",
                message: "Sie haben Änderungen vorgenommen. Wenn Sie fortfahren, gehen alle ungespeicherten Daten verloren. Möchten Sie Ihre Änderungen wirklich verwerfen?",
                onPressConfirm: cancel,
            });
        } else {
            cancel();
        }
    };

    const onDelete = () => {
        Alert({
            title: "Profil wirklich löschen?",
            message: `Möchtest du deinen Account mit der E-Mail-Adresse "${authState?.user.email}" wirklich unwiderruflich löschen? Alle zum Profil gehörenden Daten, Module, Lerneinheiten und Trackings werden dabei gelöscht.`,
            onPressConfirm: removeUser,
            confirmText: "Löschen",
        });
    };

    return (
        <ScrollView contentContainerStyle={{borderRadius: BASE_STYLES.borderRadius}}>
            <View style={{ alignItems: "center" }}>
                <ProfilePicture imageName={profilePictureName}/>
            </View>
            <View>
                <UserDetailsInput
                    title={"Daten bearbeiten"}
                    userName={userName}
                    setUserName={handleInputChange(setUserName)}
                    nameError={nameError}
                    userStudyCourse={userStudyCourse}
                    setUserStudyCourse={handleInputChange(setUserStudyCourse)}
                    studyCourseError={studyCourseError}
                    userEmail={userEmail}
                    setUserEmail={handleInputChange(setUserEmail)}
                    emailError={emailError}
                    buttonAction={update}
                    disabled={!isChanged}
                    cancelAction={onCancel}
                />
            </View>
            <View style={{ alignItems: "center", marginBottom: 40  }}>
                <Pressable
                    text={"Konto löschen"}
                    textColor={'#F00'}
                    accessibilityRole={"button"}
                    onPress={onDelete}
                />
            </View>
        </ScrollView>
    )
}
