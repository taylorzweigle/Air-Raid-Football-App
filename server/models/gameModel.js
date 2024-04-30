//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  opponent: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  opponentScore: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
