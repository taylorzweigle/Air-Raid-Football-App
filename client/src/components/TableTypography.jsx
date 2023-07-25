//Taylor Zweigle, 2023
import React from "react";

import Typography from "@mui/material/Typography";

const TableTypography = ({ children, isWin, isBold }) => {
  const boldStyle = {
    fontWeight: "bold",
  };

  return (
    <Typography variant="body2" color={isWin ? "primary" : "text.secondary"} sx={isBold ? boldStyle : null}>
      {children}
    </Typography>
  );
};

export default TableTypography;
