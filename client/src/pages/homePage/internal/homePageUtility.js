//Taylor Zweigle, 2024
export const getRecord = (games) => {
  let wins = 0;
  let losses = 0;

  for (let i = 0; i < games.length; i++) {
    if (games[i].score > games[i].opponentScore) {
      wins = wins + 1;
    } else {
      losses = losses + 1;
    }
  }

  return `${wins}-${losses}`;
};

export const getSeasonFirstDowns = (plays, season) => {
  return plays.filter((p) => p.firstDown && isInSeason(p.dateKey, season)).length;
};

export const getSeasonPlaysPerGame = (games, plays, season) => {
  return Math.round(getSeasonTotalPlays(plays, season) / games.filter((g) => isInSeason(g.date, season)).length);
};

export const getSeasonTouchdowns = (plays, season) => {
  return plays.filter((p) => p.touchdown && isInSeason(p.dateKey, season)).length;
};

export const getSeasonTotalPlays = (plays, season) => {
  return plays.filter((p) => isInSeason(p.dateKey, season)).length;
};

export const isInSeason = (date, season) => date.slice(6, 10) === season;
