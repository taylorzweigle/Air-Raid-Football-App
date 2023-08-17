//Taylor Zweigle, 2023
import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import Card from "../Card";
import Dialog from "../Dialog";
import SelectButton from "../buttons/SelectButton";

import ChartCard from "../cards/ChartCard";

import BarChart from "../charts/BarChart";
import TotalsTable from "../tables/TotalsTable";

import { FORMATIONS, PLAYS, POSITIONS, SEASONS } from "../../data/foundations";

import { getFormationPlayTotals, getPlayTotals, getPositionPlayTotals } from "../../utility/utility";

const AnalyticsDialog = ({ open, plays, onClose }) => {
  const [selectedPlay, setSelectedPlay] = useState("Run");
  const [selectedSeason, setSelectedSeason] = useState("All");

  const handleSelectedPlay = (play) => setSelectedPlay(play);
  const handleSelectedSeason = (season) => setSelectedSeason(season);

  const getPlays = () => PLAYS.slice(0, PLAYS.length - 1);

  return (
    <Dialog title="Analytics" open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card padding>
            <SelectButton
              minWidth={128}
              items={["All", ...SEASONS]}
              defaultValue={selectedSeason}
              direction="row"
              onSelect={handleSelectedSeason}
            />
            <SelectButton
              minWidth={256}
              items={getPlays()}
              defaultValue={selectedPlay}
              direction="row"
              onSelect={handleSelectedPlay}
            />
            <ChartCard header="Play by Formation">
              <BarChart series={FORMATIONS} data={getFormationPlayTotals(plays, selectedSeason, selectedPlay)} />
            </ChartCard>
            <ChartCard header="Play by Position">
              <BarChart series={POSITIONS} data={getPositionPlayTotals(plays, selectedSeason, selectedPlay)} />
            </ChartCard>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard header="Plays by Result Totals" />
          <Card height={534} isScrollable>
            <TotalsTable plays={getPlayTotals(plays)} />
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AnalyticsDialog;
