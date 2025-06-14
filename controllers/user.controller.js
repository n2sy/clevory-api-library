const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
exports.loginHandler = async (req, res) => {
  let { email, password } = req.body;

  let u = await User.findOne({ email: email });
  if (!u) {
    res.status(404).json({ message: "Invalid login" });
  }

  let pwdMatching = await bcrypt.compare(password, u.password);
  if (!pwdMatching) {
    res.status(401).json({ message: "Invalid Password" });
  }

  const generatedToken = jwt.sign(
    // { name: u.name, role: u.role, id: u._id },
    { id: u._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "User Logged",
    role: u.role,
    token: generatedToken,
  });
};
