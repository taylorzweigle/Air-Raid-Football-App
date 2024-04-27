//Taylor Zweigle, 2024
import { createTheme } from "@mui/material";

import { theme } from "./theme";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EB2F53",
      dark: "#1E0005",
    },
    secondary: {
      main: "#D4D4D4",
    },
    background: {
      paper: "#121212",
      border: "#424242",
    },
  },
  ...theme,
});
