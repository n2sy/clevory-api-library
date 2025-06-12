const isAuth = (req, res, next) => {
  console.log("Je suis le middleware");

  // Next permet de passer la main au midlleware (ou controleur) suivant
  next();
};

module.exports = isAuth;
