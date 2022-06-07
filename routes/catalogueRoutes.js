const express = require("express");
const {
  getAllCatalogue,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
} = require("../controllers/CatalogueController");

const app = express();

app.get("/", getAllCatalogue);

app.post("/", postCatalogueController);

app.put("/", updateCatalogueController);

app.delete("/", deleteCatalogueController);

module.exports = app;
