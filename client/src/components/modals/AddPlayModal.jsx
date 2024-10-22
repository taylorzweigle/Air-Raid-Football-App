//Taylor Zweigle, 2024
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import * as Actions from "../../actions";

import ButtonGroup from "../../core/buttons/ButtonGroup";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useDataContext } from "../../hooks/useDataContext";
import { usePlaysContext } from "../../hooks/usePlaysContext";

import { createPlay } from "../../api/plays";

const AddPlayModal = ({ dateKey, open, onClose }) => {
  const { user } = useAuthContext();
  const { dispatchPlays } = usePlaysContext();

  const { DOWNS, DISTANCES, FORMATIONS, PLAYS, POSITIONS, RESULTS } = useDataContext();

  const [down, setDown] = useState("");
  const [distance, setDistance] = useState("");
  const [formation, setFormation] = useState("");
  const [play, setPlay] = useState("");
  const [position, setPosition] = useState("");
  const [result, setResult] = useState("");
  const [firstDown, setFirstDown] = useState(false);
  const [touchdown, setTouchdown] = useState(false);
  const [interception, setInterception] = useState(false);
  const [fumble, setFumble] = useState(false);
  const [sack, setSack] = useState(false);

  const [downError, setDownError] = useState("");
  const [distanceError, setDistanceError] = useState("");
  const [formationError, setFormationError] = useState("");
  const [playError, setPlayError] = useState("");
  const [positionError, setPositionError] = useState("");

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

    setFirstDown(false);
    setTouchdown(false);
    setInterception(false);
    setFumble(false);
    setSack(false);

    switch (value) {
      case "First Down":
        setFirstDown(true);
        break;
      case "Touchdown":
        setTouchdown(true);
        break;
      case "Interception":
        setInterception(true);
        break;
      case "Fumble":
        setFumble(true);
        break;
      case "Sack":
        setSack(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    clearErrors();

    const newPlay = {
      dateKey: dateKey,
      down: down,
      distance: distance,
      formation: formation,
      play: play,
      position: position,
      firstDown: firstDown,
      touchdown: touchdown,
      interception: interception,
      fumble: fumble,
      sack: sack,
    };

    const json = await createPlay(newPlay, user.token);

    if (json.error) {
      if (json.error.includes("down")) {
        setDownError("Down is required");
      }
      if (json.error.includes("distance")) {
        setDistanceError("Distance is required");
      }
      if (json.error.includes("formation")) {
        setFormationError("Formation is required");
      }
      if (json.error.includes("play")) {
        setPlayError("Play is required");
      }
      if (json.error.includes("position")) {
        setPositionError("Position is required");
      }
    }

    if (json.json) {
      dispatchPlays({ type: Actions.CREATE_PLAY, payload: json.json });

      clearForm();

      onClose();
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
    setFumble(false);
    setSack(false);

    clearErrors();
  };

  const clearErrors = () => {
    setDownError("");
    setDistanceError("");
    setFormationError("");
    setPlayError("");
    setPositionError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Play</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={1}>
              <Stack direction="column" spacing={0}>
                <Typography variant="subtitle1">Down</Typography>
                <ButtonGroup items={DOWNS} value={down} onChange={(e, value) => setDown(value)} />
              </Stack>
              <Typography variant="caption">{downError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Stack direction="column" spacing={0}>
                <Typography variant="subtitle1">Distance</Typography>
                <ButtonGroup
                  items={DISTANCES}
                  value={distance}
                  onChange={(e, value) => setDistance(value)}
                />
              </Stack>
              <Typography variant="caption">{distanceError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Stack direction="column" spacing={0}>
                <Typography variant="subtitle1">Formation</Typography>
                <ButtonGroup
                  items={FORMATIONS}
                  value={formation}
                  onChange={(e, value) => setFormation(value)}
                />
              </Stack>
              <Typography variant="caption">{formationError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Stack direction="column" spacing={0}>
                <Typography variant="subtitle1">Play</Typography>
                <Stack direction="column" spacing={0}>
                  {getRows(PLAYS).map((row) => (
                    <ButtonGroup
                      key={row}
                      items={row}
                      value={play}
                      onChange={(e, value) => setPlay(value)}
                    />
                  ))}
                </Stack>
              </Stack>
              <Typography variant="caption">{playError}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Stack direction="column" spacing={0}>
                <Typography variant="subtitle1">Position</Typography>
                <ButtonGroup
                  items={POSITIONS}
                  value={position}
                  onChange={(e, value) => setPosition(value)}
                />
              </Stack>
              <Typography variant="caption">{positionError}</Typography>
            </Stack>
            <Stack direction="column" spacing={0}>
              <Typography variant="subtitle1">Result</Typography>
              <ButtonGroup items={RESULTS} value={result} onChange={handleResultChange} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPlayModal;
