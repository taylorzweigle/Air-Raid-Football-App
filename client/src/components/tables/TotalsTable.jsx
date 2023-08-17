//Taylor Zweigle, 2023
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableTypography from "../TableTypography";

const TotalsTable = ({ plays }) => {
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
              <TableCell sx={cellStyle}>
                <TableTypography>{play.play}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.firstDowns}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.touchdowns}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.interceptions}</TableTypography>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TotalsTable;
