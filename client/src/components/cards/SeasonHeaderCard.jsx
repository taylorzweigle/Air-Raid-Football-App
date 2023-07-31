//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import HeaderCard from "./HeaderCard";
import SelectButton from "../buttons/SelectButton";

import CreateGameDialog from "../dialogs/CreateGameDialog";

import { season } from "../../actions";

import { SEASONS } from "../../data/foundations";

const SeasonHeaderCard = ({ details }) => {
  const dispatch = useDispatch();

  const selectedSeason = useSelector((state) => state.season);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSeasonSelect = (s) => dispatch(season(s));

  return (
    <>
      <HeaderCard
        navigationButton={
          <SelectButton
            items={SEASONS}
            defaultValue={selectedSeason}
            minWidth={128}
            onSelect={(season) => handleSeasonSelect(season)}
          />
        }
        title={"Football Season"}
        details={details}
        actionButton={
          <Button variant="contained" onClick={() => handleOpen()}>
            Create Game
          </Button>
        }
      />
      <CreateGameDialog open={open} onClose={handleClose} />
    </>
  );
};

export default SeasonHeaderCard;
