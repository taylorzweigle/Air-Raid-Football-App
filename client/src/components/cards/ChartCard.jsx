//Taylor Zweigle, 2023
import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "../Card";

const ChartCard = ({ header, children }) => {
  return (
    <Card padding>
      <Stack direction="column" spacing={0}>
        <Typography variant="subtitle1">{header}</Typography>
        <Box>{children}</Box>
      </Stack>
    </Card>
  );
};

export default ChartCard;
