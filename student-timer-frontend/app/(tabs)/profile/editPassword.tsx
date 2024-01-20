import React, {useEffect, useState} from "react";
import { View, ScrollView } from "@/components/Themed";
import Alert from "@/components/Alert";
import { useRouter } from "expo-router";
import {BASE_STYLES } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "@/components/userInput/PasswordInput";
import { useToast } from "react-native-toast-notifications";
import ProfilePicture from "@/components/profile/ProfilePicture";
import {useProfilePicture} from "@/components/profile/useProfilePicture";
import { validatePassword, comparePasswords } from "@/components/auth/validationMethods";

export default function EditPassword() {

    const toast = useToast();
    const { onChangePassword, authState } = useAuth();
    const router = useRouter();

    const [isChanged, setIsChanged] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [userCheckPassword, setUserCheckPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
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

    const cancel = () => {
        router.push("/profile/");
        console.log("Abbrechen");
    };


    const validateInput = (password: string, checkPassword: string) => {
        let error = validatePassword(password);
        if (!error) {
            error = comparePasswords(password, checkPassword);
        }
        setPasswordError(error);
        return error === "";
    };

    const changePassword = async () => {
        if (validateInput(userPassword, userCheckPassword)) {
            const id = toast.show("Speichern...", { type: "loading" });
            const result = await onChangePassword!(
                userPassword,
                userCheckPassword,
            );
            if (result && result.error) {
                setError(result.msg);
                toast.update(id, result.msg, { type: "danger" });
            } else {
                toast.update(id, "Passwort erfolgreich geändert", {
                    type: "success",
                });
                router.push("/profile/");
            }
        } else {
            toast.show("Validierung fehlgeschlagen", { type: "warning" });
        }
    };

    const onCancel = () => {
        if (isChanged) {
            Alert({
                title: "Änderungen verwerfen?",
                message: "Sie haben Änderungen an Ihrem Passwort vorgenommen. Wenn Sie fortfahren, wird Ihr Passwort nicht geändert. Möchten Sie Ihre Änderungen wirklich verwerfen?",
                onPressConfirm: cancel,
            });
        } else {
            cancel();
        }
    };


    return (
        <ScrollView contentContainerStyle={{borderRadius: BASE_STYLES.borderRadius}}>
            <View style={{ alignItems: "center" }}>
                <ProfilePicture imageName={profilePictureName}/>
            </View>
            <View>
                <PasswordInput
                    title={"Passwort ändern"}
                    userPassword={userPassword}
                    setUserPassword={handleInputChange(setUserPassword)}
                    userCheckPassword={userCheckPassword}
                    setUserCheckPassword={handleInputChange(setUserCheckPassword)}
                    passwordError={passwordError}
                    buttonAction={changePassword}
                    disabled={!isChanged}
                    cancelAction={onCancel}
                />
            </View>
        </ScrollView>
    )
}
