//Taylor Zweigle, 2023
import { combineReducers } from "redux";

import seasonReducer from "./season";
import themeReducer from "./theme";

const reducers = combineReducers({
  season: seasonReducer,
  theme: themeReducer,
});

export default reducers;
