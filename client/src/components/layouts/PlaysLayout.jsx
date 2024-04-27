//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDataContext } from "../../hooks/useDataContext";

import Card from "../../core/card/Card";
import BarChart from "../../core/charts/BarChart";

const PlaysLayout = ({ plays, selectedYear }) => {
  const { PLAYS } = useDataContext();

  const isInSeason = (date, season) => date.slice(6, 10) === season;

  const getSeasonPlaysTotals = (plays, season) => {
    const data = [];

    if (plays) {
      for (let i = 0; i < PLAYS.length; i++) {
        data.push(plays.filter((p) => p.play === PLAYS[i] && isInSeason(p.dateKey, season)).length);
      }
    }

    return data;
  };

  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
        <Typography variant="subtitle1">Plays</Typography>
        <BarChart series={PLAYS.map((play) => play.replaceAll("/", " / "))} data={getSeasonPlaysTotals(plays, selectedYear)} />
      </Stack>
    </Card>
  );
};

export default PlaysLayout;
