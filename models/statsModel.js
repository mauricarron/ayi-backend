const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: [String],
  },
});

const StatsModel = mongoose.model("Stats", StatsSchema);

module.exports = StatsModel;
