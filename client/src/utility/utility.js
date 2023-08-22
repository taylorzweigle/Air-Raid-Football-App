//Taylor Zweigle, 2023
import { FORMATIONS, PLAYS, POSITIONS } from "../data/foundations";

/***************************************************/
/******************INTERNAL UTILITY*****************/
/***************************************************/
const _isInSeason = (date, season) => parseInt(date.slice(6, 10)) === season;

const _isInGame = (dateKey, date) => dateKey === date;

const _isRunPlay = (play) => play !== "Run";

const _isFormation = (formation, index) => formation === FORMATIONS[index];

const _isPlay = (play, index) => play === PLAYS[index];

const _isPosition = (position, index) => position === POSITIONS[index];

const _isFirstDown = (play) => play === true;

const _isTouchdown = (play) => play === true;

const _isInterception = (play) => play === true;

/***************************************************/
/*****************FILTER TOTAL DATA****************/
/***************************************************/
export const getFormationPlayTotals = (plays, season, play) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < FORMATIONS.length; i++) {
      if (season !== "All") {
        data.push(
          plays.filter((p) => _isFormation(p.formation, i) && _isInSeason(p.dateKey, season) && p.play === play).length
        );
      } else {
        data.push(plays.filter((p) => _isFormation(p.formation, i) && p.play === play).length);
      }
    }
  }

  return data;
};

export const getPositionPlayTotals = (plays, season, play) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < POSITIONS.length; i++) {
      if (season !== "All") {
        data.push(plays.filter((p) => _isPosition(p.position, i) && _isInSeason(p.dateKey, season) && p.play === play).length);
      } else {
        data.push(plays.filter((p) => _isPosition(p.position, i) && p.play === play).length);
      }
    }
  }

  return data;
};

export const getPlayTotals = (plays) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < PLAYS.length; i++) {
      data.push({
        play: PLAYS[i],
        firstDowns: plays.filter((p) => _isFirstDown(p.firstDown) && _isPlay(p.play, i)).length,
        touchdowns: plays.filter((p) => _isTouchdown(p.touchdown) && _isPlay(p.play, i)).length,
        interceptions: plays.filter((p) => _isInterception(p.interception) && _isPlay(p.play, i)).length,
      });
    }
  }

  return data;
};

/***************************************************/
/*****************FILTER SEASON DATA****************/
/***************************************************/
export const getSeasonGames = (games, season) => {
  return games ? games.filter((game) => _isInSeason(game.date, season)) : [];
};

export const getSeasonTotalPlays = (plays, season) => {
  if (plays) {
    return plays.filter((p) => _isInSeason(p.dateKey, season)).length;
  }
};

export const getSeasonFirstDowns = (plays, season) => {
  if (plays) {
    return plays.filter((p) => _isFirstDown(p.firstDown) && _isInSeason(p.dateKey, season)).length;
  }
};

export const getSeasonTouchdowns = (plays, season) => {
  if (plays) {
    return plays.filter((p) => _isTouchdown(p.touchdown) && _isInSeason(p.dateKey, season)).length;
  }
};

export const getSeasonPlaysPerGame = (games, plays, season) => {
  if (games) {
    return Math.round(getSeasonTotalPlays(plays, season) / games.filter((g) => _isInSeason(g.date, season)).length);
  }
};

export const getSeasonPlaysTotals = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < PLAYS.length; i++) {
      data.push(plays.filter((p) => _isPlay(p.play, i) && _isInSeason(p.dateKey, season) && _isRunPlay(p.play)).length);
    }
  }

  return data;
};

export const getSeasonPlaysTotalsWithRuns = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < PLAYS.length; i++) {
      data.push(plays.filter((p) => _isPlay(p.play, i) && _isInSeason(p.dateKey, season)).length);
    }
  }

  return data;
};

export const getSeasonFormationsTotals = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < FORMATIONS.length; i++) {
      data.push(
        plays.filter((p) => _isFormation(p.formation, i) && _isInSeason(p.dateKey, season) && _isRunPlay(p.play)).length
      );
    }
  }

  return data;
};

