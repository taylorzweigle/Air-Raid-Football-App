//Taylor Zweigle, 2023
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useGamesContext } from "../../hooks/useGamesContext";

import { createGame } from "../../api/games";

const CreateGameModal = ({ open, onClose }) => {
  const { user } = useAuthContext();
  const { dispatchGames } = useGamesContext();

  const [opponent, setOpponent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");

  const [opponentError, setOpponentError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [dateError, setDateError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [opponentScoreError, setOpponentScoreError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    clearErrors();

    const game = {
      opponent: opponent,
      location: location,
      date: date,
      score: score,
      opponentScore: opponentScore,
    };

    const json = await createGame(game, user.token);

    if (json.error) {
      if (json.error.includes("opponent")) {
        setOpponentError("Opponent is required");
      }
      if (json.error.includes("location")) {
        setLocationError("Location is required");
      }
      if (json.error.includes("date")) {
        setDateError("Date is required");
      }
      if (json.error.includes("score")) {
        setScoreError("Score is required");
      }
      if (json.error.includes("opponentScore")) {
        setOpponentScoreError("Opponent Score is required");
      }
    }

    if (json.json) {
      dispatchGames({ type: Actions.CREATE_GAME, payload: json.json });

      clearForm();

      onClose();
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

    clearErrors();
  };

  const clearErrors = () => {
    setOpponentError("");
    setLocationError("");
    setDateError("");
    setScoreError("");
    setOpponentScoreError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create Game</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Opponent"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                error={opponentError !== ""}
                sx={{ backgroundColor: "background.paper" }}
              />
              <Typography variant="caption">{opponentError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={locationError !== ""}
                sx={{ backgroundColor: "background.paper" }}
              />
              <Typography variant="caption">{locationError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={dateError !== ""}
                sx={{ backgroundColor: "background.paper" }}
              />
              <Typography variant="caption">{dateError}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <TextField
                  label="Score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  error={scoreError !== ""}
                  sx={{ backgroundColor: "background.paper" }}
                />
                <Typography variant="caption">{scoreError}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <TextField
                  label="Opponent Score"
                  value={opponentScore}
                  onChange={(e) => setOpponentScore(e.target.value)}
                  error={opponentScoreError !== ""}
                  sx={{ backgroundColor: "background.paper" }}
                />
                <Typography variant="caption">{opponentScoreError}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateGameModal;
