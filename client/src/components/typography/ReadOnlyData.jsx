//Taylor Zweigle, 2023
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ReadOnlyData = ({ direction, label, value }) => {
  const getSpacing = () => (direction === "row" ? 1 : -1);
  const getVariant = () => (direction === "row" ? "h6" : "subtitle1");

  return (
    <Stack direction={direction} alignItems="center" spacing={getSpacing()}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant={getVariant()} color="text.primary">
        {value}
      </Typography>
    </Stack>
  );
};

export default ReadOnlyData;
