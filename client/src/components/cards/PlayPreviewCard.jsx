//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";

import Card from "../Card";
import Image from "../Image";
import SelectInput from "../SelectInput";

import { formations, plays } from "../../data/foundations";

import { images } from "../../img/index";

const PlayPreviewCard = () => {
  const theme = useSelector((state) => state.theme);

  const [selectedFormation, setSelectedFormation] = useState("ace");
  const [selectedPlay, setSelectedPlay] = useState("run");

  const handleSelectedFormation = (formation) => setSelectedFormation(formation);
  const handleSelectedPlay = (play) => setSelectedPlay(play);

  const getSelectedPlay = (play) => "_" + play.toString().replaceAll(" ", "_").replaceAll("/", "_").toLowerCase();

  const getFormations = () => formations.slice(0, formations.length - 1);
  const getPlays = () => plays.slice(0, plays.length - 1);

  const headerStyle = {
    padding: "8px 16px",
    backgroundColor: "background.border",
  };

  return (
    <Card>
      <Stack direction="column">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={headerStyle}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <SelectInput label="Formation" items={getFormations()} direction="row" onSelect={handleSelectedFormation} />
            <SelectInput label="Play" items={getPlays()} direction="row" onSelect={handleSelectedPlay} />
          </Stack>
        </Stack>
        <Image
          image={images[selectedFormation.toLowerCase()][theme === "light" ? "light" : "dark"][getSelectedPlay(selectedPlay)]}
          imageAlt={`${selectedFormation.toLowerCase()}${getSelectedPlay(selectedPlay)}`}
        />
      </Stack>
    </Card>
  );
};

export default PlayPreviewCard;
