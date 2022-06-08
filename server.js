const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const catalogueRoute = require("./routes/catalogueRoutes");
const userRoute = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CONFIG

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/", userRoute);
app.use("/catalogue", catalogueRoute);
app.use("/stats", statsRoutes);

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
