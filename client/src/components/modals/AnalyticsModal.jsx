//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDataContext } from "../../hooks/useDataContext";
import { usePlaysContext } from "../../hooks/usePlaysContext";
import { useSeasonContext } from "../../hooks/useSeasonContext";

import BarChart from "../../core/charts/BarChart";
import Card from "../../core/card/Card";

import PlaysByResultTable from "../tables/PlaysByResultTable";

const AnalyticsModal = ({ open, onClose }) => {
  const { SEASONS, FORMATIONS, PLAYS, POSITIONS } = useDataContext();
  const { plays } = usePlaysContext();
  const { season: selectedSeason } = useSeasonContext();

  const [season, setSeason] = useState();
  const [play, setPlay] = useState();

  useEffect(() => {
    setSeason(selectedSeason);
    setPlay(PLAYS[11]);
  }, [selectedSeason, PLAYS]);

  const isInSeason = (date, season) => date.slice(6, 10) === season;

  const getFormationPlayTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < FORMATIONS.length; i++) {
        if (season !== "All") {
          data.push(
            plays.filter((p) => p.formation === FORMATIONS[i] && isInSeason(p.dateKey, season) && p.play === play).length
          );
        } else {
          data.push(plays.filter((p) => p.formation === FORMATIONS[i] && p.play === play).length);
        }
      }
    }

    return data;
  };

  const getPositionPlayTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < POSITIONS.length; i++) {
        if (season !== "All") {
          data.push(
            plays.filter((p) => p.position === POSITIONS[i] && isInSeason(p.dateKey, season) && p.play === play).length
          );
        } else {
          data.push(plays.filter((p) => p.position === POSITIONS[i] && p.play === play).length);
        }
      }
    }

    return data;
  };

  const getPlayTotals = () => {
    const data = [];

    if (plays) {
      for (let i = 0; i < PLAYS.length; i++) {
        data.push({
          play: PLAYS[i],
          firstDowns: plays.filter((p) => p.firstDown && p.play === PLAYS[i] && isInSeason(p.dateKey, season)).length,
          touchdowns: plays.filter((p) => p.touchdown && p.play === PLAYS[i] && isInSeason(p.dateKey, season)).length,
          interceptions: plays.filter((p) => p.interception && p.play === PLAYS[i] && isInSeason(p.dateKey, season)).length,
        });
      }
    }

    return data;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Analytics</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack direction="column">
                <Stack direction="row">
                  <Select
                    defaultValue={season}
                    onChange={(e) => setSeason(e.target.value)}
                    sx={{ minWidth: 128, backgroundColor: "background.paper" }}
                  >
                    {SEASONS.map((season) => (
                      <MenuItem key={season} value={season}>
                        {season}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    defaultValue={play}
                    onChange={(e) => setPlay(e.target.value)}
                    sx={{ minWidth: 256, backgroundColor: "background.paper" }}
                  >
                    {PLAYS.map((play) => (
                      <MenuItem key={play} value={play}>
                        {play}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Card>
                  <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
                    <Typography variant="subtitle1">Formations</Typography>
                    <BarChart series={FORMATIONS} data={getFormationPlayTotals()} />
                  </Stack>
                </Card>
                <Card>
                  <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
                    <Typography variant="subtitle1">Positions</Typography>
                    <BarChart series={POSITIONS} data={getPositionPlayTotals()} />
                  </Stack>
                </Card>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack direction="column" spacing={2} sx={{ padding: "8px" }}>
                <Typography variant="subtitle1">Plays by Result Totals</Typography>
              </Stack>
            </Card>
            <Card>
              <div style={{ height: "564px", overflow: "scroll" }}>
                <PlaysByResultTable plays={getPlayTotals()} selectedPlay={play} />
              </div>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsModal;
