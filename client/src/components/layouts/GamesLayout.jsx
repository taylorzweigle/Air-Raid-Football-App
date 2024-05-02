//Taylor Zweigle, 2024
import React from "react";

import Card from "../../core/card/Card";
import GamesTable from "../tables/GamesTable";

const GamesLayout = ({ games, plays }) => {
  return (
    <Card>
      <GamesTable games={games} plays={plays} />
    </Card>
  );
};

export default GamesLayout;
