//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { GamesContextProvider } from "./context/GamesContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <GamesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GamesContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
