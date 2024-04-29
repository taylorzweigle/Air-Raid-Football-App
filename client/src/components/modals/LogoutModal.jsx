//Taylor Zweigle, 2024
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const LogoutModal = ({ open, onClose, onLogout }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
