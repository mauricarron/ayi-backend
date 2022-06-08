const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  // Statistics Schema
});

const StatsModel = mongoose.model("Stats", StatsSchema);

module.exports = StatsModel;
