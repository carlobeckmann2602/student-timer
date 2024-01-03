import { View, Text } from "@/components/Themed";
import React from "react";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";


export default function ConfirmModal(props: {

    title: string;
    message: string;
    //onConfirm: () => void;
}
) {
    const { title, message } = props;

    return (
        <View>
            <Text>Modal</Text>
            <Text>{title}</Text>
            <Text>{message}</Text>
            <Button
                text="Ja"
                backgroundColor={COLORTHEME.light.primary}
                textColor="#FFFFFF"
            />
            <Button
                text="Abbrechen"
                backgroundColor={COLORTHEME.light.grey3}
                textColor="#FFFFFF"
            />
        </View>
    )
}
