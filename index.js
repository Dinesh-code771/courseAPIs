const express = require("express");
require("dotenv").config();
const path = require("path");
const courseRouter = require("./apis/course");
const isAutenicated = require("./logger");
const authorRouter = require("./apis/author");
const movieRouter = require("./apis/movies");
const userRouter = require("./apis/users");
const authRouter = require("./apis/auth");
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init(mongoose);


const config = require("config");
console.log("Application Name: " + config.get("name"));
console.log(process.env.NODE_ENV);

//connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Education",
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => console.error("Could not connect to the database...", err));


const app = express();
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));
// Middleware to parse the body of the reques
app.use(express.json());
app.use(isAutenicated);
app.use(express.static("public"));
// app.use("/api/auth", authRouter);

app.use("/api/courses", courseRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/auth", authRouter);
// run the server
app.listen(5000, () => console.log("Server is running on port 5000"));
// }
