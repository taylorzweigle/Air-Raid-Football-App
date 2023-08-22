//Taylor Zweigle, 2023
import React from "react";

import Stack from "@mui/material/Stack";

import Card from "./Card";

import ReadOnlyData from "../typography/ReadOnlyData";

const DetailsCard = ({ details }) => {
  return (
    <Card padding>
      <Stack direction="row" alignItems="center" justifyContent="space-around">
        {details.map((item) => (
          <ReadOnlyData key={item.label} label={item.label} value={item.value} direction="row" />
        ))}
      </Stack>
    </Card>
  );
};

export default DetailsCard;
