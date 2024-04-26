//Taylor Zweigle, 2024
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const gameRoutes = require("./routes/games");
const playRoutes = require("./routes/plays");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/plays", playRoutes);
app.use("/api/users", userRoutes);

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
