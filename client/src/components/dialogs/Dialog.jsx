//Taylor Zweigle, 2023
import React from "react";

import Button from "@mui/material/Button";
import { Dialog as MuiDialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Dialog = ({ title, children, open, maxWidth, fullWidth, isForm, onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    onSubmit(e);
    onClose();
  };

  return (
    <MuiDialog open={open} maxWidth={maxWidth} fullWidth={fullWidth} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onClose}>
            {isForm ? "Cancel" : "Close"}
          </Button>
          {isForm && (
            <Button variant="contained" type="submit">
              Create
            </Button>
          )}
        </DialogActions>
      </form>
    </MuiDialog>
  );
};

export default Dialog;
