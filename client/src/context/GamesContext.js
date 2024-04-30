//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const GamesContext = createContext();

export const gamesReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_GAMES:
      return { games: action.payload };
    case Actions.CREATE_GAME:
      return { games: [...state.games, action.payload] };
    case Actions.DELETE_GAME:
      return { games: state.games.filter((game) => game._id !== action.payload._id) };
    default:
      return state;
  }
};

export const GamesContextProvider = ({ children }) => {
  const [games, dispatchGames] = useReducer(gamesReducer, {
    games: null,
  });

  return <GamesContext.Provider value={{ ...games, dispatchGames }}>{children}</GamesContext.Provider>;
};
