//Taylor Zweigle, 2024
import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useLogout } from "../hooks/useLogout";

const AirRaidFootballApp = () => {
  const { logout } = useLogout();

  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h6">Air Raid Football App</Typography>
      <Button variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </Stack>
  );
};

export default AirRaidFootballApp;
