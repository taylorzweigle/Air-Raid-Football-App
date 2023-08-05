//Taylor Zweigle, 2023
import React from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import Card from "../Card";

const ChartCard = ({ header, includeRun, onIncludeRuns, children }) => {
  return (
    <Card padding>
      <Stack direction="column" spacing={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">{header}</Typography>
          {includeRun && (
            <FormControlLabel
              control={<Switch size="small" />}
              label={
                <Typography variant="caption" color="textPrimary">
                  Include Runs
                </Typography>
              }
              onClick={onIncludeRuns}
            />
          )}
        </Stack>
        <Box>{children}</Box>
      </Stack>
    </Card>
  );
};

export default ChartCard;
