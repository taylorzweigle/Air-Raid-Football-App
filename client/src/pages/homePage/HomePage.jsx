//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import * as Actions from "../../actions";

import FormationsChartLayout from "../../components/layouts/FormationsChartLayout";
import GamesLayout from "../../components/layouts/GamesLayout";
import HomeHeaderLayout from "../../components/layouts/HomeHeaderLayout";
import PlaysChartLayout from "../../components/layouts/PlaysChartLayout";
import PositionsChartLayout from "../../components/layouts/PositionsChartLayout";
import TotalPlaysLayout from "../../components/layouts/TotalPlaysLayout";

import AnalyticsModal from "../../components/modals/AnalyticsModal";
import CreateGameModal from "../../components/modals/CreateGameModal";
import LogoutModal from "../../components/modals/LogoutModal";
import PlaybookModal from "../../components/modals/PlaybookModal";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useGamesContext } from "../../hooks/useGamesContext";
import { useLogout } from "../../hooks/useLogout";
import { usePlaysContext } from "../../hooks/usePlaysContext";
import { useSeasonContext } from "../../hooks/useSeasonContext";

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
  const { logout } = useLogout();
  const { plays, dispatchPlays } = usePlaysContext();
  const { season, dispatchSeason } = useSeasonContext();

  const [seasonGames, setSeasonGames] = useState([]);
  const [details, setDetails] = useState([]);

  const [analyticsModal, setAnalyticsModal] = useState(false);
  const [createGameModal, setCreateGameModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [playbookModal, setPlaybookModal] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames(user.token);

      dispatchGames({ type: Actions.GET_GAMES, payload: games.json });
    };

    if (user) {
      fetchGames();
    }
  }, [user, season, dispatchGames]);

  useEffect(() => {
    if (games) {
      setSeasonGames(games.filter((game) => isInSeason(game.date, season)));
    }
  }, [games, season]);

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
        { label: "Record", value: getRecord(seasonGames, season) },
        { label: "Total Plays", value: getSeasonTotalPlays(plays, season) },
        { label: "Plays per Game", value: getSeasonPlaysPerGame(seasonGames, plays, season) },
        { label: "First Downs", value: getSeasonFirstDowns(plays, season) },
        { label: "Touchdowns", value: getSeasonTouchdowns(plays, season) },
      ]);
    }
  }, [seasonGames, plays, season]);

  const handleSelectedYear = (year) => {
    dispatchSeason({ type: Actions.SET_SEASON, payload: year });

    setSeasonGames(games.filter((game) => isInSeason(game.date, year)));
  };

  const getSeasonPlays = () => plays && plays.filter((play) => play.dateKey.slice(6, 10) === season);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <HomeHeaderLayout
            details={details}
            selectedYear={season}
            onSelectYear={handleSelectedYear}
            onPlaybook={() => setPlaybookModal(true)}
            onAnalytics={() => setAnalyticsModal(true)}
            onCreateGame={() => setCreateGameModal(true)}
            onLogout={() => setLogoutModal(true)}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid item xs={12}>
            <GamesLayout games={seasonGames} plays={plays} />
          </Grid>
          <Grid item xs={12}>
            <TotalPlaysLayout games={seasonGames} plays={plays} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid item xs={12}>
            <PlaysChartLayout plays={getSeasonPlays()} />
          </Grid>
          <Grid item xs={12}>
            <FormationsChartLayout plays={getSeasonPlays()} />
          </Grid>
          <Grid item xs={12}>
            <PositionsChartLayout plays={getSeasonPlays()} />
          </Grid>
        </Grid>
      </Grid>
      <PlaybookModal open={playbookModal} onClose={() => setPlaybookModal(false)} />
      <AnalyticsModal open={analyticsModal} onClose={() => setAnalyticsModal(false)} />
      <CreateGameModal open={createGameModal} onClose={() => setCreateGameModal(false)} />
      <LogoutModal open={logoutModal} onClose={() => setLogoutModal(false)} onLogout={() => logout()} />
    </>
  );
};

export default HomePage;
