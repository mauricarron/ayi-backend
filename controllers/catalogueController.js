const Catalogue = require("../models/catalogueModel");

const getAllCatalogue = (req, res) => {
  // const catalogo = await Catalogue.find();
  //   Catalogue.find({}, (err, data) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(200).send(data);
  //   }
  // });
};

const postCatalogueController = (req, res) => {
  // validar body con validator
  // const nuevo_catalogo = new Catalogue(req.body);
  // nuevo_catalogo.save()
  //   .then((data) => {
  //     res.status(200).send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
};

const updateCatalogueController = (req, res) => {
  const { id, ...data } = req.body;
  if (!validator.isMongoId(id)) {
    res.status(400).send("El id no es valido");
    return;
  }

  /*
  const producto = await Catalogue.find({_id: id});

  producto.update({$set: {nombre: data.nombre}})

  */

  res.send("Actualizado");
};

const deleteCatalogueController = (req, res) => {};

module.exports = {
  getAllCatalogue,
  postCatalogueController,
  updateCatalogueController,
  deleteCatalogueController,
};
