//Taylor Zweigle, 2023
const switchSeason = (season = 2017, action) => {
  switch (action.type) {
    case "SEASON": {
      return (season = action.value);
    }
    default:
      return season;
  }
};

export default switchSeason;
