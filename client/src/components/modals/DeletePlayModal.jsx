//Taylor Zweigle, 2024
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DeletePlayModal = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Play</DialogTitle>
      <DialogContent>Are you sure you want to delete this play?</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlayModal;
