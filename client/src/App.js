//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
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

  const [games, setGames] = useState(null);
  const [plays, setPlays] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("/api/games");

      if (response.ok) {
        setGames(await response.json());
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const fetchPlays = async () => {
      const response = await fetch("/api/plays");

      if (response.ok) {
        setPlays(await response.json());
      }
    };

    fetchPlays();
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/:id" element={<GamePage plays={plays} />} />
        <Route path="/" element={<HomePage games={games} plays={plays} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
