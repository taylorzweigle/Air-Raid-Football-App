//Taylor Zweigle, 2024
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useThemeContext } from "../../hooks/useThemeContext";

import Card from "../../core/card/Card";

import DetailsData from "../detailsData/DetailsData";

const GameHeaderLayout = ({ game, details, onPlaybook, onAnalytics, onAddPlay, onLogout }) => {
  const { user } = useAuthContext();
  const { theme, dispatchTheme } = useThemeContext();

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: "8px" }}>
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton variant="text" color="primary" to={"/"} component={RouterLink}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary">
            {game.opponent}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
          {details && details.map((item) => <DetailsData key={item.label} label={item.label} value={item.value} />)}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={onPlaybook}>
            <MenuBookIcon />
          </IconButton>
          <Button variant="outlined" color="secondary" onClick={onAnalytics}>
            Analytics
          </Button>
          {user && user.username === "airraidapp_edit" && (
            <Button variant="contained" color="primary" onClick={onAddPlay}>
              Add Play
            </Button>
          )}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={() => dispatchTheme({ type: Actions.SET_THEME, payload: theme === "light" ? "dark" : "light" })}
            >
              {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default GameHeaderLayout;
