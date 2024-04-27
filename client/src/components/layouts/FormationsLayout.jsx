//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDataContext } from "../../hooks/useDataContext";

import Card from "../../core/card/Card";
import BarChart from "../../core/charts/BarChart";

const FormationsLayout = ({ plays, selectedYear }) => {
  const { FORMATIONS } = useDataContext();

  const isInSeason = (date, season) => date.slice(6, 10) === season;

  const getSeasonFormationsTotals = (plays, season) => {
    const data = [];

    if (plays) {
      for (let i = 0; i < FORMATIONS.length; i++) {
        data.push(plays.filter((p) => p.formation === FORMATIONS[i] && isInSeason(p.dateKey, season)).length);
      }
    }

    return data;
  };

  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
        <Typography variant="subtitle1">Formations</Typography>
        <BarChart series={FORMATIONS} data={getSeasonFormationsTotals(plays, selectedYear)} />
      </Stack>
    </Card>
  );
};

export default FormationsLayout;
