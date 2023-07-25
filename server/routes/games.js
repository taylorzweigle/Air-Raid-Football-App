const express = require("express");

const { getGames, getGame, createGame, deleteGame, updateGame } = require("../controllers/gameController");

const router = express.Router();

router.get("/", getGames);

router.get("/:id", getGame);

router.post("/", createGame);

router.delete("/:id", deleteGame);

router.patch("/:id", updateGame);

module.exports = router;
