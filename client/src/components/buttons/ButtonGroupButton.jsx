//Taylor Zweigle, 2023
import React from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";

import CheckIcon from "@mui/icons-material/Check";

const ButtonGroupButton = ({ children, selected, onClick }) => {
  const theme = useSelector((state) => state.theme);

  const getButtonStyling = (selected) => {
    return {
      backgroundColor: selected ? (theme === "light" ? "primary.light" : "primary.dark") : "background.paper",
      fontWeight: selected ? 700 : 400,
      width: "100%",
    };
  };

  return (
    <Button
      variant="outlined"
      color={selected ? "primary" : "secondary"}
      startIcon={selected ? <CheckIcon /> : null}
      onClick={(item) => onClick(item.target.textContent)}
      sx={getButtonStyling(selected)}
    >
      {children}
    </Button>
  );
};

export default ButtonGroupButton;
