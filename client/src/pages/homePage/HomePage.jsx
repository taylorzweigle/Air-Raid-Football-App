//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import * as Actions from "../../actions";

import FormationsLayout from "../../components/layouts/FormationsLayout";
import GamesLayout from "../../components/layouts/GamesLayout";
import HomeHeaderLayout from "../../components/layouts/HomeHeaderLayout";
import PlaysLayout from "../../components/layouts/PlaysLayout";
import PositionsLayout from "../../components/layouts/PositionsLayout";
import TotalPlaysLayout from "../../components/layouts/TotalPlaysLayout";

import PlaybookModal from "../../components/modals/PlaybookModal";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useGamesContext } from "../../hooks/useGamesContext";
import { usePlaysContext } from "../../hooks/usePlaysContext";

import { getGames } from "../../api/games";
import { getPlays } from "../../api/plays";

import {
  getRecord,
  getSeasonFirstDowns,
  getSeasonPlaysPerGame,
  getSeasonTouchdowns,
  getSeasonTotalPlays,
  isInSeason,
} from "./internal/homePageUtility";

const HomePage = () => {
  const { user } = useAuthContext();
  const { games, dispatchGames } = useGamesContext();
  const { plays, dispatchPlays } = usePlaysContext();

  const [selectedYear, setSelectedYear] = useState("2017");
  const [seasonGames, setSeasonGames] = useState([]);
  const [details, setDetails] = useState([]);

  const [playbookModal, setPlaybookModal] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames(user.token);

      dispatchGames({ type: Actions.GET_GAMES, payload: games.json });

      setSeasonGames(games.json.filter((game) => isInSeason(game.date, selectedYear)));
    };

    if (user) {
      fetchGames();
    }
  }, [user, selectedYear, dispatchGames]);

  useEffect(() => {
    const fetchPlays = async () => {
      const plays = await getPlays(user.token);

      dispatchPlays({ type: Actions.GET_PLAYS, payload: plays.json });
    };

    if (user) {
      fetchPlays();
    }
  }, [user, dispatchPlays]);

  useEffect(() => {
    if (seasonGames && plays) {
      setDetails([
        { label: "Record", value: getRecord(seasonGames, selectedYear) },
        { label: "Total Plays", value: getSeasonTotalPlays(plays, selectedYear) },
        { label: "Plays per Game", value: getSeasonPlaysPerGame(seasonGames, plays, selectedYear) },
        { label: "First Downs", value: getSeasonFirstDowns(plays, selectedYear) },
        { label: "Touchdowns", value: getSeasonTouchdowns(plays, selectedYear) },
      ]);
    }
  }, [seasonGames, plays, selectedYear]);

  const handleSelectedYear = (year) => {
    setSelectedYear(year);

    setSeasonGames(games.filter((game) => isInSeason(game.date, year)));
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <HomeHeaderLayout
            details={details}
            selectedYear={selectedYear}
            onSelectYear={handleSelectedYear}
            onPlaybookClick={() => {
              setPlaybookModal(true);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid item xs={12}>
            <GamesLayout games={seasonGames} />
          </Grid>
          <Grid item xs={12}>
            <TotalPlaysLayout games={seasonGames} plays={plays} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid item xs={12}>
            <PlaysLayout plays={plays} selectedYear={selectedYear} />
          </Grid>
          <Grid item xs={12}>
            <FormationsLayout plays={plays} selectedYear={selectedYear} />
          </Grid>
          <Grid item xs={12}>
            <PositionsLayout plays={plays} selectedYear={selectedYear} />
          </Grid>
        </Grid>
      </Grid>
      <PlaybookModal
        open={playbookModal}
        onClose={() => {
          setPlaybookModal(false);
        }}
      />
    </>
  );
};

export default HomePage;
