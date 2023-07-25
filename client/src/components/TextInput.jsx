//Taylor Zweigle, 2023
import React from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const TextInput = ({ label, type, value, onChange }) => {
  const textFieldStyle = {
    backgroundColor: "background.paper",
  };

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="subtitle1">{label}</Typography>
      <TextField variant="outlined" size="small" type={type} value={value} onChange={onChange} sx={textFieldStyle} />
    </Stack>
  );
};

export default TextInput;
