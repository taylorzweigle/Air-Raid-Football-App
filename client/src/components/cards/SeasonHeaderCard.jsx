//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import HeaderCard from "./HeaderCard";
import SelectButton from "../buttons/SelectButton";

import AnalyticsDialog from "../dialogs/AnalyticsDialog";
import CreateGameDialog from "../dialogs/CreateGameDialog";

import { season } from "../../actions";

import { SEASONS } from "../../data/foundations";

const SeasonHeaderCard = ({ details }) => {
  const dispatch = useDispatch();

  const selectedSeason = useSelector((state) => state.season);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openAnalyticsDialog, setOpenAnalyticsDialog] = useState(false);

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);
  const handleOpenAnalyticsDialog = () => setOpenAnalyticsDialog(true);
  const handleCloseAnalyticsDialog = () => setOpenAnalyticsDialog(false);

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
        actions={
          <>
            <Button variant="outlined" color="secondary" onClick={() => handleOpenAnalyticsDialog()}>
              Analytics
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleOpenCreateDialog()}>
              Create Game
            </Button>
          </>
        }
      />
      <CreateGameDialog open={openCreateDialog} onClose={handleCloseCreateDialog} />
      <AnalyticsDialog open={openAnalyticsDialog} onClose={handleCloseAnalyticsDialog} />
    </>
  );
};

export default SeasonHeaderCard;
