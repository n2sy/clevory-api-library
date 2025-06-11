const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://nidhal:azerty@cvproject.cpsst.mongodb.net/libraryDB`
    );
    console.log("MongoDB Connected");
    return conn;
  } catch (err) {
    console.log("Probléme de connexion avec MongoDB");
  }
};

module.exports = connectDB;
