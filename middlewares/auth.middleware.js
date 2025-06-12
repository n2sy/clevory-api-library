const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuth = (req, res, next) => {
  console.log("zzzzzz");

  let authValue = req.header("Authorization"); //.replace("bearer ", "")
  if (!authValue) {
    res.status(401).json({ message: "User Not Logged" });
  }
  let tokenSent = authValue.split(" ")[1];
  const decodedToken = jwt.verify(tokenSent, process.env.SECRET_KEY);
  console.log(decodedToken);
  if (!decodedToken) res.status(401).json({ message: "Invalid Token" });

  // Next permet de passer la main au midlleware (ou controleur) suivant
  next();
};

module.exports = isAuth;
