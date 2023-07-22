const mongoose = require("mongoose");

const Season = require("../models/seasonModel");

const getSeasons = async (req, res) => {
  const seasons = await Season.find({}).sort({ season: "asc" });

  res.status(200).json(seasons);
};

const getSeason = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid season id" });
  }

  const season = await Season.findById(id);

  if (!season) {
    return res.status(404).json({ error: "No season found" });
  }

  res.status(200).json(season);
};

const createSeason = async (req, res) => {
  const { season } = req.body;

  try {
    const createdSeason = await Season.create({ season });

    res.status(200).json(createdSeason);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSeason = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid season id" });
  }

  const season = await Season.findOneAndDelete({ _id: id });

  if (!season) {
    return res.status(404).json({ error: "No season found" });
  }

  res.status(200).json(season);
};

const updateSeason = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid season id" });
  }

  const season = await Season.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!season) {
    return res.status(404).json({ error: "No season found" });
  }

  res.status(200).json(season);
};

module.exports = {
  getSeasons,
  getSeason,
  createSeason,
  deleteSeason,
  updateSeason,
};
