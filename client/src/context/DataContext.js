//Taylor Zweigle, 2024
import React, { createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const data = {
    SEASONS: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
    DISTANCES: ["10", "Long", "Short", "Inches", "Goal-to-Go"],
    DOWNS: ["1st", "2nd", "3rd", "4th"],
    FORMATIONS: ["Ace", "Green", "Blue", "Early", "Late", "Empty", "Special"],
    PLAYS: [
      "Run",
      "Rita/Lisa",
      "Randy/Larry",
      "Ram/Lion",
      "6",
      "7/8/9",
      "618 Stick",
      "617/619",
      "Switch",
      "90 Cross",
      "91 Post",
      "92 Mesh",
      "93 Wheel",
      "94 Out",
      "95 Sail",
      "96",
      "98 Shakes",
      "Special",
    ],
    POSITIONS: ["X", "H", "Y", "Z", "T", "QB"],
    RESULTS: ["First Down", "Touchdown", "Interception"],
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
