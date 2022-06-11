const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const UserModel = require("../models/userModel");

const userSignupController = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send({
      error: true,
      message: "Missing username, password or email",
      data: {},
    });
    return;
  }

  if (!(validator.isEmail(email) || validator.isAlpha(username))) {
    res.status(400).send({
      error: true,
      message: "Invalid username or password",
      data: {},
    });
    return;
  }

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send({
          error: true,
          message: "Error hashing password: ",
          data: { err },
        });
        return;
      }

      const newUser = new UserModel({ username, password: hash, email });
      await newUser.save();

      res.send({ error: false, message: "User created", data: { username } });
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: true, message: "Error creating user: ", data: { err } });
  }
};

const userLoginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({
      error: true,
      message: "Invalid data on body",
      data: {},
    });
    return;
  }

  if (!validator.isAlpha(username)) {
    res.status(400).send({
      error: true,
      message: "Invalid username or password",
      data: {},
    });
    return;
  }

  try {
    const loginUser = await UserModel.findOne({ username });

    if (!loginUser) {
      res.status(400).send({
        error: true,
        message: "Invalid username or password",
        data: {},
      });
      return;
    }

    bcrypt.compare(password, loginUser.password, (err) => {
      if (err) {
        res.status(400).send({
          error: true,
          message: "Invalid username or password",
          data: {},
        });
        return;
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRETKEY);

      res.cookie("jwtToken", token, { maxAge: 5 * 60 * 60 * 1000 });
      res.send({ error: false, message: "User logged in", data: { username } });
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: true, message: "Error logging in: ", data: { err } });
  }
};

const userLogoutController = (req, res) => {
  res.clearCookie("jwtToken");
  res.send({ error: false, message: "User logged out" });
};

module.exports = {
  userSignupController,
  userLoginController,
  userLogoutController,
};
