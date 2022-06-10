const express = require("express");
const {
  getAllStatsController,
  getByNameStatsController,
  postStatsController,
  updateStatsController,
  deleteStatsController,
} = require("../controllers/statsController");

const app = express.Router();

app.get("/", getAllStatsController);

app.get("/:name", getByNameStatsController);

app.post("/", postStatsController);

app.put("/", updateStatsController);

app.delete("/", deleteStatsController);

module.exports = app;
