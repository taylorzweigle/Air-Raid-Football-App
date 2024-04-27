//Taylor Zweigle, 2024
import React from "react";

import { Card as MuiCard } from "@mui/material";

const Card = ({ children }) => {
  const cardStyle = {
    padding: "0px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "background.border",
    backgroundColor: "background.paper",
    boxShadow: "none",
    borderRadius: 0,
  };

  return <MuiCard sx={cardStyle}>{children}</MuiCard>;
};

export default Card;
