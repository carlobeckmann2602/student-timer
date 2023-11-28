import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Text, View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";

interface InputFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: string;
    secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
}) => (
    <View style={styles.inputLabelGroup}>
        <Text style={styles.inputLabelText}>{label}</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            /*keyboardType={keyboardType}*/
            secureTextEntry={secureTextEntry}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 12,
    },
    outerWrapper: {
        width: "100%",
        backgroundColor: COLORTHEME.light.grey1,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        gap: 16,
    },
    row: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 16,
    },
    inputLabelGroup: {
        flex: 1,
        gap: 5,
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    inputLabelText: {
        color: COLORTHEME.light.primary,
    },
    input: {
        flexGrow: 1,
        backgroundColor: COLORTHEME.light.grey2,
        color: COLORTHEME.light.grey3,
        borderRadius: 12,
        height: 40,
        paddingHorizontal: 10,
    },
    buttons: {
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
    },
});

export default InputField;
