//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playSchema = new Schema({
  dateKey: {
    type: String,
    required: true,
  },
  down: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  formation: {
    type: String,
    required: true,
  },
  play: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  firstDown: {
    type: Boolean,
    required: true,
  },
  touchdown: {
    type: Boolean,
    required: true,
  },
  interception: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Play", playSchema);
