//Taylor Zweigle, 2024
import React from "react";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useDataContext } from "../../hooks/useDataContext";
import { useThemeContext } from "../../hooks/useThemeContext";

import Card from "../../core/card/Card";

import DetailsData from "../detailsData/DetailsData";

const HomeHeaderLayout = ({ details, selectedYear, onSelectYear, onPlaybook, onAnalytics, onCreateGame, onLogout }) => {
  const { user } = useAuthContext();
  const { SEASONS } = useDataContext();
  const { theme, dispatchTheme } = useThemeContext();

  return (
    <Card>
      <div style={{ height: "72px" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: "8px" }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Select
              value={selectedYear}
              onChange={(e) => onSelectYear(e.target.value)}
              sx={{ minWidth: 128, backgroundColor: "background.paper" }}
            >
              {SEASONS.map((season) => (
                <MenuItem key={season} value={season}>
                  {season}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h6" color="text.primary">
              Football Season
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
              <Button variant="contained" color="primary" onClick={onCreateGame}>
                Create Game
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
      </div>
    </Card>
  );
};

export default HomeHeaderLayout;
