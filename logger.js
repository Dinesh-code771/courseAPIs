const jwt = require("jsonwebtoken");
function isAutenicated(req, res, next) {
  console.log("Authenticating...");
  //if the path is register or login then skip the authentication
  if (
    (req.path === "/api/auth/register" || req.path === "/api/auth/login",
    req.path === "/api/auth/refresh")
  ) {
    return next();
  }

  //get the token from the header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("Error", ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = isAutenicated;
