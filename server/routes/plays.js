const express = require("express");

const { getPlays, getPlay, createPlay, deletePlay, updatePlay } = require("../controllers/playController");

const router = express.Router();

router.get("/", getPlays);

router.get("/:id", getPlay);

router.post("/", createPlay);

router.delete("/:id", deletePlay);

router.patch("/:id", updatePlay);

module.exports = router;
