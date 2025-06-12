const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuth = (req, res, next) => {
  // Récupération de la valeur de authorization à partir du header de la requête
  let authValue = req.header("Authorization"); //.replace("bearer ", "")
  if (!authValue) {
    res.status(401).json({ message: "User Not Logged" });
  }
  let tokenSent = authValue.split(" ")[1];
  const decodedToken = jwt.verify(tokenSent, process.env.SECRET_KEY);
  console.log(decodedToken);
  if (!decodedToken) res.status(401).json({ message: "Invalid Token" });

  // On ajoute au requesst un attribut roleUser qui a pour valeur le role récupéré depuis le token et qui sera forwardé au middleware suivant
  req.roleUser = decodedToken.role;
  // Next permet de passer la main au midlleware (ou controleur) suivant
  next();
};

module.exports = isAuth;
