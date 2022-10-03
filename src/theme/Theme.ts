import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLOURS = {
  // base color
  primary: '#000',

  // colors;
  secondary: '#03d7fc',
  white: '#ffffff',
  grey:'grey',
  transparent: "transparent",
  red: "#E0446E", //change
  cancelRed: "#F64158",
  success: "#119C27",
  blue: "#4F5DFB", //change
  blueSky: "#0098C8",
  blurBlueSky: "rgba(0, 152, 200, 0.2)",
  blurGreen: "rgba(61, 179, 87, 0.2)",
  gray: "#8F9BB3",
  purpleDark: "#21232D",//change
  disabled: "#E6E9ED",
  purpleBlue: "#7585FB",
  blurPrimary: "rgba(52, 50, 148, 0.2)",
  rrror: "#E13838",
};

// Sizes;

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes;

  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,

  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // App Dimensions
  width,
  height,
};


// FONTS;
export const FONTS = {
  largeTitle: {fontSize: SIZES.largeTitle, lineHeight: 55},
  h1: {fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontSize: SIZES.body1, lineHeight: 55},
  body2: {fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontSize: SIZES.body4, lineHeight: 22},
};

const appTheme = {COLOURS, SIZES, FONTS};
export default appTheme;