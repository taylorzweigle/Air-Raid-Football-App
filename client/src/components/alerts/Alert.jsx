//Taylor Zweigle, 2023
import React from "react";

import { Alert as MuiAlert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const Alert = ({ type, isOpen, label, onClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert severity={type}>{label}</MuiAlert>
    </Snackbar>
  );
};

export default Alert;
