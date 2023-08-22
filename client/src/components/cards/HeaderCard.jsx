//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MenuBookIcon from "@mui/icons-material/MenuBook";

import Card from "./Card";

import ReadOnlyData from "../typography/ReadOnlyData";

import ThemeButton from "../buttons/ThemeButton";

import PlaybookDialog from "../dialogs/PlaybookDialog";

import { theme } from "../../actions";

import { mediaQueryDisplayFlexStyle } from "../../styles/style";

const HeaderCard = ({ navigationButton, title, details, actions }) => {
  const dispatch = useDispatch();

  const [playbookOpen, setPlaybookOpen] = useState(false);

  const handleOpenPlaybook = () => setPlaybookOpen(true);

  return (
    <>
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={handleOpenPlaybook}>
              <MenuBookIcon />
            </IconButton>
            <ThemeButton onToggleClick={() => dispatch(theme())} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              {actions}
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <PlaybookDialog open={playbookOpen} onClose={() => setPlaybookOpen(false)} />
    </>
  );
};

export default HeaderCard;
