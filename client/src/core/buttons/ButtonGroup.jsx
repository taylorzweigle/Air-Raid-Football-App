//Taylor Zweigle, 2024
import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ButtonGroup = ({ items, value, onChange }) => {
  const toggleButtonStyle = {
    backgroundColor: "background.paper",
    borderColor: "grey.400",
  };

  return (
    <ToggleButtonGroup value={value} onChange={onChange} size="small" exclusive fullWidth>
      {items.map((item) => (
        <ToggleButton key={item} value={item} color="primary" sx={toggleButtonStyle}>
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ButtonGroup;
