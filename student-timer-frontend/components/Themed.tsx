/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import { ScrollView as DefaultScrollView } from "react-native-gesture-handler";

import { BASE_STYLES, COLORTHEME } from "../constants/Theme";
import React from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps &
  DefaultScrollView["props"] & { ref?: React.Ref<DefaultScrollView> };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORTHEME.light & keyof typeof COLORTHEME.dark
) {
  // const theme = useColorScheme() ?? 'light';
  const theme = "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORTHEME[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ fontFamily: "OpenSans_Regular", color }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={[{ backgroundColor, flex: 1 }, style]}>
      <DefaultScrollView
        style={[
          {
            backgroundColor,
            borderRadius: BASE_STYLES.borderRadius,
          },
          style,
        ]}
        alwaysBounceVertical={false}
        {...otherProps}
      />
    </View>
  );
}
