//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
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

const HomePage = () => {
  const selectedSeason = useSelector((state) => state.season);

  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("/api/games");

      if (response.ok) {
        setGames(await response.json());
      }
    };

    fetchGames();
  }, []);

  /*const handleDelete = async (id) => {
    const response = await fetch("/api/games/" + id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
    }
  };*/

  const tempDetails = [
    { label: "Record", value: getRecord(getGamesForSeason(games, selectedSeason)) },
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
        <GamesCard games={games} />
        <PlayPreviewCard />
      </Grid>
      <Grid item xs={12} md={7}>
        <ChartCard header="Plays">
          <BarChart
            series={PLAYS.map((play) => play.replaceAll("/", " / "))}
            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
        </ChartCard>
        <ChartCard header="Formations">
          <BarChart series={FORMATIONS} data={[0, 0, 0, 0, 0, 0, 0]} />
        </ChartCard>
        <ChartCard header="Positions">
          <BarChart series={POSITIONS} data={[0, 0, 0, 0, 0]} />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default HomePage;
