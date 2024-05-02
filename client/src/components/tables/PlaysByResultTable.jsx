//Taylor Zweigle, 2023
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const PlaysByResultTable = ({ plays, selectedPlay }) => {
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

  const selectedCellStyle = {
    borderStyle: "solid",
    borderColor: "primary.main",
  };

  const TableTypography = ({ children, score, opponentScore }) => {
    return (
      <Typography variant="body2" color={score > opponentScore ? "primary" : "text.secondary"}>
        {children}
      </Typography>
    );
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellStyle}>Play</TableCell>
          <TableCell sx={headerCellStyle}>First Downs</TableCell>
          <TableCell sx={headerCellStyle}>Touchdowns</TableCell>
          <TableCell sx={headerCellStyle}>Interceptions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {plays &&
          plays.map((play) => (
            <TableRow key={play.play} sx={tableRowStyle}>
              <TableCell
                sx={
                  selectedPlay === play.play ? { borderWidth: "2px 0 2px 2px", ...selectedCellStyle, ...cellStyle } : cellStyle
                }
              >
                <TableTypography>{play.play}</TableTypography>
              </TableCell>
              <TableCell
                sx={selectedPlay === play.play ? { borderWidth: "2px 0 2px 0", ...selectedCellStyle, ...cellStyle } : cellStyle}
              >
                <TableTypography>{play.firstDowns}</TableTypography>
              </TableCell>
              <TableCell
                sx={selectedPlay === play.play ? { borderWidth: "2px 0 2px 0", ...selectedCellStyle, ...cellStyle } : cellStyle}
              >
                <TableTypography>{play.touchdowns}</TableTypography>
              </TableCell>
              <TableCell
                sx={
                  selectedPlay === play.play ? { borderWidth: "2px 2px 2px 0", ...selectedCellStyle, ...cellStyle } : cellStyle
                }
              >
                <TableTypography>{play.interceptions}</TableTypography>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PlaysByResultTable;
