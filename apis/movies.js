const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const { Movie, movieValidateSchema } = require("../modals/movieModal");
const {
  MovieDetailsType,
  movieDetailsTypeValidateSchema,
} = require("../modals/movieDetailsTypeModal");

router.post("/", async (req, res) => {
  const validateResult = movieValidateSchema.validate(req.body);
  const movieTypeValidateResult = movieDetailsTypeValidateSchema.validate(
    req.body.details
  );
  if (validateResult.error || movieTypeValidateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }
  const movie = new Movie(req.body);
  await movie.save();
  res.send(movie);
});

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({}).select("title details");
    res.send(movies);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send("Movie not found");
    return;
  }
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  // want to update only direcotr name
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).send("Movie not found");
      return;
    }
    movie.details.director = req.body.directorName;
    await movie.save();
    res.send(movie);
  } catch (err) {
    res.status(500).send("Error updating movie: " + err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(404).send("Movie not found");
    return;
  }
  res.send(movie);
});

//rent a movie
router.post("/rent", async (req, res) => {
  //validate user id and movie id
  const validateResult = movieDetailsTypeValidateSchema.validate(req.body);
  if (validateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }
  try {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      res.status(404).send("Movie not found");
      return;
    }
    if (movie.numberInStock == 0) {
      res.status(400).send("Movie is out of stock");
      return;
    }

    const movieDetailsType = new MovieDetailsType({
      userId: req.body.userId,
      movieId: req.body.movieId,
    });
    const transaction = Fawn.Task();
    transaction.save("MovieDetailsType", movieDetailsType);
    transaction.update(
      "Movies",
      { _id: movie._id },
      { $inc: { numberInStock: -1 } }
    );
    await transaction.run();

    res.send(movieDetailsType);
  } catch (err) {
    res.status(500).send("Error renting movie: " + err.message);
  }
});

router.get("/rented/:userId", async (req, res) => {
  const movieDetailsTypes = await MovieDetailsType.find({
    userId: req.params.userId,
  })
    .populate("movieId")
    .select("movieId");
  res.send(movieDetailsTypes);
});
module.exports = router;
