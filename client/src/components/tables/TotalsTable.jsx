//Taylor Zweigle, 2023
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableTypography from "../TableTypography";

const TotalsTable = () => {
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
          <TableCell sx={headerCellStyle}>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow sx={tableRowStyle}>
          <TableCell sx={cellStyle}>
            <TableTypography>Play</TableTypography>
          </TableCell>
          <TableCell sx={cellStyle}>
            <TableTypography>Total</TableTypography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TotalsTable;
