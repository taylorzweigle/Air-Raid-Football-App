//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import Dialog from "./Dialog";

import Image from "../images/Image";

import SelectButton from "../buttons/SelectButton";

import Card from "../cards/Card";

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

  return (
    <Dialog title="Playbook" open={open} maxWidth="md" fullWidth onClose={onClose}>
      <Card>
        <Stack direction="column">
          <Box>
            <SelectButton
              minWidth={128}
              items={getFormations()}
              defaultValue={selectedFormation}
              direction="row"
              onSelect={handleSelectedFormation}
            />
            <SelectButton
              minWidth={256}
              items={getPlays()}
              defaultValue={selectedPlay}
              direction="row"
              onSelect={handleSelectedPlay}
            />
          </Box>
          <Divider />
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
