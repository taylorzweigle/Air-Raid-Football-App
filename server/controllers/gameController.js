const mongoose = require("mongoose");

const Game = require("../models/gameModel");

const getGames = async (req, res) => {
  const games = await Game.find({});

  res.status(200).json(games);
};

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid game id" });
  }

  const game = await Game.findById(id);

  if (!game) {
    return res.status(404).json({ error: "No game found" });
  }

  res.status(200).json(game);
};

const createGame = async (req, res) => {
  const { opponent, location, date, score, opponentScore } = req.body;

  try {
    const game = await Game.create({ opponent, location, date, score, opponentScore });

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid game id" });
  }

  const game = await Game.findOneAndDelete({ _id: id });

  if (!game) {
    return res.status(404).json({ error: "No game found" });
  }

  res.status(200).json(game);
};

const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid game id" });
  }

  const game = await Game.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!game) {
    return res.status(404).json({ error: "No game found" });
  }

  res.status(200).json(game);
};

module.exports = {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
};
