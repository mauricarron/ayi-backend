const express = require("express");
const {
  getAllCatalogueController,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
} = require("../controllers/CatalogueController");

const app = express.Router();

app.get("/", getAllCatalogueController);

app.post("/", postCatalogueController);

app.put("/", updateCatalogueController);

app.delete("/", deleteCatalogueController);

module.exports = app;
