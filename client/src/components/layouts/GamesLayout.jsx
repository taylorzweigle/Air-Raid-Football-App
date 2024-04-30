//Taylor Zweigle, 2024
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import Card from "../../core/card/Card";

const GamesLayout = ({ games, plays }) => {
  const headerCellStyle = {
    padding: "8px 16px",
    backgroundColor: "background.border",
  };

  const tableRowStyle = {
    textDecoration: "none",
  };

  const cellStyle = {
    padding: "8px 16px",
    cursor: "pointer",
  };

  const getTotalPlays = (dateKey) => {
    const data = [];

    if (plays) {
      data.push(plays.filter((p) => p.dateKey === dateKey).length);
    }

    return data;
  };

  const TableTypography = ({ children, score, opponentScore }) => {
    return (
      <Typography variant="body2" color={score > opponentScore ? "primary" : "text.secondary"}>
        {children}
      </Typography>
    );
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
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
              <TableRow key={game._id} sx={tableRowStyle} hover>
                <TableCell sx={cellStyle}>
                  <TableTypography score={game.score} opponentScore={game.opponentScore}>
                    {game.opponent}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography score={game.score} opponentScore={game.opponentScore}>
                    {game.location}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography score={game.score} opponentScore={game.opponentScore}>
                    {game.date}
                  </TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography
                    score={game.score}
                    opponentScore={game.opponentScore}
                  >{`${game.score}-${game.opponentScore}`}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography score={game.score} opponentScore={game.opponentScore}>
                    {getTotalPlays(game.date)}
                  </TableTypography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default GamesLayout;
