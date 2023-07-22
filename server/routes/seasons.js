const express = require("express");

const { getSeasons, getSeason, createSeason, deleteSeason, updateSeason } = require("../controllers/seasonController");

const router = express.Router();

router.get("/", getSeasons);

router.get("/:id", getSeason);

router.post("/", createSeason);

router.delete("/:id", deleteSeason);

router.patch("/:id", updateSeason);

module.exports = router;
