//Taylor Zweigle, 2023
import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ButtonGroup = ({ items, value, onChange }) => {
  const toggleButtonStyle = {
    backgroundColor: "background.paper",
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
