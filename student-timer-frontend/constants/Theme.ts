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
  VORLESUNG: "#F9D477",
  PRAKTIKUM: "#6FB9E2",
  PROJEKT: "#D16E6E",
  MEETING: "#58CEB9",
  SEMINAR: "#95E988",
  ÜBUNG: "#88A795",
  NACHHILFE: "#AB5761",
  TUTORIUM: "#5D7CB9",
  EXKURSION: "#FBC2B5",
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
};

const SIZES = {
  xxsmall: 10,
  xsmall: 14,
  small: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 48,
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
  },
};

const BASE_STYLES = {
  horizontalPadding: 16,
  borderRadius: 12,
};

export { COLORTHEME, COLORS, SIZES, BASE_STYLES };
