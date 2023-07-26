//Taylor Zweigle, 2023
import React from "react";
import { useDispatch } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "../Card";
import ThemeButton from "../buttons/ThemeButton";
import ReadOnlyData from "../ReadOnlyData";

import { theme } from "../../actions";

import { mediaQueryDisplayFlexStyle } from "../../styles/style";

const HeaderCard = ({ navigationButton, title, details, actionButton }) => {
  const dispatch = useDispatch();

  return (
    <Card padding>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          {navigationButton}
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" color="text.primary">
              {title}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8} sx={mediaQueryDisplayFlexStyle}>
          {details.map((item) => (
            <ReadOnlyData key={item.label} label={item.label} value={item.value} direction="row" />
          ))}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <ThemeButton onToggleClick={() => dispatch(theme())} />
          {actionButton}
        </Stack>
      </Stack>
    </Card>
  );
};

export default HeaderCard;
