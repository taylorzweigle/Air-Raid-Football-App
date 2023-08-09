//Taylor Zweigle, 2023
import React from "react";

import { Card as MuiCard } from "@mui/material";

const Card = ({ children, padding, isScrollable }) => {
  const cardStyle = {
    height: isScrollable ? "780px" : "max-content",
    padding: padding ? "8px" : "0px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "background.border",
    backgroundColor: "background.paper",
    boxShadow: "none",
    borderRadius: 0,
    overflow: isScrollable ? "scroll" : "visible",
  };

  return <MuiCard sx={cardStyle}>{children}</MuiCard>;
};

export default Card;
