const express = require("express");
require("dotenv").config();
const path = require("path");
const courseRouter = require("./apis/course");
const isAutenicated = require("./logger");
const authRouter = require("./apis/auth");
const authorRouter = require("./apis/author");
const movieRouter = require("./apis/movies");
const Fawn = require("fawn");
const mongoose = require("mongoose");
Fawn.init(mongoose);
// const os = require("os");
// const cluster = require("cluster");

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

// if (cluster.isMaster && process.env.NODE_ENV !== "development") {
//   const numCPUs = os.cpus().length;
//   console.log(`Master ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died re-spawning...`);
//     cluster.fork();
//   });
// } else {
const app = express();
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));
// Middleware to parse the body of the reques
app.use(express.json());
// app.use(isAutenicated);
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/movies", movieRouter);
// run the server
app.listen(5000, () => console.log("Server is running on port 5000"));
// }
