const validator = require("validator");
const CatalogueModel = require("../models/catalogueModel");
const StatsModel = require("../models/statsModel");

const getAllCatalogueController = async (req, res) => {
  try {
    const catalogue = await CatalogueModel.find();
    const stats = await StatsModel.find();
    res.send({
      error: false,
      message: "All Catalogue Found",
      data: { catalogue, stats },
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
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

  const { name } = req.params;

  if (!name || !validator.isAlpha(name)) {
    res
      .status(400)
      .send({ error: true, message: "Invalid name on params", data: {} });
    return;
  }

  try {
    const catalogue = await CatalogueModel.find({ name });
    const stats = await StatsModel.find();

    res.send({
      error: false,
      message: "Catalogue Found",
      data: { catalogue, stats },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not get catalogue: ",
      data: { err },
    });
  }
};

const postCatalogueController = async (req, res) => {
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

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
    const newStats = new StatsModel(req.body.name);
    await newCatalogue.save();
    await newStats.save();

    res.send({
      error: false,
      message: "Catalogue created:",
      data: { newCatalogue, newStats },
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
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

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
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

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
