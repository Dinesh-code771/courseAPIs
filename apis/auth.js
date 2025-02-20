const express = require("express");
const router = express.Router();
const { User, validateUserSchema } = require("../modals/userModel");
const bcrypt = require("bcrypt");

function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(req);
}
router.post("/", async (req, res) => {
  const user = req.body.user;
  const userDetails = await User.findOne({ email: user.email });
  if (!userDetails) {
    res.status(400).send("Invalid email or password");
    return;
  }
  const validPassword = await bcrypt.compare(req.body.password, userDetails.password);
  if (!validPassword) {
    res.status(400).send("Invalid email or password");
    return;
  }
  res.send("Logged in successfully");
});

module.exports = router;