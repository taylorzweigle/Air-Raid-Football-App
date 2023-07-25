//Taylor Zweigle, 2023
import React, { useState, useEffect } from "react";
//import { Link as RouterLink } from "react-router-dom";
import { /*useDispatch,*/ useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableTypography from "../TableTypography";

import { calculateWin } from "../../utility/utility";

const GamesTable = () => {
  const [games, setGames] = useState(null);

  const selectedSeason = useSelector((state) => state.season);

  const headerCellStyle = {
    padding: "8px 16px",
    backgroundColor: "background.border",
  };

  const tableRowStyle = {
    textDecoration: "none",
  };

  const cellStyle = {
    padding: "8px 16px",
  };

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("/api/games");
      const json = await response.json();

      if (response.ok) {
        setGames(json);
      }
    };

    fetchGames();
  }, []);

  /*const handleDelete = async (id) => {
    const response = await fetch("/api/games/" + id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
    }
  };*/

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellStyle}>Result</TableCell>
          <TableCell sx={headerCellStyle}>Opponent</TableCell>
          <TableCell sx={headerCellStyle}>Location</TableCell>
          <TableCell sx={headerCellStyle}>Date</TableCell>
          <TableCell sx={headerCellStyle}>Score</TableCell>
          <TableCell sx={headerCellStyle}>Plays</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games &&
          games
            .filter((item) => parseInt(item.date.slice(6, 10)) === selectedSeason)
            .map((game) => (
              <TableRow key={game._id} sx={tableRowStyle} hover>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>
                    {calculateWin(game.score, game.opponentScore) ? "W" : "L"}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)} isBold>
                    {game.opponent}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>{game.location}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>{game.date}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>
                    {game.score}-{game.opponentScore}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>0</TableTypography>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );

  /*return (
          <TableRow
            to={`/${game.opponent}`}
            component={RouterLink}
            onClick={() => handleGameSelect(game.opponent)}
          >
  );*/
};

export default GamesTable;
