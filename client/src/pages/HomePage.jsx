//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import * as Actions from "../actions";

import FormationsLayout from "../components/layouts/FormationsLayout";
import GamesLayout from "../components/layouts/GamesLayout";
import HomeHeaderLayout from "../components/layouts/HomeHeaderLayout";
import PlaysLayout from "../components/layouts/PlaysLayout";
import PositionsLayout from "../components/layouts/PositionsLayout";
import TotalPlaysLayout from "../components/layouts/TotalPlaysLayout";

import { useAuthContext } from "../hooks/useAuthContext";
import { useGamesContext } from "../hooks/useGamesContext";

import { getGames } from "../api/games";

const HomePage = () => {
  const { user } = useAuthContext();
  const { games, dispatchGames } = useGamesContext();

  const [selectedYear, setSelectedYear] = useState("2017");

  const details = [
    { label: "Record", value: "9-4" },
    { label: "Total Plays", value: "1009" },
    { label: "Plays per Game", value: "78" },
    { label: "First Downs", value: "262" },
    { label: "Touchdowns", value: "45" },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames(user.token);

      dispatchGames({ type: Actions.GET_GAMES, payload: games.json });
    };

    if (user) {
      fetchGames();
    }
  }, [user, dispatchGames]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <HomeHeaderLayout details={details} selectedYear={selectedYear} onSelectYear={(year) => setSelectedYear(year)} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid item xs={12}>
          <GamesLayout games={games && games.filter((game) => game.date.slice(6, 10) === selectedYear)} />
        </Grid>
        <Grid item xs={12}>
          <TotalPlaysLayout />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Grid item xs={12}>
          <PlaysLayout />
        </Grid>
        <Grid item xs={12}>
          <FormationsLayout />
        </Grid>
        <Grid item xs={12}>
          <PositionsLayout />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
