//Taylor Zweigle, 2023
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";

//import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";

const App = () => {
  const theme = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Routes>
        {/*<Route path="/:id" element={<GamePage />} />*/}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

/*import React, { useEffect, useState } from "react";

function App() {


  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="string" onChange={(e) => setOpponent(e.target.value)} value={opponent} />
        <input type="string" onChange={(e) => setLocation(e.target.value)} value={location} />
        <input type="string" onChange={(e) => setDate(e.target.value)} value={date} />
        <input type="number" onChange={(e) => setScore(e.target.value)} value={score} />
        <input type="number" onChange={(e) => setOpponentScore(e.target.value)} value={opponentScore} />
        <button>Add</button>
        {error && <div>{error}</div>}
      </form>
      {games &&
        games.map((game) => (
          <div key={game._id}>
            {game.opponent}
            {game.location}
            {game.date}
            {game.score}
            {game.opponentScore}
            <button onClick={() => handleDelete(game._id)}>X</button>
          </div>
        ))}
    </div>
  );
}

export default App;
*/
