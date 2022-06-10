const express = require("express");
const {
  getAllCatalogueController,
  getByNameCatalogueController,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
} = require("../controllers/CatalogueController");

const app = express.Router();

app.get("/", getAllCatalogueController);

app.get("/:name", getByNameCatalogueController);

app.post("/", postCatalogueController);

app.put("/", updateCatalogueController);

app.delete("/", deleteCatalogueController);

module.exports = app;
