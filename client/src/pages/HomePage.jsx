//Taylor Zweigle, 2023
import React from "react";

import Grid from "@mui/material/Grid";

import BarChart from "../components/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GamesCard from "../components/cards/GamesCard";
import SeasonHeaderCard from "../components/cards/SeasonHeaderCard";
import PlayPreviewCard from "../components/cards/PlayPreviewCard";

import { formations, plays, positions } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

const HomePage = () => {
  const tempDetails = [
    { label: "Record", value: "0-0" },
    { label: "Total Plays", value: "0" },
    { label: "Plays per Game", value: "0" },
    { label: "First Downs", value: "0" },
    { label: "Touchdowns", value: "0" },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <SeasonHeaderCard details={tempDetails} />
      </Grid>
      <Grid item xs={12} md={12} sx={mediaQueryDisplayNoneStyle}>
        <DetailsCard details={tempDetails} />
      </Grid>
      <Grid item xs={12} md={5}>
        <GamesCard />
        <PlayPreviewCard />
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays">
          <BarChart
            series={plays.map((play) => play.replaceAll("/", " / "))}
            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
        </ChartCard>
        <ChartCard header="Formations">
          <BarChart series={formations} data={[0, 0, 0, 0, 0, 0, 0]} />
        </ChartCard>
        <ChartCard header="Positions">
          <BarChart series={positions} data={[0, 0, 0, 0, 0]} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default HomePage;
