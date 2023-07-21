const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  season: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Season", seasonSchema);
