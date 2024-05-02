//Taylor Zweigle, 2024
import { useContext } from "react";

import { SeasonContext } from "../context/SeasonContext";

export const useSeasonContext = () => {
  const context = useContext(SeasonContext);

  if (!context) {
    throw Error("useSeasonContext must be used inside the SeasonContextProvider");
  }

  return context;
};
