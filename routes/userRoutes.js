const express = require("express");
const {
  userSignupController,
  userLoginController,
  userLogoutController,
} = require("../controllers/userController");

const app = express.Router();

app.post("/signup", userSignupController);

app.post("/login", userLoginController);

app.get("/logout", userLogoutController);

module.exports = app;
