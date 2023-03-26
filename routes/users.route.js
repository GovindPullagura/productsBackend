const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

// Registration:
userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      const addUser = new UserModel({ email, password: hash, location, age });
      await addUser.save();
      res.send({ msg: "New user has been added to the database." });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login:
userRouter.post("/login", async (req, res) => {
  // req.body contains email and password
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.send({
            msg: "Login Successful",
            token: jwt.sign({ userID: user._id }, "e-comm"),
          });
        } else {
          res.status(400).send({ msg: "Incorrect Password" });
        }
      });
    } else {
      res.status(400).send({ msg: error.message });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { userRouter };
