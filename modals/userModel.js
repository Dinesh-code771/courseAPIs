const mongoose = require("mongoose");
const Joi = require("joi");
//create schema

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    refreshToken: { type: String, required: false },
  },
  false
);

const User = mongoose.model("User", UserSchema, "users");

//create schema for validation req details
const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
});

module.exports = {
  User,
  validateUserSchema,
};
