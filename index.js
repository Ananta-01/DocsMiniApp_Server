const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

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
app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)

// Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
