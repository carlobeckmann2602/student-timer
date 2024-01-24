const COLORS = {
  // System colors
  white: "#FFFFFF",
  black: "#101010",
  grey1: "#E8E8E8",
  grey2: "#F6F6F6",
  grey3: "#666666",
  border: "666666",
  icon: "#292D32",
  // CI colors
  primary: "#958AAA",
  warning: "#D16E6E",
  success: "#51C93E",
  danger: "#D32F2F",
  rating: "#D0D400",
  // Module units
  EXKURSION: "#B62020",
  MEETING: "#FF522B",
  NACHHILFE: "#E86E7D",
  PRAKTIKUM: "#F9D477",
  PROJEKT: "#95E988",
  SEMINAR: "#20663D",
  TUTORIUM: "#2FFFDA",
  ÜBUNG: "#D39AFF",
  VORLESUNG: "#11409C",
  // selectable module colors
  moduleColor1: "#3AAF6B",
  moduleColor2: "#52EBAB",
  moduleColor3: "#88A7F5",
  moduleColor4: "#5D7CB9",
  moduleColor5: "#D8C839",
  moduleColor6: "#FA7921",
  moduleColor7: "#C93C1C",
  moduleColor8: "#AC56AE",
  // timer colors
  progressBarPauseColor: "#F5F56A",
  // OS colors
  iOSKeyboardLight: "#D1D1D6",
  iOSKeyboardDark: "#636366",
  iOSFontLight: "#000000",
  iOSFontDark: "#FFFFFF",
};

const SIZES = {
  xxsmall: 10,
  xsmall: 14,
  small: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 36,
};

const COLORTHEME = {
  light: {
    text: COLORS.black,
    background: COLORS.white,
    tabIconDefault: COLORS.icon,
    primary: COLORS.primary,
    grey1: COLORS.grey1,
    grey2: COLORS.grey2,
    grey3: COLORS.grey3,
    danger: COLORS.danger,
    iOSKeyboard: COLORS.iOSKeyboardLight,
    iOSFont: COLORS.iOSFontLight,
  },
  dark: {
    text: COLORS.white,
    background: COLORS.black,
    tabIconDefault: COLORS.icon,
    primary: COLORS.primary,
    grey1: COLORS.grey1,
    grey2: COLORS.grey2,
    grey3: COLORS.grey3,
    danger: COLORS.danger,
    iOSKeyboard: COLORS.iOSKeyboardDark,
    iOSFont: COLORS.iOSFontDark,
  },
};

const BASE_STYLES = {
  horizontalPadding: 16,
  borderRadius: 12,
};

export { COLORTHEME, COLORS, SIZES, BASE_STYLES };
