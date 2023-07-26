//Taylor Zweigle, 2023
import React, { useState } from "react";

import { ButtonGroup as MuiButtonGroup } from "@mui/material/";
import Stack from "@mui/material/Stack";

import ButtonGroupButton from "./ButtonGroupButton";

const ButtonGroup = ({ items }) => {
  const [selected, setSelected] = useState("");

  const getRows = () => {
    let rows = [];
    let prev = 0;
    let count = items.length <= 5 ? 1 : Math.ceil(items.length / 5);

    for (let i = 0; i < count; i++) {
      rows.push(items.slice(prev, prev + 5));
      prev += 5;
    }

    return rows;
  };

  const handleOnClick = (item) => {
    if (item === selected) {
      setSelected("");
    } else {
      setSelected(item);
    }
  };

  const buttonGroupStyle = {
    width: "100%",
  };

  return (
    <Stack direction="column" spacing={0}>
      {getRows().map((row) => (
        <MuiButtonGroup key={row} sx={buttonGroupStyle}>
          {row.map((item) => (
            <ButtonGroupButton key={item} selected={selected === item} onClick={(item) => handleOnClick(item)}>
              {item}
            </ButtonGroupButton>
          ))}
        </MuiButtonGroup>
      ))}
    </Stack>
  );
};

export default ButtonGroup;
