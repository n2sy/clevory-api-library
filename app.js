const express = require("express");
const connectDB = require("./config/db");

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log("Failed to start server", error);
  }
};
startServer();
