//Taylor Zweigle, 2023
import { createTheme } from "@mui/material";

import { theme } from "./theme";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#FFE5EB",
      main: "#A60F2D",
    },
    secondary: {
      main: "#4D4D4D",
    },
    background: {
      paper: "#ffffff",
      border: "#BDBDBD",
    },
  },
  ...theme,
});
