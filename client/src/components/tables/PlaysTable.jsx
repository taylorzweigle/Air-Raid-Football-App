//Taylor Zweigle, 2024
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import DeletePlayModal from "../modals/DeletePlayModal";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { usePlaysContext } from "../../hooks/usePlaysContext";

import { deletePlay } from "../../api/plays";

const PlaysTable = ({ plays }) => {
  const { user } = useAuthContext();
  const { dispatchPlays } = usePlaysContext();

  const [deletePlayModal, setDeletePlayModal] = useState(false);
  const [deletePlayId, setDeletePlayId] = useState("");

  const headerCellStyle = {
    padding: "8px 16px",
    backgroundColor: "background.border",
  };

  const tableRowStyle = {
    textDecoration: "none",
  };

  const cellStyle = {
    padding: "4px 16px",
  };

  const TableTypography = ({ children, touchdown }) => {
    return (
      <Typography variant="body2" color={touchdown ? "primary" : "text.secondary"}>
        {children}
      </Typography>
    );
  };

  const renderResult = (play) => {
    if (play.firstDown) {
      return "FD";
    } else if (play.touchdown) {
      return "TD";
    } else if (play.interception) {
      return "INT";
    } else if (play.fumble) {
      return "FUM";
    } else if (play.sack) {
      return "SCK";
    } else {
      return null;
    }
  };

  const handleOnDeleteClick = (id) => {
    setDeletePlayId(id);
    setDeletePlayModal(true);
  };

  const handleOnDelete = async () => {
    const play = await deletePlay(deletePlayId, user.token);

    if (play.json) {
      dispatchPlays({ type: Actions.DELETE_PLAY, payload: play.json });

      setDeletePlayId("");
      setDeletePlayModal(false);
    }
  };

  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>Down & Distance</TableCell>
            <TableCell sx={headerCellStyle}>Formation</TableCell>
            <TableCell sx={headerCellStyle}>Play</TableCell>
            <TableCell sx={headerCellStyle}>Position</TableCell>
            <TableCell sx={headerCellStyle}>Result</TableCell>
            {user && user.username === "airraidapp_edit" && <TableCell sx={headerCellStyle}></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {plays &&
            plays.map((play) => (
              <TableRow key={play._id} sx={tableRowStyle}>
                <TableCell sx={cellStyle}>
                  <TableTypography
                    touchdown={play.touchdown}
                  >{`${play.down} ${play.distance}`}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography touchdown={play.touchdown}>{play.formation}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography touchdown={play.touchdown}>{play.play}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography touchdown={play.touchdown}>{play.position}</TableTypography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <TableTypography touchdown={play.touchdown}>{renderResult(play)}</TableTypography>
                </TableCell>
                {user && user.username === "airraidapp_edit" && (
                  <TableCell sx={cellStyle}>
                    <IconButton size="small" onClick={() => handleOnDeleteClick(play._id)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DeletePlayModal
        open={deletePlayModal}
        onClose={() => setDeletePlayModal(false)}
        onDelete={handleOnDelete}
      />
    </>
  );
};

export default PlaysTable;
