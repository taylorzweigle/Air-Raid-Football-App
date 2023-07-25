//Taylor Zweigle, 2023
export const theme = () => {
  return {
    type: "THEME",
  };
};

export const season = (season) => {
  return {
    type: "SEASON",
    value: season,
  };
};
