//Taylor Zweigle, 2023
import React from "react";
import { useSelector } from "react-redux";

import Card from "../Card";
import GamesTable from "../tables/GamesTable";

import { getGamesForSeason } from "../../utility/utility";

const GamesCard = ({ games }) => {
  const selectedSeason = useSelector((state) => state.season);

  const filteredData = getGamesForSeason(games, selectedSeason);

  return (
    <Card>
      <GamesTable games={filteredData} />
    </Card>
  );
};

export default GamesCard;
