const mongoose = require("mongoose");

const CatalogueSchema = new mongoose.Schema({
  // objeto de serie anime
  // nombre: {
  //   type: String,
  //   required: true,
  // },
  // descripcion: {
  //   type: String,
  //   required: true,
  // },
  // imagen: {
  //   type: String,
  //   required: true,
  // },
  // genero: {
  //   type: String,
  //   required: true,
  // },
  // estado: {
  //   type: String,
  //   required: true,
  // },
  // temporadas: {
  //   type: Number,
  //   required: true,
  // },
  // capitulos: {
  //   type: Number,
  //   required: true,
  // },
  // episodios: {
  //   type: Number,
  //   required: true,
  // },
  // fecha_estreno: {
  //   type: Date,
  //   required: true,
  // },
  // fecha_fin: {
  //   type: Date,
  //   required: true,
  // },
  // duracion: {
  //   type: Number,
  //   required: true,
  // },
  // calificacion: {
  //   type: Number,
  //   required: true,
  // },
});

const CatalogueModel = mongoose.model("Catalogue", CatalogueSchema);

module.exports = CatalogueModel;
