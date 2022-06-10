const mongoose = require("mongoose");

const CatalogueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
  },
  duration: {
    type: Number,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
});

const CatalogueModel = mongoose.model("Catalogue", CatalogueSchema);

module.exports = CatalogueModel;
