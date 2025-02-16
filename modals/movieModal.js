const mongoose = require("mongoose");
const Joi = require("joi");
const { movieDetailsTypeSchema } = require("./movieDetailsTypeModal");
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model("Movie", movieSchema);

const movieValidateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  numberInStock: Joi.number().min(0).max(255).required(),
  dailyRentalRate: Joi.number().min(0).max(255).required(),
  details: Joi.object().required(),
});

module.exports = { Movie, movieValidateSchema };
