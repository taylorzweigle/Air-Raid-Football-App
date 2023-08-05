//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import BarChart from "../components/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GameHeaderCard from "../components/cards/GameHeaderCard";
import PlaysCard from "../components/cards/PlaysCard";

import { FORMATIONS, PLAYS, POSITIONS } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

import { calculateWin, convertDate } from "../utility/utility";

const GamePage = ({ plays }) => {
  const params = useParams();

  const [game, setGame] = useState({});
  const [formationIncludeRuns, setFormationIncludeRuns] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch("/api/games/" + params.id);

      if (response.ok) {
        setGame(await response.json());
      }
    };

    fetchGame();
  }, [params.id]);

  const getPlaysTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < PLAYS.length; i++) {
        data.push(plays.filter((p) => p.play === PLAYS[i] && p.dateKey === game.date).length);
      }
    }

    return data;
  };

  const getFormationsTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < FORMATIONS.length; i++) {
        data.push(plays.filter((p) => p.formation === FORMATIONS[i] && p.dateKey === game.date && p.play !== "Run").length);
      }
    }

    return data;
  };

  const getPositionsTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < POSITIONS.length; i++) {
        if (formationIncludeRuns) {
          data.push(plays.filter((p) => p.position === POSITIONS[i] && p.dateKey === game.date).length);
        } else {
          data.push(plays.filter((p) => p.position === POSITIONS[i] && p.dateKey === game.date && p.play !== "Run").length);
        }
      }
    }

    return data;
  };

  const getTotalPlays = () => {
    const data = [];

    if (plays) {
      data.push(plays.filter((p) => p.dateKey === game.date).length);
    }

    return data;
  };

  const details = [
    { label: "Date", value: convertDate(game.date) },
    { label: "Location", value: game.location },
    { label: "Result", value: calculateWin(game.score, game.opponentScore) ? "W" : "L" },
    { label: "Score", value: `${game.score}-${game.opponentScore}` },
    { label: "Plays", value: getTotalPlays() },
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
        <ChartCard header="Plays">
          <BarChart series={PLAYS.map((play) => play.replaceAll("/", " / "))} data={getPlaysTotals()} />
        </ChartCard>
        <ChartCard header="Formations" includeRun onIncludeRuns={() => setFormationIncludeRuns(!formationIncludeRuns)}>
          <BarChart series={FORMATIONS} data={getFormationsTotals()} />
        </ChartCard>
        <ChartCard header="Positions" includeRun>
          <BarChart series={POSITIONS} data={getPositionsTotals()} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default GamePage;
