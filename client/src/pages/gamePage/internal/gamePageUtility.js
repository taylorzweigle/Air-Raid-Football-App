//Taylor Zweigle, 2024
export const convertDate = (date) => {
  if (date) {
    const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let month = monthMap[parseInt(date.slice(0, 2)) - 1];

    return `${month} ${date.slice(3, 5)}, ${date.slice(6)}`;
  }
};

export const getGameTotalPlays = (plays, date) => {
  const data = [];

  if (plays) {
    data.push(plays.filter((p) => p.dateKey === date).length);
  }

  return data;
};
