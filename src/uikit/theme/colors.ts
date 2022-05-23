import { Colors } from "./types";

export const baseColors = {
  'failure': '#ED4B9E',
  'primary': '#E55268',
  'primaryBright': '#53DEE9',
  'primaryDark': '#0098A1',
  'secondary': '#E55268',
  'success': '#E55268',
  'warning': '#FFB237',
};

export const brandColors = {
  'cherry': '#F0B90B',
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  'background': '#F9F7F8',
  'backgroundDisabled': '#E9EAEB',
  'contrast': '#191326',
  'invertedContrast': '#FFFFFF',
  'input': '#F9F7F8',
  tabbg: '#f3dde0',
  'inputSecondary': '#d7caec',
  'tertiary': '#EFF4F5',
  'text': '#25030A',
  'textDisabled': '#BDC2C4',
  'textSubtle': '#E55268',
  'borderColor': '#E9EAEB',
  inputColor: '#E55268',
  placeholder: '#BDBECB',
  'card': '#FFFFFF',
  'gradients': { 'bubblegum': 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)' },
};



export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "#9A6AFF",
  background: "#100C18",
  tabbg: '#f3dde0',
  backgroundDisabled: "#3c3742",
  contrast: "#FFFFFF",
  invertedContrast: "#191326",
  input: "#483f5a",
  inputSecondary: "#66578D",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#EAE2FC",
  textDisabled: "#666171",
  textSubtle: "#A28BD4",
  borderColor: "#524B63",
  card: "#27262c",
  inputColor: '#E55268',
  placeholder: '#BDBECB',
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
