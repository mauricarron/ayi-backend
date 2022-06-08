const express = require("express");
const {
  signupUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/userController");

const app = express.Router();

app.post("/signup", signupUserController);

app.post("/login", loginUserController);

app.post("/logout", logoutUserController);

module.exports = app;