export const getSeasonFormationsTotalsWithRuns = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < FORMATIONS.length; i++) {
      data.push(plays.filter((p) => _isFormation(p.formation, i) && _isInSeason(p.dateKey, season)).length);
    }
  }

  return data;
};

export const getSeasonPositionsTotals = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < POSITIONS.length; i++) {
      data.push(plays.filter((p) => _isPosition(p.position, i) && _isInSeason(p.dateKey, season) && _isRunPlay(p.play)).length);
    }
  }

  return data;
};

export const getSeasonPositionsTotalsWithRuns = (plays, season) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < POSITIONS.length; i++) {
      data.push(plays.filter((p) => _isPosition(p.position, i) && _isInSeason(p.dateKey, season)).length);
    }
  }

  return data;
};

export const getSeasonTotalPlaysPerOpponent = (plays, dateKey) => {
  let data = 0;

  if (plays) {
    data = plays.filter((p) => p.dateKey === dateKey).length;
  }

  return data;
};

/***************************************************/
/******************FILTER GAME DATA*****************/
/***************************************************/
export const getGameTotalPlays = (plays, date) => {
  const data = [];

  if (plays) {
    data.push(plays.filter((p) => p.dateKey === date).length);
  }

  return data;
};

export const getGamePlaysTotals = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < PLAYS.length; i++) {
      data.push(plays.filter((p) => _isPlay(p.play, i) && _isInGame(p.dateKey, date) && _isRunPlay(p.play)).length);
    }
  }

  return data;
};

export const getGamePlaysTotalsWithRuns = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < PLAYS.length; i++) {
      data.push(plays.filter((p) => _isPlay(p.play, i) && _isInGame(p.dateKey, date)).length);
    }
  }

  return data;
};

export const getGameFormationsTotals = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < FORMATIONS.length; i++) {
      data.push(plays.filter((p) => _isFormation(p.formation, i) && _isInGame(p.dateKey, date) && _isRunPlay(p.play)).length);
    }
  }

  return data;
};

export const getGameFormationsTotalsWithRuns = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < FORMATIONS.length; i++) {
      data.push(plays.filter((p) => _isFormation(p.formation, i) && _isInGame(p.dateKey, date)).length);
    }
  }

  return data;
};

export const getGamePositionsTotals = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < POSITIONS.length; i++) {
      data.push(plays.filter((p) => _isPosition(p.position, i) && _isInGame(p.dateKey, date) && _isRunPlay(p.play)).length);
    }
  }

  return data;
};

export const getGamePositionsTotalsWithRuns = (plays, date) => {
  const data = [];

  if (plays) {
    for (let i = 0; i < POSITIONS.length; i++) {
      data.push(plays.filter((p) => _isPosition(p.position, i) && _isInGame(p.dateKey, date)).length);
    }
  }

  return data;
};

/************************************************* */
/*********************FORMATING******************* */
/************************************************* */
export const calculateWin = (score, opponentScore) => {
  return score > opponentScore ? true : false;
};

export const abbreviateOpponent = (opponent) => {
  let abbreviation = "";

  abbreviation = opponent.slice(0, 3);

  if (opponent.length < 5) {
    abbreviation = opponent;
  }

  if (opponent.includes("State")) {
    abbreviation = abbreviation + " State";
  }

  return abbreviation;
};

export const convertDate = (date) => {
  if (date) {
    const monthMap = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let month = monthMap[parseInt(date.slice(0, 2))];

    return `${month} ${parseInt(date.slice(3, 5))}`;
  }
};

export const getRecord = (games) => {
  let wins = 0;
  let losses = 0;

  for (let i = 0; i < games.length; i++) {
    if (calculateWin(games[i].score, games[i].opponentScore)) {
      wins = wins + 1;
    } else {
      losses = losses + 1;
    }
  }

  return `${wins}-${losses}`;
};
