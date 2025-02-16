const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const movieDetailsTypeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
});

const MovieDetailsType = mongoose.model(
  "MovieDetailsType",
  movieDetailsTypeSchema
);
const movieDetailsTypeValidateSchema = Joi.object({
  userId: JoiObjectId().required(),
  movieId: JoiObjectId().required(),
});
module.exports = {
  MovieDetailsType,
  movieDetailsTypeSchema,
  movieDetailsTypeValidateSchema,
};
