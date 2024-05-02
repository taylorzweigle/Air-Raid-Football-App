//Taylor Zweigle, 2024
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import CheckIcon from "@mui/icons-material/Check";

const PlaysTable = ({ plays }) => {
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
          <TableCell sx={headerCellStyle}>Down & Distance</TableCell>
          <TableCell sx={headerCellStyle}>Formation</TableCell>
          <TableCell sx={headerCellStyle}>Play</TableCell>
          <TableCell sx={headerCellStyle}>Position</TableCell>
          <TableCell sx={headerCellStyle}>First</TableCell>
          <TableCell sx={headerCellStyle}>TD</TableCell>
          <TableCell sx={headerCellStyle}>INT</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {plays &&
          plays.map((play) => (
            <TableRow key={play._id} sx={tableRowStyle}>
              <TableCell sx={cellStyle}>
                <TableTypography>{`${play.down} ${play.distance}`}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.formation}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography isBold>{play.play}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.position}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.firstDown ? <CheckIcon color="primary" fontSize="xsmall" /> : null}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.touchdown ? <CheckIcon color="primary" fontSize="xsmall" /> : null}</TableTypography>
              </TableCell>
              <TableCell sx={cellStyle}>
                <TableTypography>{play.interception ? <CheckIcon color="primary" fontSize="xsmall" /> : null}</TableTypography>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PlaysTable;
