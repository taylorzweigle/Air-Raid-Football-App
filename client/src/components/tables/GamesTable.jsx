//Taylor Zweigle, 2023
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableTypography from "../TableTypography";

import { calculateWin, convertDate } from "../../utility/utility";

const GamesTable = ({ games, plays }) => {
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

  const getTotalPlays = (dateKey) => {
    const data = [];

    if (plays) {
      data.push(plays.filter((p) => p.dateKey === dateKey).length);
    }

    return data;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellStyle}></TableCell>
          <TableCell sx={headerCellStyle}>Opponent</TableCell>
          <TableCell sx={headerCellStyle}>Location</TableCell>
          <TableCell sx={headerCellStyle}>Date</TableCell>
          <TableCell sx={headerCellStyle}>Score</TableCell>
          <TableCell sx={headerCellStyle}>Plays</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games &&
          games.map((game) => (
            <TableRow key={game._id} to={`/${game._id}`} component={RouterLink} sx={tableRowStyle} hover>
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
                <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>{convertDate(game.date)}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>
                  {game.score}-{game.opponentScore}
                </TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography isWin={calculateWin(game.score, game.opponentScore)}>
                  {getTotalPlays(game.date)}
                </TableTypography>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default GamesTable;
