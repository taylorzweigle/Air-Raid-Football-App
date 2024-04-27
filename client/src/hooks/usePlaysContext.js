//Taylor Zweigle, 2024
import { useContext } from "react";

import { PlaysContext } from "../context/PlaysContext";

export const usePlaysContext = () => {
  const context = useContext(PlaysContext);

  if (!context) {
    throw Error("usePlaysContext must be used inside the PlaysContextProvider");
  }

  return context;
};
