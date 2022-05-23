import { darkColors, lightColors } from "../../theme/colors";
import { TooltipTheme } from "./types";

export const light: TooltipTheme = {
  'background': '#27262c',
  'text': '#EAE2FC',
  'boxShadow': '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)',
};

export const dark: TooltipTheme = {
  background: lightColors.card,
  text: lightColors.text,
  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)',
};
