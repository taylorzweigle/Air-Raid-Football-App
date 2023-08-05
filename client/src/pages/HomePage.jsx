//Taylor Zweigle, 2023
import React from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import BarChart from "../components/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GamesCard from "../components/cards/GamesCard";
import SeasonHeaderCard from "../components/cards/SeasonHeaderCard";
import PlayPreviewCard from "../components/cards/PlayPreviewCard";

import { FORMATIONS, PLAYS, POSITIONS } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

import { getGamesForSeason, getRecord } from "../utility/utility";

const HomePage = ({ games, plays }) => {
  const selectedSeason = useSelector((state) => state.season);

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
        <PlayPreviewCard />
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays">
          <BarChart series={PLAYS.map((play) => play.replaceAll("/", " / "))} data={getPlaysTotals()} />
        </ChartCard>
        <ChartCard header="Formations" includeRun>
          <BarChart series={FORMATIONS} data={getFormationsTotals()} />
        </ChartCard>
        <ChartCard header="Positions" includeRun>
          <BarChart series={POSITIONS} data={getPositionsTotals()} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default HomePage;
