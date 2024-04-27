//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "../../core/card/Card";

const FormationsLayout = () => {
  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
        <Typography variant="subtitle1">Formations</Typography>
      </Stack>
    </Card>
  );
};

export default FormationsLayout;
