function autheticator(req, res, next) {
  //skip the register route
  console.log("req.url", req.path);
  if (
    req.path === "/api/v1/users/register" ||
    req.path === "/api/v1/users/refresh-token"
  ) {
    next();
    return;
  }
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }
  const user = jwt.verify(token, process.env.SECRET_KEY); //{name: user.name, email: user.email}
  if (!user) {
    res.status(401).send("Access denied. Invalid token.");
    return;
  }
  req.body.user = user;
  next();
}

module.exports = autheticator;
