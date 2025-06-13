const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/book.routes");
const avatarRoutes = require("./routes/avatar.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use("/avatars", express.static("images"));
app.use("/images/upload", avatarRoutes);
app.use("/books", bookRoutes);
app.use("/auth", userRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

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
