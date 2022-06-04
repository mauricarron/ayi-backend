const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const catalogueRoute = require("./routes/catalogueRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/catalogue", catalogueRoute);

// CONNECT TO DB
mongoose
  .connect(process.env.URL_SERVER)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err}`);
  });

// SERVER INITIALIZE
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
