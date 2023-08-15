//Taylor Zweigle, 2023
import React from "react";

import Dialog from "../Dialog";

const AnalyticsDialog = ({ open, onClose }) => {
  return (
    <Dialog title="Analytics" open={open} onClose={onClose} fullWidth>
      Analytics Dialog
    </Dialog>
  );
};

export default AnalyticsDialog;
