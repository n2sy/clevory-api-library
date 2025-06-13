const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();
const isAuth = async (req, res, next) => {
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
  //1ere méthode : le role se trouve dans le tokeb
  //req.roleUser = decodedToken.role;

  //2eme méthode : on va aller chercher par nous meme le role à partir de l'id récupéré depuis le token
  let u = await User.findById(decodedToken.id);
  req.roleUser = u.role;
  // Next permet de passer la main au midlleware (ou controleur) suivant
  next();
};

module.exports = isAuth;
