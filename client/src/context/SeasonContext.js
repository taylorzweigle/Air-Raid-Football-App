//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const SeasonContext = createContext();

export const seasonReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_SEASON:
      return state;
    case Actions.SET_SEASON:
      return action.payload;
    default:
      return state;
  }
};

export const SeasonContextProvider = ({ children }) => {
  const [season, dispatchSeason] = useReducer(seasonReducer, "2017");

  return <SeasonContext.Provider value={{ season, dispatchSeason }}>{children}</SeasonContext.Provider>;
};
