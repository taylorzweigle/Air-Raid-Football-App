//Taylor Zweigle, 2024
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "../../core/card/Card";
import LineChart from "../../core/charts/LineChart";

const TotalPlaysLayout = ({ games, plays }) => {
  const abbreviateOpponent = (opponent) => {
    let abbreviation = "";

    abbreviation = opponent.slice(0, 3);

    if (opponent.length < 5) {
      abbreviation = opponent;
    }

    if (opponent.includes("State")) {
      abbreviation = abbreviation + " State";
    }

    return abbreviation;
  };

  const getSeasonTotalPlaysPerOpponent = (plays, dateKey) => {
    return plays.filter((p) => p.dateKey === dateKey).length;
  };

  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
        <Typography variant="subtitle1">Total Plays</Typography>
        <LineChart
          series={games ? games.map((game) => abbreviateOpponent(game.opponent)) : []}
          data={games && plays ? games.map((game) => getSeasonTotalPlaysPerOpponent(plays, game.date)) : []}
        />
      </Stack>
    </Card>
  );
};

export default TotalPlaysLayout;
