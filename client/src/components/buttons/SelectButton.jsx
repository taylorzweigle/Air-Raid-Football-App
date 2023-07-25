//Taylor Zweigle, 2023
import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectButton = ({ defaultValue, items, minWidth, onSelect }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };

  const selectStyle = {
    minWidth: minWidth,
    backgroundColor: "background.paper",
  };

  return (
    <FormControl size="small">
      <Select value={value} onChange={handleChange} sx={selectStyle}>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectButton;
