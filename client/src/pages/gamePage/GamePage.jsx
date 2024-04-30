//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import GameHeaderLayout from "../../components/layouts/GameHeaderLayout";

import PlaybookModal from "../../components/modals/PlaybookModal";
import AnalyticsModal from "../../components/modals/AnalyticsModal";
import LogoutModal from "../../components/modals/LogoutModal";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { usePlaysContext } from "../../hooks/usePlaysContext";

import { getGame } from "../../api/games";

import { convertDate, getGameTotalPlays } from "./internal/gamePageUtility";

const GamePage = () => {
  const params = useParams();

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { plays } = usePlaysContext();

  const [game, setGame] = useState("");
  const [details, setDetails] = useState([]);
  const [playbookModal, setPlaybookModal] = useState(false);
  const [analyticsModal, setAnalyticsModal] = useState(false);
  const [addPlayModal, setAddPlayModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const game = await getGame(params.id, user.token);

      setGame(game.json);
    };

    if (user) {
      fetchGame();
    }
  }, [params.id, user]);

  useEffect(() => {
    if (game) {
      const details = [
        { label: "Date", value: convertDate(game.date) },
        { label: "Location", value: game.location },
        { label: "Result", value: game.score > game.opponentScore ? "W" : "L" },
        { label: "Score", value: `${game.score} - ${game.opponentScore}` },
        { label: "Plays", value: getGameTotalPlays(plays, game.date) },
      ];

      setDetails(details);
    }
  }, [game]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <GameHeaderLayout
            game={game}
            details={details}
            onPlaybook={() => setPlaybookModal(true)}
            onAnalytics={() => setAnalyticsModal(true)}
            onCreatePlay={() => setAddPlayModal(true)}
            onLogout={() => setLogoutModal(true)}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
      <PlaybookModal open={playbookModal} onClose={() => setPlaybookModal(false)} />
      <AnalyticsModal open={analyticsModal} onClose={() => setAnalyticsModal(false)} />
      <LogoutModal open={logoutModal} onClose={() => setLogoutModal(false)} onLogout={() => logout()} />
    </>
  );
};

export default GamePage;
