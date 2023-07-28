//Taylor Zweigle, 2023
import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SelectButton from "../buttons/SelectButton";

import Dialog from "../Dialog";

import { dataDowns, dataDistances, dataFormations, dataPlays, dataPositions } from "../../data/foundations";

const AddPlayDialog = ({ open, onClose }) => {
  const [dateKey, setDateKey] = useState("09/02/2017");
  const [down, setDown] = useState("");
  const [distance, setDistance] = useState("");
  const [formation, setFormation] = useState("");
  const [play, setPlay] = useState("");
  const [position, setPosition] = useState("");
  const [firstDown, setFirstDown] = useState(false);
  const [touchdown, setTouchdown] = useState(false);
  const [interception, setInterception] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlay = { dateKey, down, distance, formation, play, position, firstDown, touchdown, interception };

    const response = await fetch("/api/plays", {
      method: "POST",
      body: JSON.stringify(newPlay),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(error);
    }
    if (response.ok) {
      clearForm();
    }
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const clearForm = () => {
    setDateKey("09/02/2017");
    setDown("");
    setDistance("");
    setFormation("");
    setPlay("");
    setPosition("");
    setFirstDown(false);
    setTouchdown(false);
    setInterception(false);
    setError(null);
  };

  return (
    <Dialog title="Add Play" open={open} fullWidth={true} onClose={handleClose} onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Down</Typography>
          <SelectButton items={dataDowns} defaultValue={null} onSelect={(down) => setDown(down)} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Distance</Typography>
          <SelectButton items={dataDistances} defaultValue={null} onSelect={(distance) => setDistance(distance)} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Formation</Typography>
          <SelectButton items={dataFormations} defaultValue={null} onSelect={(formation) => setFormation(formation)} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Play</Typography>
          <SelectButton items={dataPlays} defaultValue={null} onSelect={(play) => setPlay(play)} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Position</Typography>
          <SelectButton items={dataPositions} defaultValue={null} onSelect={(position) => setPosition(position)} />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">Result</Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddPlayDialog;
