//Taylor Zweigle, 2023
import React from "react";

import Card from "../Card";
import PlaysTable from "../tables/PlaysTable";

const PlaysCard = ({ plays, dateKey }) => {
  let filteredData = [];

  if (plays) {
    filteredData = plays.filter((play) => play.dateKey === dateKey);
  }

  return (
    <Card height={780} isScrollable>
      <PlaysTable plays={filteredData} />
    </Card>
  );
};

export default PlaysCard;
