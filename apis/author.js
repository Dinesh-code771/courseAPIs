const express = require("express");
const router = express.Router();
const { Author, validateReqAuthorSchema } = require("../modals/authorModal");

router.post("/", async (req, res) => {
  const validateResult = validateReqAuthorSchema.validate(req.body);
  if (validateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }

  const author = new Author(req.body);
  await author.save();
  res.send(author);
});

router.get("/", async (req, res) => {
  const authors = await Author.find();
  res.send(authors);
});

module.exports = router;
