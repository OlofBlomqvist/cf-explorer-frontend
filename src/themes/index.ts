import { alpha, Breakpoints, createTheme, Shadows } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";
import { ThemeType } from "../types/user";
import breakpoints from "./breakpoints";
import palette, { CustomPalette } from "./palette";
import shadows from "./shadows";
import typography from "./typography";

type CustomTheme = {
  palette: CustomPalette;
  shadow: typeof shadows.light;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  mode: ThemeType;
  isDark: boolean;
};

const lightTheme: CustomTheme = {
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "light",
  isDark: false,
};

const darkTheme: CustomTheme = {
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "dark",
  isDark: false,
};

declare module "@mui/material" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module "@emotion/react" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const light = createTheme(lightTheme);
const dark = createTheme(darkTheme);

const themes: { [key in ThemeType]: typeof light } = {
  light,
  dark,
};

export default themes;