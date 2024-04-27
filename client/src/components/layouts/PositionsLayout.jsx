//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDataContext } from "../../hooks/useDataContext";

import Card from "../../core/card/Card";
import BarChart from "../../core/charts/BarChart";

const PositionsLayout = ({ plays, selectedYear }) => {
  const { POSITIONS } = useDataContext();

  const isInSeason = (date, season) => date.slice(6, 10) === season;

  const getSeasonPositionsTotals = (plays, season) => {
    const data = [];

    if (plays) {
      for (let i = 0; i < POSITIONS.length; i++) {
        data.push(plays.filter((p) => p.position === POSITIONS[i] && isInSeason(p.dateKey, season)).length);
      }
    }

    return data;
  };

  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
        <Typography variant="subtitle1">Positions</Typography>
        <BarChart series={POSITIONS} data={getSeasonPositionsTotals(plays, selectedYear)} />
      </Stack>
    </Card>
  );
};

export default PositionsLayout;
