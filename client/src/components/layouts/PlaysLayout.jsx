//Taylor Zweigle, 2024
import React from "react";

import Card from "../../core/card/Card";

import PlaysTable from "../tables/PlaysTable";

const PlaysLayout = ({ plays }) => {
  return (
    <Card>
      <div style={{ height: "93vh", overflow: "scroll" }}>
        <PlaysTable plays={plays} />
      </div>
    </Card>
  );
};

export default PlaysLayout;
