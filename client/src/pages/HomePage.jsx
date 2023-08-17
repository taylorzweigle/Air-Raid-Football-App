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

import {
  abbreviateOpponent,
  getRecord,
  getSeasonFirstDowns,
  getSeasonFormationsTotals,
  getSeasonFormationsTotalsWithRuns,
  getSeasonGames,
  getSeasonPlaysPerGame,
  getSeasonPlaysTotals,
  getSeasonPlaysTotalsWithRuns,
  getSeasonPositionsTotals,
  getSeasonPositionsTotalsWithRuns,
  getSeasonTotalPlays,
  getSeasonTotalPlaysPerOpponent,
  getSeasonTouchdowns,
} from "../utility/utility";

const HomePage = ({ games, plays }) => {
  const selectedSeason = useSelector((state) => state.season);

  const [includePlaysRuns, setIncludePlaysRuns] = useState(false);
  const [includeFormationRuns, setIncludeFormationRuns] = useState(false);
  const [includePositionRuns, setIncludePositionRuns] = useState(false);

  const details = [
    { label: "Record", value: getRecord(getSeasonGames(games, selectedSeason)) },
    { label: "Total Plays", value: getSeasonTotalPlays(plays, selectedSeason) },
    { label: "Plays per Game", value: getSeasonPlaysPerGame(games, plays, selectedSeason) },
    { label: "First Downs", value: getSeasonFirstDowns(plays, selectedSeason) },
    { label: "Touchdowns", value: getSeasonTouchdowns(plays, selectedSeason) },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <SeasonHeaderCard details={details} plays={plays} />
      </Grid>
      <Grid item xs={12} md={12} sx={mediaQueryDisplayNoneStyle}>
        <DetailsCard details={details} />
      </Grid>
      <Grid item xs={12} md={5}>
        <GamesCard games={games} plays={plays} />
        <ChartCard header="Total Plays per Game">
          <LineChart
            series={games ? getSeasonGames(games, selectedSeason).map((game) => abbreviateOpponent(game.opponent)) : []}
            data={
              games ? getSeasonGames(games, selectedSeason).map((game) => getSeasonTotalPlaysPerOpponent(plays, game.date)) : []
            }
          />
        </ChartCard>
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays" includeRun onIncludeRuns={() => setIncludePlaysRuns(!includePlaysRuns)}>
          <BarChart
            series={PLAYS.map((play) => play.replaceAll("/", " / "))}
            data={
              includePlaysRuns
                ? getSeasonPlaysTotalsWithRuns(plays, selectedSeason)
                : getSeasonPlaysTotals(plays, selectedSeason)
            }
          />
        </ChartCard>
        <ChartCard header="Formations" includeRun onIncludeRuns={() => setIncludeFormationRuns(!includeFormationRuns)}>
          <BarChart
            series={FORMATIONS}
            data={
              includeFormationRuns
                ? getSeasonFormationsTotalsWithRuns(plays, selectedSeason)
                : getSeasonFormationsTotals(plays, selectedSeason)
            }
          />
        </ChartCard>
        <ChartCard header="Positions" includeRun onIncludeRuns={() => setIncludePositionRuns(!includePositionRuns)}>
          <BarChart
            series={POSITIONS}
            data={
              includePositionRuns
                ? getSeasonPositionsTotalsWithRuns(plays, selectedSeason)
                : getSeasonPositionsTotals(plays, selectedSeason)
            }
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default HomePage;
