//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import { GamesContextProvider } from "./context/GamesContext";
import { PlaysContextProvider } from "./context/PlaysContext";
import { SeasonContextProvider } from "./context/SeasonContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <DataContextProvider>
          <SeasonContextProvider>
            <GamesContextProvider>
              <PlaysContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </PlaysContextProvider>
            </GamesContextProvider>
          </SeasonContextProvider>
        </DataContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
