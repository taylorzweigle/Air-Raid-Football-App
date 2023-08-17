//Taylor Zweigle, 2023
import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import Card from "../Card";
import Dialog from "../Dialog";
import SelectButton from "../buttons/SelectButton";

import ChartCard from "../cards/ChartCard";

import BarChart from "../charts/BarChart";
import TotalsTable from "../tables/TotalsTable";

import { FORMATIONS, PLAYS, POSITIONS } from "../../data/foundations";

import { getFormationPlayTotals, getPositionPlayTotals } from "../../utility/utility";

const AnalyticsDialog = ({ open, plays, onClose }) => {
  const [selectedPlay, setSelectedPlay] = useState("Run");

  const handleSelectedPlay = (play) => setSelectedPlay(play);

  const getPlays = () => PLAYS.slice(0, PLAYS.length - 1);

  return (
    <Dialog title="Analytics" open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Card padding>
            <SelectButton
              label="Play"
              minWidth={256}
              items={getPlays()}
              defaultValue={selectedPlay}
              direction="row"
              onSelect={handleSelectedPlay}
            />
            <ChartCard header="Play by Formation">
              <BarChart series={FORMATIONS} data={getFormationPlayTotals(plays, selectedPlay)} />
            </ChartCard>
            <ChartCard header="Play by Position">
              <BarChart series={POSITIONS} data={getPositionPlayTotals(plays, selectedPlay)} />
            </ChartCard>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <ChartCard header="Play by First Down">
            <TotalsTable />
          </ChartCard>
          <ChartCard header="Play by Touchdown">
            <TotalsTable />
          </ChartCard>
          <ChartCard header="Play by Interception">
            <TotalsTable />
          </ChartCard>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AnalyticsDialog;
