//Taylor Zweigle, 2023
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ButtonGroup from "../buttons/ButtonGroup";
import Dialog from "../Dialog";

import { distances, downs, formations, plays, positions, results } from "../../data/foundations";

const AddPlayDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} title="Add Play" fullWidth={true} onClose={onClose}>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Down</Typography>
          <ButtonGroup items={downs} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Distance</Typography>
          <ButtonGroup items={distances} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Formation</Typography>
          <ButtonGroup items={formations} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Play</Typography>
          <ButtonGroup items={plays} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Position</Typography>
          <ButtonGroup items={positions} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Result</Typography>
          <ButtonGroup items={results} />
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddPlayDialog;
