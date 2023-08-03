//Taylor Zweigle, 2023
const switchTheme = (theme = "dark", action) => {
  switch (action.type) {
    case "THEME": {
      return theme === "light" ? "dark" : "light";
    }
    default:
      return theme;
  }
};

export default switchTheme;
