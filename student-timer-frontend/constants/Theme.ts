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
  // secondary: "#000000",
  // tertiary: "#000000",
  warning: "#D16E6E",
  success: "#51C93E",
  rating: "#D0D400",
  // Module units
  Vorlesung: "#F9D477",
  Praktikum: "#6FB9E2",
  Nachhilfe: "#D16E6E",
  Seminar: "#58CEB9",
  Projekttreffen: "#95E988",
  // selectable course colors
  course1: "#88A795",
  course2: "#AB5761",
  course3: "#5D7CB9",
  course4: "#FBC2B5",
  course5: "#073B3A",
  course6: "#243119",
  course7: "#FA7921",
};

const SIZES = {
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
  },
  dark: {
    text: COLORS.white,
    background: COLORS.black,
    tabIconDefault: COLORS.icon,
    primary: COLORS.primary,
    grey1: COLORS.grey1,
    grey2: COLORS.grey2,
    grey3: COLORS.grey3,
  },
};

export { COLORTHEME, COLORS, SIZES };
