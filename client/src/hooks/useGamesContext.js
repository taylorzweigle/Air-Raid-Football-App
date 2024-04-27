//Taylor Zweigle, 2024
import { useContext } from "react";

import { GamesContext } from "../context/GamesContext";

export const useGamesContext = () => {
  const context = useContext(GamesContext);

  if (!context) {
    throw Error("useGamesContext must be used inside the GamesContextProvider");
  }

  return context;
};
