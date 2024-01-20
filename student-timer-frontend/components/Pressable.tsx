import React from 'react';
import { Pressable as RNPressable, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type PressableProps = {
    text: string;
    textColor?: string;
    accessibilityRole: 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
    onPress?: (val?: any) => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
};

export type PressablePropsType = PressableProps;

export default function Pressable({
                                      text,
                                      textColor,
                                      accessibilityRole,
                                      onPress,
                                      style,
                                      disabled
                                  }: PressablePropsType) {
    return (
        <RNPressable
            accessibilityLabel={text}
            accessibilityRole={accessibilityRole}
            style={({ pressed }) => [
                {backgroundColor: 'transparent'},
                styles.button,
                style
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[{ color: textColor }, styles.text]}>{text}</Text>
        </RNPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        textDecorationLine: 'underline'
    }
});
