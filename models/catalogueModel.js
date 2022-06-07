const mongoose = require("mongoose");

const CatalogueSchema = new mongoose.Schema({
  // Anime Serie Schema
  /* 
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
    duration: {
    type: Number,
    required: true,
  },
    seasons: {
    type: Number,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  */
});

const CatalogueModel = mongoose.model("Catalogue", CatalogueSchema);

module.exports = CatalogueModel;
