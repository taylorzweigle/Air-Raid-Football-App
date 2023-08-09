//Taylor Zweigle, 2023
export const calculateWin = (score, opponentScore) => {
  return score > opponentScore ? true : false;
};

export const getGamesForSeason = (games, season) => {
  return games ? games.filter((game) => parseInt(game.date.slice(6, 10)) === season) : [];
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

export const convertDate = (date) => {
  if (date) {
    const monthMap = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let month = monthMap[parseInt(date.slice(0, 2))];

    return `${month} ${parseInt(date.slice(3, 5))}`;
  }
};
