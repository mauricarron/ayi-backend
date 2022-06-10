const validator = require("validator");
const StatsModel = require("../models/statsModel");

const getAllStatsController = async (req, res) => {
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

  try {
    const stats = await StatsModel.find();
    res.send;
    res.send({
      error: false,
      message: "All Stats Found",
      data: { stats },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Couldn't get all stats",
      data: { err },
    });
  }
};

const getByNameStatsController = async (req, res) => {
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

  if (!name || !validator.isAlpha(name, "en-US", { ignore: " " })) {
    res
      .status(400)
      .send({ error: true, message: "Invalid name on params", data: {} });
    return;
  }

  try {
    const catalogue = await StatsModel.find({ name });

    res.send({ error: false, message: "Catalogue Found", data: { catalogue } });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not get catalogue: ",
      data: { err },
    });
  }
};

const postStatsController = async (req, res) => {
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

  if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  try {
    const newStats = new StatsModel(req.body);
    await newStats.save();

    res.send({
      error: false,
      message: "Catalogue created:",
      data: { newStats },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not create catalogue: ",
      data: { err },
    });
  }
};

const updateStatsController = async (req, res) => {
  const isUserLogged = req.cookies.jwtToken;

  if (!isUserLogged) {
    res.status(500).send({
      error: true,
      message: "You must be logged in to see this page.",
      data: {},
    });
    return;
  }

  const { id, rating, comments } = req.body;

  if (!id || !rating || !comments) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  if (!(validator.isMongoId(id) || validator.isNumeric(rating))) {
    console.log("corta en validator");
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  try {
    const stats = await StatsModel.findByIdAndUpdate(
      { _id: id },
      { $set: { rating, comments } },
      { returnNewDocument: true }
    );

    res.send({
      error: false,
      message: "Stats updated: ",
      data: { stats },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not update stats: ",
      data: { err },
    });
  }
};

const deleteStatsController = async (req, res) => {
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
      message: "Invalid data on params",
      data: {},
    });
    return;
  }

  try {
    const stats = await StatsModel.findByIdAndDelete({ _id: id });

    res.send({
      error: false,
      message: "Stats deleted: ",
      data: { stats },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not delete stats: ",
      data: { err },
    });
  }
};

module.exports = {
  getAllStatsController,
  getByNameStatsController,
  postStatsController,
  updateStatsController,
  deleteStatsController,
};
