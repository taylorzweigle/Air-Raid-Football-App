//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playSchema = new Schema({
  dateKey: {
    type: String,
  },
  down: {
    type: String,
  },
  distance: {
    type: String,
  },
  formation: {
    type: String,
  },
  play: {
    type: String,
  },
  position: {
    type: String,
  },
  firstDown: {
    type: Boolean,
  },
  touchdown: {
    type: Boolean,
  },
  interception: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Play", playSchema);
