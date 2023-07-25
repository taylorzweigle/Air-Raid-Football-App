//Taylor Zweigle, 2023
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SelectButton from "./buttons/SelectButton";

const SelectInput = ({ label, items, direction, onSelect }) => {
  return (
    <Stack direction={direction} alignItems={direction === "row" ? "center" : null} spacing={1}>
      <Typography variant="subtitle1">{label}</Typography>
      <SelectButton items={items} defaultValue={items[0]} minWidth={192} onSelect={(value) => onSelect(value)} />
    </Stack>
  );
};

export default SelectInput;
