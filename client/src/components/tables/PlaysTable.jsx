//Taylor Zweigle, 2023
import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import CheckIcon from "@mui/icons-material/Check";

import TableTypography from "../TableTypography";

const PlaysTable = ({ plays }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuIsopen = Boolean(anchorEl);

  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [failIsOpen, setFailIsOpen] = useState(false);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    handleDeleteClick(id);
    setAnchorEl(null);
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch("/api/plays/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      setFailIsOpen(true);
    }
    if (response.ok) {
      setSuccessIsOpen(true);
    }
  };

  const handleSuccessClose = () => setSuccessIsOpen(false);
  const handleErrorClose = () => setFailIsOpen(false);

  return (
    <>
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
              <React.Fragment key={play._id}>
                <TableRow sx={tableRowStyle} onClick={handleClick} hover>
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
                    <TableTypography>
                      {play.interception ? <CheckIcon color="primary" fontSize="xsmall" /> : null}
                    </TableTypography>
                  </TableCell>
                </TableRow>
                <Menu anchorEl={anchorEl} open={menuIsopen} onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={() => handleClose(play._id)}>Delete</MenuItem>
                </Menu>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
      <Snackbar open={successIsOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert severity="success">Play successfully deleted!</Alert>
      </Snackbar>
      <Snackbar open={failIsOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert severity="error">Unable to delete play!</Alert>
      </Snackbar>
    </>
  );
};

export default PlaysTable;
