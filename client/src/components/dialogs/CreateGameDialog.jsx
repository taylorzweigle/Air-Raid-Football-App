//Taylor Zweigle, 2023
import React, { useState } from "react";

import Stack from "@mui/material/Stack";

import Dialog from "./Dialog";

import TextInput from "../textInputs/TextInput";

const CreateGameDialog = ({ open, onClose }) => {
  const [opponent, setOpponent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const game = { opponent, location, date, score, opponentScore };

    const response = await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(game),
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
    setOpponent("");
    setLocation("");
    setDate("");
    setScore("");
    setOpponentScore("");
    setError(null);
  };

  return (
    <Dialog title="Create Game" open={open} maxWidth="xs" fullWidth isForm onClose={handleClose} onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <TextInput label="Opponent" type="text" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
        <TextInput label="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <TextInput label="Date" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <TextInput label="Score" type="number" value={score} onChange={(e) => setScore(e.target.value)} />
          <TextInput
            label="Opponent Score"
            type="number"
            value={opponentScore}
            onChange={(e) => setOpponentScore(e.target.value)}
          />
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default CreateGameDialog;
