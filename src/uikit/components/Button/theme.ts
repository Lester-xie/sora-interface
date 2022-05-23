import { ButtonTheme, variants } from "./types";
import { lightColors, darkColors } from "../../theme/colors";

const { PRIMARY, SECONDARY, TERTIARY, TEXT, DANGER, SUBTLE, SUCCESS } = variants;
export const light: ButtonTheme = {
  [PRIMARY]: {
    'background': '#E55268',
    'backgroundActive': '#E55268',
    'backgroundHover': '#E55268',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'inset 0px -1px 0px rgba(14, 14, 44, 0.4)',
    'boxShadowActive': 'inset 0px -1px 0px rgba(14, 14, 44, 0.4)',
    'color': '#FFFFFF',
  },
  [SECONDARY]: {
    'background': 'transparent',
    'backgroundActive': 'transparent',
    'backgroundHover': 'transparent',
    'border': '2px solid #E55268',
    'borderColorHover': '#E55268',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#EFF4F5',
  },
  [TERTIARY]: {
    'background': '#EFF4F5',
    'backgroundActive': '#EFF4F5',
    'backgroundHover': '#EFF4F5',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#E55268',
  },
  [TEXT]: {
    'background': 'transparent',
    'backgroundActive': 'transparent',
    'backgroundHover': '#EFF4F5',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#E55268',
  },
  [DANGER]: {
    'background': '#ED4B9E',
    'backgroundActive': '#D43285',
    'backgroundHover': '#FF65B8',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#FFFFFF',
  },
  [SUBTLE]: {
    'background': '#E55268',
    'backgroundActive': '#8f80baD9',
    'backgroundHover': '#8f80baB3',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#FFFFFF',
  },
  [SUCCESS]: {
    'background': '#E55268',
    'backgroundActive': '#31E55268',
    'backgroundHover': '#31E55268',
    'border': 0,
    'borderColorHover': 'currentColor',
    'boxShadow': 'none',
    'boxShadowActive': 'none',
    'color': '#FFFFFF',
  },
};

export const dark: ButtonTheme = {
  [PRIMARY]: {
    ...light.primary,
  },
  [SECONDARY]: {
    ...light.secondary,
  },
  [TERTIARY]: {
    ...light.tertiary,
    background: darkColors.tertiary,
    backgroundActive: darkColors.tertiary,
    backgroundHover: darkColors.tertiary,
    color: darkColors.primary,
  },
  [TEXT]: {
    ...light.text,
    backgroundHover: darkColors.tertiary,
  },
  [DANGER]: {
    ...light.danger,
  },
  [SUBTLE]: {
    ...light.subtle,
  },
  [SUCCESS]: {
    ...light.success,
  },
};
