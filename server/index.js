const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const seasonRoutes = require("./routes/seasons");

const app = express();

app.use(express.json());

app.use("/api/seasons", seasonRoutes);

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
