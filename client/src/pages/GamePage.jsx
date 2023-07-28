//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import BarChart from "../components/BarChart";

import ChartCard from "../components/cards/ChartCard";
import DetailsCard from "../components/cards/DetailsCard";
import GameHeaderCard from "../components/cards/GameHeaderCard";
import PlaysCard from "../components/cards/PlaysCard";

import { dataFormations, dataPlays, dataPositions } from "../data/foundations";

import { mediaQueryDisplayNoneStyle } from "../styles/style";

import { calculateWin, convertDate } from "../utility/utility";

const GamePage = () => {
  const params = useParams();

  const [game, setGame] = useState({});

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
    { label: "Plays", value: "0" },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <GameHeaderCard title={game.opponent} details={details} />
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
            series={dataPlays.map((play) => play.replaceAll("/", " / "))}
            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
        </ChartCard>
        <ChartCard header="Formations">
          <BarChart series={dataFormations} data={[0, 0, 0, 0, 0, 0, 0]} />
        </ChartCard>
        <ChartCard header="Positions">
          <BarChart series={dataPositions} data={[0, 0, 0, 0, 0]} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default GamePage;
