const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const data = [
  {
    id: 0,
    season: {
      year: 2017,
      games: [
        {
          id: 0,
          opponent: "Montana State",
          location: "Martin Stadium",
          date: "Sept. 2",
          score: 31,
          opponentScore: 0,
          plays: [
            { id: 0, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 1, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 2, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
          ],
        },
        {
          id: 1,
          opponent: "Boise State",
          location: "Martin Stadium",
          date: "Sept. 9",
          score: 47,
          opponentScore: 42,
          plays: [
            { id: 0, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 1, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 2, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
          ],
        },
        {
          id: 2,
          opponent: "Oregon State",
          location: "Martin Stadium",
          date: "Sept. 16",
          score: 52,
          opponentScore: 23,
          plays: [
            { id: 0, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 1, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
            { id: 2, down: 1, distance: 10, formation: "ace", play: "run", position: "t", result: null },
          ],
        },
      ],
    },
  },
];

app.get("/", (req, res) => {
  res.send("Football App Data");
});

app.get("/data", (req, res) => {
  res.send(data);
});

app.get("/data/:id", (req, res) => {
  const season = data.find((s) => s.id === parseInt(req.params.id));

  if (!season) {
    res.status(404).send("The season was not found");
    return;
  }

  res.send(season);
});

app.post("/data", (req, res) => {
  const result = validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const season = {
    id: data.length + 1,
    season: req.body.season,
  };

  data.push(season);

  res.send(season);
});

app.put("/data/:id", (req, res) => {
  const season = data.find((s) => s.id === parseInt(req.params.id));

  if (!season) {
    res.status(404).send("The season was not found");
    return;
  }

  const result = validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  season.name = req.body.name;

  res.send(season);
});

app.delete("/data/:id", (req, res) => {
  const season = data.find((s) => s.id === parseInt(req.params.id));

  if (!season) {
    res.status(404).send("The season was not found");
    return;
  }

  const index = data.indexOf(season);

  data.splice(index, 1);

  res.send(season);
});

function validate(object) {
  const schema = Joi.object({
    season: Joi.required(),
  });

  return schema.validate(object);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
