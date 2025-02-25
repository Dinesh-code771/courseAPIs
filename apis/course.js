const express = require("express");
const path = require("path");
const { Worker } = require("worker_threads");
const router = express.Router();
const Joi = require("joi");
const { Course, validateReqCourseSchema } = require("../modals/courseModal");


// GET request to get all courses
router.get("/", async (req, res) => {
  try {
    const courseName = req.query.courseName;

    if (!courseName) {
      const data = await Course.find({})
        .populate("author", "name -_id")
        .select("courseName author");

      console.log(data, "data");
      res.json(data);
      return;
    }
    const course = await Course.find({
      courseName: { $regex: new RegExp(courseName, "i") },
    });
    res.json(course);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// post request to add a new course
router.post("/", async (req, res) => {
  try {
    const validateRsult = validateReqCourseSchema.validate(req.body);
    if (validateRsult.error) {
      res.status(400).send(validateRsult.error.details[0].message);
      return;
    }
    console.log(req.body);
    const newCourse = new Course(req.body); //create a new course document
    //validate the new course and excute my funtion after validation

    await newCourse.save(); //save to the database
    res.send(newCourse); //send the document back to the client
  } catch (err) {
    let errorMessage = [];
    for (feild in err.errors) {
      console.log(`error from backend${err.errors[feild].message}`);
      errorMessage.push(err.errors[feild].message);
    }
    console.log(err, "erroe");
    res.status(500).send(err);
  }
});

//delete request to delete a course
router.delete("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      res.status(404).send("The course with the given ID was not found");
      return;
    }
    res.send(course);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// put request to update a course
router.put("/:id", async (req, res) => {
  try {
    const validateResult = validateReqCourseSchema.validate(req.body);
    //validate the user input
    if (validateResult.error) {
      res.status(400).send(validateResult.error.details[0].message);
      return;
    }

    //find  the course by id and update it
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    //if the course is not found throw an error
    if (!course) {
      res.status(404).send("The course with the given ID was not found");
      return;
    }
    // everything is ok send the updated course back to the client
    res.send(course);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// patch request to update a course
router.patch("/:id", (req, res) => {
  //take details from request
  const courseId = req.params.id;
  const findCourse = courses.find((course) => course.id === parseInt(courseId));
  // if the course is not found throw an error
  if (!findCourse) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  //validation
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  courses.forEach((course) => {
    if (course.id === parseInt(courseId)) {
      course.name = req.body.name;
    }
  });
  const updatedCourse = courses.find(
    (course) => course.id === parseInt(courseId)
  );
  res.send(updatedCourse);
});

router.get("/posts", async (req, res) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  res.send(posts);
});

router.get("/set", (req, res) => {
  setTimeout(() => {
    res.send("Hello");
  }, 10000);
});

router.get("/html", (req, res) => {
  res.render("index", {
    title: "My Express App",
    message: "Hello",
    list: courses,
  });
});

router.get("/heavy-task", (req, res) => {
  //ofload the task to worker thread
  const worrker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: { it: 1000000000 },
  });
  //listen for ther result
  worrker.on("message", (result) => {
    res.send(`Result is ${result}`);
  });

  //handle error
  worrker.on("error", (error) => {
    res.send(error.message);
  });
});

module.exports = router;
