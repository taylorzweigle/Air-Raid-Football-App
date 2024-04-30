//Taylor Zweigle, 2024
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { useDataContext } from "../../hooks/useDataContext";
import { useThemeContext } from "../../hooks/useThemeContext";

import { images } from "../../img";

import Card from "../../core/card/Card";

const PlaybookModal = ({ open, onClose }) => {
  const { FORMATIONS, PLAYS } = useDataContext();
  const { theme } = useThemeContext();

  const [formation, setFormation] = useState("Ace");
  const [play, setPlay] = useState("Run");

  const getSelectedPlay = (play) => "_" + play.toString().replaceAll(" ", "_").replaceAll("/", "_").toLowerCase();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Playbook</DialogTitle>
      <DialogContent>
        <Card>
          <Stack direction="column">
            <Stack direction="row">
              <Select
                defaultValue={formation}
                onChange={(e) => setFormation(e.target.value)}
                sx={{ minWidth: 128, backgroundColor: "background.paper" }}
              >
                {FORMATIONS.map((formation) => (
                  <MenuItem key={formation} value={formation}>
                    {formation}
                  </MenuItem>
                ))}
              </Select>
              <Select
                defaultValue={play}
                onChange={(e) => setPlay(e.target.value)}
                sx={{ minWidth: 256, backgroundColor: "background.paper" }}
              >
                {PLAYS.map((play) => (
                  <MenuItem key={play} value={play}>
                    {play}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Divider />
            <img
              src={images[formation.toLowerCase()][theme === "light" ? "light" : "dark"][getSelectedPlay(play)]}
              alt={`${formation.toLowerCase()}${getSelectedPlay(play)}`}
            />
          </Stack>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaybookModal;
