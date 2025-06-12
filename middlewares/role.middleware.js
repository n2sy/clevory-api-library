const role = (requestedRole) => {
  return (req, res, next) => {
    if (req.roleUser != requestedRole) {
      return res.status(403).json({ error: "Invalid Permission" });
    }
    next();
  };
};

module.exports = role;
