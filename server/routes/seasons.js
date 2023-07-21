const express = require("express");

const Season = require("../models/seasonModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "GET all seasons" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "GET single season" });
});

router.post("/", async (req, res) => {
  const { season } = req.body;

  try {
    const createdSeason = await Season.create({ season });

    res.status(200).json(createdSeason);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE single season" });
});

router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE single season" });
});

module.exports = router;
