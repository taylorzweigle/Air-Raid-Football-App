//Taylor Zweigle, 2023
import React from "react";
import { useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeButton = ({ onToggleClick }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <IconButton variant="text" color="default" onClick={onToggleClick}>
      {theme === "light" ? <LightModeIcon /> : null}
      {theme === "dark" ? <DarkModeIcon /> : null}
    </IconButton>
  );
};

export default ThemeButton;
