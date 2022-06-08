const express = require("express");
const {
  getAllStatsController,
  getByIdStatsController,
} = require("../controllers/statsController");

const app = express.Router();

app.get("/", getAllStatsController);

app.get("/:id", getByIdStatsController);

module.exports = app;
