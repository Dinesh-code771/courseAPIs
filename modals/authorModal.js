const mongoose = require("mongoose");
const Joi = require("joi");

//create schema
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  bio: { type: String, required: true, minlength: 3, maxlength: 255 },
//   trim: { type: String, required: true, minlength: 3, maxlength: 255 },
});

//create model
const Author = mongoose.model("Author", authorSchema, "authors");

//create schema for validation req details
const validateReqAuthorSchema = Joi.object({
  name: Joi.string().min(3).required(),
  bio: Joi.string().min(3).required(),
});

module.exports = {
  Author,
  validateReqAuthorSchema,
};
