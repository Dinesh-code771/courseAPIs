const mongoose = require("mongoose");
const Joi = require("joi");
const {Author } = require("./authorModal");
//create schema
const courseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, minlength: 3, maxlength: 255 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "tags should have at least one tag",
      },
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    category: {
      type: String,
      required: false,
      enum: ["web", "mobile", "network"],
    },
  },
  false
);

//create model
const Course = mongoose.model("Course", courseSchema, "courses"); // Explicit collection name //name , schema , collection name

//create schema for validation req details
const validateReqCourseSchema = Joi.object({
  courseName: Joi.string().min(3).required(),
  tags: Joi.array().required(),
  author: Joi.string().required(),
  isPublished: Joi.boolean().required(),
  rating: Joi.number().required().min(0).max(5),
  category: Joi.string().optional().valid("web", "mobile", "network"),
});

module.exports = {
  Course,
  validateReqCourseSchema,
};


