//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Play = require("../models/playModel");

const getPlays = async (req, res) => {
  const plays = await Play.find({});

  res.status(200).json(plays);
};

const getPlay = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid play id" });
  }

  const play = await Play.findById(id);

  if (!play) {
    return res.status(404).json({ error: "No play found" });
  }

  res.status(200).json(play);
};

const createPlay = async (req, res) => {
  const {
    dateKey,
    down,
    distance,
    formation,
    play,
    position,
    firstDown,
    touchdown,
    interception,
    fumble,
    sack,
  } = req.body;

  try {
    const newPlay = await Play.create({
      dateKey,
      down,
      distance,
      formation,
      play,
      position,
      firstDown,
      touchdown,
      interception,
      fumble,
      sack,
    });

    res.status(200).json(newPlay);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePlay = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid play id" });
  }

  const play = await Play.findOneAndDelete({ _id: id });

  if (!play) {
    return res.status(404).json({ error: "No play found" });
  }

  res.status(200).json(play);
};

const updatePlay = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid play id" });
  }

  const play = await Play.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!play) {
    return res.status(404).json({ error: "No play found" });
  }

  res.status(200).json(play);
};

module.exports = {
  getPlays,
  getPlay,
  createPlay,
  deletePlay,
  updatePlay,
};
