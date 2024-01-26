const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

// URL encode the password
const encodedPassword = encodeURIComponent("Ananta@123");

// MongoDB Connection
mongoose
  .connect(`mongodb+srv://Ananta-01:${encodedPassword}@cluster0.4xmrzo1.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("MongoDB database connected successfully!!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Route
app.get("/notes", (req, res) => {
  res.send("Notes fetch successful");
});

// Start the server
app.listen(8000, () => {
  console.log("App is running on port 8000");
});
