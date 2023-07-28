const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  opponent: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  score: {
    type: Number,
  },
  opponentScore: {
    type: Number,
  },
});

module.exports = mongoose.model("Game", gameSchema);
