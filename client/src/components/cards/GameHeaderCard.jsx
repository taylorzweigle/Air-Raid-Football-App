//Taylor Zweigle, 2023
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import HeaderCard from "./HeaderCard";

import AddPlayDialog from "../dialogs/AddPlayDialog";

const GameHeaderCard = ({ title, details, dateKey }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <HeaderCard
        navigationButton={
          <IconButton variant="text" color="primary" to={"/"} component={RouterLink}>
            <ArrowBackIcon />
          </IconButton>
        }
        title={title}
        details={details}
        actionButton={
          <Button variant="contained" onClick={() => handleOpen()}>
            Add Play
          </Button>
        }
      />
      <AddPlayDialog dateKey={dateKey} open={open} onClose={handleClose} />
    </>
  );
};

export default GameHeaderCard;
