const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

// URL encode the password
const encodedPassword = encodeURIComponent("Ananta@123");

// MongoDB Connection
mongoose.connect(
  `mongodb+srv://Ananta-01:${encodedPassword}@cluster0.4xmrzo1.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("MongoDB database connected successfully!!");

  // Route
  app.use("/api/auth", authRouter);
  app.use("/api/notes", notesRouter);

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Start the server
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
