//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";

import Card from "../Card";
import Dialog from "../Dialog";
import Image from "../Image";
import SelectInput from "../SelectInput";

import { FORMATIONS, PLAYS } from "../../data/foundations";

import { images } from "../../img/index";

const PlaybookDialog = ({ open, onClose }) => {
  const theme = useSelector((state) => state.theme);

  const [selectedFormation, setSelectedFormation] = useState("Ace");
  const [selectedPlay, setSelectedPlay] = useState("Run");

  const handleSelectedFormation = (formation) => setSelectedFormation(formation);
  const handleSelectedPlay = (play) => setSelectedPlay(play);

  const getSelectedPlay = (play) => "_" + play.toString().replaceAll(" ", "_").replaceAll("/", "_").toLowerCase();

  const getFormations = () => FORMATIONS.slice(0, FORMATIONS.length - 1);
  const getPlays = () => PLAYS.slice(0, PLAYS.length - 1);

  const headerStyle = {
    padding: "8px 16px",
    backgroundColor: "background.border",
  };

  return (
    <Dialog title="Playbook" open={open} onClose={onClose}>
      <Card>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={headerStyle}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <SelectInput
                label="Formation"
                items={getFormations()}
                defaultValue={selectedFormation}
                direction="row"
                onSelect={handleSelectedFormation}
              />
              <SelectInput
                label="Play"
                items={getPlays()}
                defaultValue={selectedPlay}
                direction="row"
                onSelect={handleSelectedPlay}
              />
            </Stack>
          </Stack>
          <Image
            image={images[selectedFormation.toLowerCase()][theme === "light" ? "light" : "dark"][getSelectedPlay(selectedPlay)]}
            imageAlt={`${selectedFormation.toLowerCase()}${getSelectedPlay(selectedPlay)}`}
          />
        </Stack>
      </Card>
    </Dialog>
  );
};

export default PlaybookDialog;
