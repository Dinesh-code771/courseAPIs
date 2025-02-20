const express = require("express");
const router = express.Router();
const { User, validateUserSchema } = require("../modals/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAuthToken(user, time) {
  const token = jwt.sign(
    { _id: user.name, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: time }
  );
  return token;
}
router.post("/register", async (req, res) => {
  const { error } = validateUserSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //insterad of sending the user object, send a token
  const token = generateAuthToken(user, "1m");
  const refreshToken = generateAuthToken(user, "1d");
  //store the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();
  res.header("x-auth-token", token).send({ refreshToken });
});

router.get("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  //decode the refresh token
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    res.status(401).send("Access Denied. Invalid refresh token.");
  }
  const token = generateAuthToken(user, "1m");
  res.header("x-auth-token", token).send();
});

module.exports = router;
