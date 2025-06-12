const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.registerHandler = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let existingUser = await User.findOne({ email: email }); //         User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    let cryptedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({
      name,
      email,
      password: cryptedPassword,
      role: role || "user",
    });
    let reponse = await newUser.save();

    res.status(201).json({
      message: "User Successfully registred",
      save: reponse,
    });
  } catch (err) {
    res.statut(400).json({ message: "Can not add this user" });
  }
};
exports.loginHandler = (req, res) => {};
