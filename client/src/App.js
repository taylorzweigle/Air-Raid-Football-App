//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { useAuthContext } from "./hooks/useAuthContext";
import { useThemeContext } from "./hooks/useThemeContext";

import GamePage from "./pages/gamePage/GamePage";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/LoginPage";

import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";

const App = () => {
  const { user } = useAuthContext();
  const { theme } = useThemeContext();

  const [isLoggedInView, setIsLoggedInView] = useState(false);
  const [isLoggedInEdit, setIsLoggedInEdit] = useState(false);

  useEffect(() => {
    setIsLoggedInView(user && user.username === "airraidapp" ? true : false);
    setIsLoggedInEdit(user && user.username === "airraidapp_edit" ? true : false);
  }, [user]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/:id" element={isLoggedInView || isLoggedInEdit ? <GamePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={isLoggedInView || isLoggedInEdit ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
