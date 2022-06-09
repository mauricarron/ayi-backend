const CatalogueModel = require("../models/catalogueModel");

const getAllCatalogueController = async (req, res) => {
  try {
    const catalogue = await CatalogueModel.find();
    res.send(catalogue);
  } catch (err) {
    res.status(500).send("Could not get catalogue: ", err);
  }
};

const postCatalogueController = async (req, res) => {
  // validar body con validator
  try {
    const newCatalogue = new CatalogueModel(req.body);
    await newCatalogue.save();

    res.send("Catalogue created:" + newCatalogue);
  } catch (err) {
    res.status(500).send("Could not create catalogue: ", err);
  }
};

const updateCatalogueController = async (req, res) => {
  const catalogueToUpdate = {
    name: "One Piece",
    episodes: 1025,
    status: "Finished",
  };

  const { name, status, episodes } = req.body;
  try {
    const catalogue = await CatalogueModel.findOneAndUpdate(
      { name },
      { $set: { status, episodes } },
      { returnNewDocument: true }
    );

    res.send("Catalogue updated: " + catalogue);
  } catch (err) {
    res.status(500).send("Could not update catalogue: ", err);
  }
};

const deleteCatalogueController = async (req, res) => {
  const { name } = req.body;

  try {
    const catalogue = await CatalogueModel.findOneAndDelete({ name });

    res.send("Catalogue deleted: " + catalogue);
  } catch (err) {
    res.status(500).send("Could not delete catalogue: ", err);
  }
};

module.exports = {
  getAllCatalogueController,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
};
