const validator = require("validator");
const CatalogueModel = require("../models/catalogueModel");

const getAllCatalogueController = async (req, res) => {
  try {
    const catalogue = await CatalogueModel.find();
    res.send;
    res.send({
      error: false,
      message: "All Catalogue Found",
      data: { catalogue },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Couldn't get all catalogue",
      data: { err },
    });
  }
};

const getByNameCatalogueController = async (req, res) => {
  const { name } = req.params;

  if (!name || !validator.isAlpha(name)) {
    res
      .status(400)
      .send({ error: true, message: "Invalid name on params", data: {} });
    return;
  }

  try {
    const catalogue = await CatalogueModel.find({ name });

    res.send({ error: false, message: "Catalogue Found", data: { catalogue } });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not get catalogue: ",
      data: { err },
    });
  }
};

const postCatalogueController = async (req, res) => {
  if (
    !validator.isAlpha(req.body.name) ||
    !validator.isNumeric(req.body.duration) ||
    !validator.isAlpha(req.body.season) ||
    !validator.isAlpha(req.body.status) ||
    !validator.isAlpha(req.body.genres)
  ) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  try {
    const newCatalogue = new CatalogueModel(req.body);
    await newCatalogue.save();

    res.send({
      error: false,
      message: "Catalogue created:",
      data: { newCatalogue },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not create catalogue: ",
      data: { err },
    });
  }
};

const updateCatalogueController = async (req, res) => {
  const { id, status, episodes } = req.body;

  if (!id || !status || !episodes) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  if (
    !validator.isMongoId(id) ||
    !validator.isAlpha(status) ||
    !validator.isNumeric(episodes)
  ) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  try {
    const catalogue = await CatalogueModel.findByIdAndUpdate(
      { _id: id },
      { $set: { status, episodes } },
      { returnNewDocument: true }
    );

    res.send({
      error: false,
      message: "Catalogue updated: ",
      data: { catalogue },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not update catalogue: ",
      data: { err },
    });
  }
};

const deleteCatalogueController = async (req, res) => {
  const { id } = req.body;

  if (!id || !validator.isMongoId(id)) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  try {
    const catalogue = await CatalogueModel.findByIdAndDelete({ id });

    res.send({
      error: false,
      message: "Catalogue deleted: ",
      data: { catalogue },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not delete catalogue: ",
      data: { err },
    });
  }
};

module.exports = {
  getAllCatalogueController,
  getByNameCatalogueController,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
};
