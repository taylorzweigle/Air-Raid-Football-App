//Taylor Zweigle, 2023
import React from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import BarChart from "../components/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GameHeaderCard from "../components/cards/GameHeaderCard";
import PlaysCard from "../components/cards/PlaysCard";

import { formations, plays, positions } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

const GamePage = () => {
  const params = useParams();

  const details = [
    { label: "Date", value: "00/00/0000" },
    { label: "Location", value: "N/A" },
    { label: "Result", value: "N/A" },
    { label: "Score", value: "0-0" },
    { label: "Plays", value: "0" },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <GameHeaderCard title={params.id} details={details} />
      </Grid>
      <Grid item xs={12} md={12} sx={mediaQueryDisplayNoneStyle}>
        <DetailsCard details={details} />
      </Grid>
      <Grid item xs={12} md={5}>
        <PlaysCard />
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

export default GamePage;
