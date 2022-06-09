const UserModel = require("../models/userModel");

const userSignupController = (req, res) => {
  console.log(req.body);
  res.send("OK");
};

const userLoginController = (req, res) => {};

const userLogoutController = (req, res) => {};

module.exports = {
  userSignupController,
  userLoginController,
  userLogoutController,
};
