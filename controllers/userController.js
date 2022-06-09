const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const userSignupController = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json("Error hashing password");
      }

      const newUser = new UserModel({ username, password: hash, email });
      await newUser.save();

      res.send("User created");
    });
  } catch (err) {
    res.status(500).send("Error creating user: " + err);
  }
};

const userLoginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginUser = await UserModel.findOne({ username });

    if (!loginUser) {
      res.status(400).send("User not found");
      return;
    }

    bcrypt.compare(password, loginUser.password, (err) => {
      if (err) {
        res.status(400).send("The username or password is incorrect");
        return;
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRETKEY);

      res.cookie("jwtToken", token, { maxAge: 5 * 60 * 60 * 1000 });
    });

    res.send("User logged in");
  } catch (err) {
    res.status(500).send("Error logging in: " + err);
  }
};

const userLogoutController = (req, res) => {
  res.clearCookie("jwtToken");
  res.send("User logged out");
};

module.exports = {
  userSignupController,
  userLoginController,
  userLogoutController,
};
