const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const gameRoutes = require("./routes/games");
const playRoutes = require("./routes/plays");

const app = express();

app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/plays", playRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
