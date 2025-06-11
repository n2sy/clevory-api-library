const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/book.routes");

const app = express();
app.use(express.json());
app.use("/books", bookRoutes);

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
