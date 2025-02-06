const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { strict: false }
);
const User = mongoose.model("User", userSchema, "users");

const UserRefreshToken = mongoose.model(
  "UserRefreshToken",
  userSchema,
  "refreshTokens"
);

router.post("/register", async (req, res) => {
  try {
    const { password, email, conform_password } = req.body;
    const result = schema.validate({ email, password });

    if (password !== conform_password) {
      return res.status(400).send("Password does not match");
    }
    //if the validation fails send a message
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    // if user already exit in the database send a message
    //check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    //add the user to the database
    const user = new User({ email, password });
    const userData = await user.save();
    console.log(userData);
    const token = jwt.sign(
      { id: userData._id.toString(), email: userData.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const referenceToken = jwt.sign(
      { id: userData._id.toString(), email: userData.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    //store the refresh token in db with the user id
    const refreshToken = new UserRefreshToken({
      email: email,
      referenceToken: referenceToken,
    });
    await refreshToken.save();

    res.send({
      access: token,
      refresh: referenceToken,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const result = schema.validate({ email, password });

    //if the validation fails send a message
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    //find the user
    const user = await User.findOne({ email });
    console.log(user, "user");
    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    const referenceToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    //store the refresh token in db with the user id
    const refreshToken = new UserRefreshToken({
      email: email,
      refereneToken: referenceToken,
    });
    await refreshToken.save();
    res.send({
      access: token,
      refresh: referenceToken,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    //if the validation fails send a message
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

    //find the user and the refresh token and check if the token is valid
    const user = await UserRefreshToken.findOne({
      email: decoded.email,
      refereneToken: refreshToken,
    });
    console.log(user, "user");
    //if the user does not exist send a message
    if (!user) {
      return res.status(400).send("Invalid token");
    }

    //generate a new access token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    res.send({
      access: token,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
