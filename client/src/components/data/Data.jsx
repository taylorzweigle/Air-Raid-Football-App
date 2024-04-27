//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ReadOnlyData = ({ label, value }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" color="text.primary">
        {value}
      </Typography>
    </Stack>
  );
};

export default ReadOnlyData;
