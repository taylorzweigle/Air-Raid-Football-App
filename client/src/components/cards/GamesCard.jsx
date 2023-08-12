//Taylor Zweigle, 2023
import React from "react";
import { useSelector } from "react-redux";

import Card from "../Card";
import GamesTable from "../tables/GamesTable";

import { getSeasonGames } from "../../utility/utility";

const GamesCard = ({ games, plays }) => {
  const selectedSeason = useSelector((state) => state.season);

  const filteredData = getSeasonGames(games, selectedSeason);

  return (
    <Card>
      <GamesTable games={filteredData} plays={plays} />
    </Card>
  );
};

export default GamesCard;
