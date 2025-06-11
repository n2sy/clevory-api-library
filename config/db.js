const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.PROJECT}.cpsst.mongodb.net/${process.env.DB_NAME}`
    );
    console.log("MongoDB Connected");
    return conn;
  } catch (err) {
    console.log("Probléme de connexion avec MongoDB");
  }
};

module.exports = connectDB;
