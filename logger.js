const jwt = require("jsonwebtoken");
function isAutenicated(req, res, next) {
  console.log("Authenticating...");
  console.log(req.path === "/api/v1/users/register", "req.originalUrl");
  //if the path is register or login then skip the authentication
  if (
    req.path === "/api/v1/users/register" ||
    req.path === "/api/v1/users/refresh-token"
  ) {
    console.log("Skipping authentication for", req.path);
    return next();
  }

  //get the token from the header
  const token = req.header("Authorization");
  console.log("token", token);
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("decoded", decoded);

    next();
  } catch (ex) {
    console.log("Error", ex);
    res.status(400).send(ex.message);
  }
}

module.exports = isAutenicated;
