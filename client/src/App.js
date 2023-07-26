//Taylor Zweigle, 2023
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";

import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";

const App = () => {
  const theme = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/:id" element={<GamePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
