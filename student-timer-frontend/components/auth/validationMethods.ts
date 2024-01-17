export const validateName = (name: string) => {
    if (name.length === 0) {
        return "Name ist erforderlich";
    } else {
        return "";
    }
};

export const validateStudyCourse = (studyCourse: string) => {
    if (studyCourse.length === 0) {
        return "Studienfach ist erforderlich";
    } else {
        return "";
    }
};

export const validateEmail = (email: string) => {
    if (email.length === 0) {
        return "E-Mail ist erforderlich";
    } else if (email.length < 6) {
        return "E-Mail sollte mindestens 6 Zeichen lang sein";
    } else if (email.indexOf(" ") >= 0) {
        return "E-Mail kann keine Leerzeichen enthalten";
    } else {
        // Regulärer Ausdruck für die E-Mail-Validierung
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Bitte geben Sie eine gültige E-Mail-Adresse ein";
        }
    }
    return "";
};

export const checkPasswordSafety = (password: string) => {
    // Mindestens 8 Zeichen, mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};


export const validatePassword = (password: string, ) => {
    let passwordError = "";
    if (password.length == 0) {
        passwordError = "Passwort ist erforderlich";
    } else if (password.length < 6) {
        passwordError = "Das Passwort sollte mindestens 6 Zeichen lang sein";
    } else if (password.indexOf(" ") >= 0) {
        passwordError = "Passwort kann keine Leerzeichen enthalten";
    }
    return passwordError;
};

export const comparePasswords = (address1: string, address2: string) => {
    if (address1 !== address2) {
        return "Passwörter stimmen nicht überein";
    }
    return "";
};


