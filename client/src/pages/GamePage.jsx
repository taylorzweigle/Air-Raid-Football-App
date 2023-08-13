//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import BarChart from "../components/charts/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GameHeaderCard from "../components/cards/GameHeaderCard";
import PlaysCard from "../components/cards/PlaysCard";

import { FORMATIONS, PLAYS, POSITIONS } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

import {
  calculateWin,
  convertDate,
  getGameFormationsTotals,
  getGameFormationsTotalsWithRuns,
  getGamePlaysTotals,
  getGamePlaysTotalsWithRuns,
  getGamePositionsTotals,
  getGamePositionsTotalsWithRuns,
  getGameTotalPlays,
} from "../utility/utility";

const GamePage = ({ plays }) => {
  const params = useParams();

  const [game, setGame] = useState({});
  const [includePlaysRuns, setIncludePlaysRuns] = useState(false);
  const [includeFormationRuns, setIncludeFormationRuns] = useState(false);
  const [includePositionRuns, setIncludePositionRuns] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch("/api/games/" + params.id);

      if (response.ok) {
        setGame(await response.json());
      }
    };

    fetchGame();
  }, [params.id]);

  const details = [
    { label: "Date", value: convertDate(game.date) },
    { label: "Location", value: game.location },
    { label: "Result", value: calculateWin(game.score, game.opponentScore) ? "W" : "L" },
    { label: "Score", value: `${game.score}-${game.opponentScore}` },
    { label: "Plays", value: getGameTotalPlays(plays, game.date) },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <GameHeaderCard title={game.opponent} details={details} dateKey={game.date} />
      </Grid>
      <Grid item xs={12} md={12} sx={mediaQueryDisplayNoneStyle}>
        <DetailsCard details={details} />
      </Grid>
      <Grid item xs={12} md={5}>
        <PlaysCard plays={plays} dateKey={game.date} />
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays" includeRun onIncludeRuns={() => setIncludePlaysRuns(!includePlaysRuns)}>
          <BarChart
            series={PLAYS.map((play) => play.replaceAll("/", " / "))}
            data={includePlaysRuns ? getGamePlaysTotalsWithRuns(plays, game.date) : getGamePlaysTotals(plays, game.date)}
          />
        </ChartCard>
        <ChartCard header="Formations" includeRun onIncludeRuns={() => setIncludeFormationRuns(!includeFormationRuns)}>
          <BarChart
            series={FORMATIONS}
            data={
              includeFormationRuns
                ? getGameFormationsTotalsWithRuns(plays, game.date)
                : getGameFormationsTotals(plays, game.date)
            }
          />
        </ChartCard>
        <ChartCard header="Positions" includeRun onIncludeRuns={() => setIncludePositionRuns(!includePositionRuns)}>
          <BarChart
            series={POSITIONS}
            data={
              includePositionRuns ? getGamePositionsTotalsWithRuns(plays, game.date) : getGamePositionsTotals(plays, game.date)
            }
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default GamePage;
