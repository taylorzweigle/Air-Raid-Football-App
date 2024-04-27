//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const PlaysContext = createContext();

export const playsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_PLAYS:
      return { plays: action.payload };
    case Actions.CREATE_PLAY:
      return { plays: [action.payload, ...state.plays] };
    case Actions.DELETE_PLAY:
      return { plays: state.plays.filter((play) => play._id !== action.payload._id) };
    default:
      return state;
  }
};

export const PlaysContextProvider = ({ children }) => {
  const [plays, dispatchPlays] = useReducer(playsReducer, {
    plays: null,
  });

  return <PlaysContext.Provider value={{ ...plays, dispatchPlays }}>{children}</PlaysContext.Provider>;
};
