//Taylor Zweigle, 2023
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GamesCard from "../components/cards/GamesCard";
import SeasonHeaderCard from "../components/cards/SeasonHeaderCard";

import { FORMATIONS, PLAYS, POSITIONS } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

import { getGamesForSeason, getRecord } from "../utility/utility";

const HomePage = ({ games, plays }) => {
  const selectedSeason = useSelector((state) => state.season);

  const [includeFormationRuns, setIncludeFormationRuns] = useState(false);
  const [includePositionRuns, setIncludePositionRuns] = useState(false);

  const getPlaysTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < PLAYS.length; i++) {
        data.push(plays.filter((p) => p.play === PLAYS[i] && parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length);
      }
    }

    return data;
  };

  const getFormationsTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < FORMATIONS.length; i++) {
        data.push(
          plays.filter(
            (p) => p.formation === FORMATIONS[i] && parseInt(p.dateKey.slice(6, 10)) === selectedSeason && p.play !== "Run"
          ).length
        );
      }
    }

    return data;
  };

  const getFormationsTotalsWithRuns = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < FORMATIONS.length; i++) {
        data.push(
          plays.filter((p) => p.formation === FORMATIONS[i] && parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length
        );
      }
    }

    return data;
  };

  const getPositionsTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < POSITIONS.length; i++) {
        data.push(
          plays.filter(
            (p) => p.position === POSITIONS[i] && parseInt(p.dateKey.slice(6, 10)) === selectedSeason && p.play !== "Run"
          ).length
        );
      }
    }

    return data;
  };

  const getPositionsTotalsWithRuns = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < POSITIONS.length; i++) {
        data.push(
          plays.filter((p) => p.position === POSITIONS[i] && parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length
        );
      }
    }

    return data;
  };

  const getSeasonTotalPlays = () => {
    if (plays) {
      return plays.filter((p) => parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length;
    }
  };

  const getSeasonPlaysPerGame = () => {
    if (games) {
      return Math.round(getSeasonTotalPlays() / games.filter((g) => parseInt(g.date.slice(6, 10)) === selectedSeason).length);
    }
  };

  const getSeasonFirstDowns = () => {
    if (plays) {
      return plays.filter((p) => p.firstDown === true && parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length;
    }
  };

  const getSeasonTouchdowns = () => {
    if (plays) {
      return plays.filter((p) => p.touchdown === true && parseInt(p.dateKey.slice(6, 10)) === selectedSeason).length;
    }
  };

  const getTotalPlays = (dateKey) => {
    let data = 0;

    if (plays) {
      data = plays.filter((p) => p.dateKey === dateKey).length;
    }

    return data;
  };

  const tempDetails = [
    { label: "Record", value: getRecord(getGamesForSeason(games, selectedSeason)) },
    { label: "Total Plays", value: getSeasonTotalPlays() },
    { label: "Plays per Game", value: getSeasonPlaysPerGame() },
    { label: "First Downs", value: getSeasonFirstDowns() },
    { label: "Touchdowns", value: getSeasonTouchdowns() },
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
        <GamesCard games={games} plays={plays} />
        <ChartCard header="Total Plays per Game">
          <LineChart
            series={games ? getGamesForSeason(games, selectedSeason).map((game) => game.opponent) : []}
            data={games ? getGamesForSeason(games, selectedSeason).map((game) => getTotalPlays(game.date)) : []}
          />
        </ChartCard>
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays">
          <BarChart series={PLAYS.map((play) => play.replaceAll("/", " / "))} data={getPlaysTotals()} />
        </ChartCard>
        <ChartCard header="Formations" includeRun onIncludeRuns={() => setIncludeFormationRuns(!includeFormationRuns)}>
          <BarChart series={FORMATIONS} data={includeFormationRuns ? getFormationsTotalsWithRuns() : getFormationsTotals()} />
        </ChartCard>
        <ChartCard header="Positions" includeRun onIncludeRuns={() => setIncludePositionRuns(!includePositionRuns)}>
          <BarChart series={POSITIONS} data={includePositionRuns ? getPositionsTotalsWithRuns() : getPositionsTotals()} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default HomePage;
