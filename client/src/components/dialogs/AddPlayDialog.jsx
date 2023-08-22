//Taylor Zweigle, 2023
import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Dialog from "./Dialog";

import ButtonGroup from "../buttons/ButtonGroup";

import { DOWNS, DISTANCES, FORMATIONS, PLAYS, POSITIONS, RESULTS } from "../../data/foundations";

const AddPlayDialog = ({ dateKey, open, onClose }) => {
  const [down, setDown] = useState("");
  const [distance, setDistance] = useState("");
  const [formation, setFormation] = useState("");
  const [play, setPlay] = useState("");
  const [position, setPosition] = useState("");
  const [result, setResult] = useState("");
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

  const getRows = (items) => {
    let rows = [];
    let prev = 0;
    let count = items.length <= 5 ? 1 : Math.ceil(items.length / 5);

    for (let i = 0; i < count; i++) {
      rows.push(items.slice(prev, prev + 5));
      prev += 5;
    }

    return rows;
  };

  const handleResultChange = (e, value) => {
    setResult(value);

    if (value === "First Down") {
      setFirstDown(true);
      return;
    }
    if (value === "Touchdown") {
      setTouchdown(true);
      return;
    }
    if (value === "Interception") {
      setInterception(true);
      return;
    }
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const clearForm = () => {
    setDown("");
    setDistance("");
    setFormation("");
    setPlay("");
    setPosition("");
    setResult("");
    setFirstDown(false);
    setTouchdown(false);
    setInterception(false);
    setError(null);
  };

  return (
    <Dialog title="Add Play" open={open} maxWidth="sm" fullWidth isForm onClose={handleClose} onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Down</Typography>
          <ButtonGroup items={DOWNS} value={down} onChange={(e, value) => setDown(value)} />
        </Stack>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Distance</Typography>
          <ButtonGroup items={DISTANCES} value={distance} onChange={(e, value) => setDistance(value)} />
        </Stack>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Formation</Typography>
          <ButtonGroup items={FORMATIONS} value={formation} onChange={(e, value) => setFormation(value)} />
        </Stack>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Play</Typography>
          <Stack direction="column" spacing={0}>
            {getRows(PLAYS).map((row) => (
              <ButtonGroup key={row} items={row} value={play} onChange={(e, value) => setPlay(value)} />
            ))}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Position</Typography>
          <ButtonGroup items={POSITIONS} value={position} onChange={(e, value) => setPosition(value)} />
        </Stack>
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle1">Result</Typography>
          <ButtonGroup items={RESULTS} value={result} onChange={handleResultChange} />
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddPlayDialog;
