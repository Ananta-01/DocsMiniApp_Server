const mongoose = require("mongoose");
const Notes = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 5,
      max: 50,
      required: true,
    },
    description: {
      type: String,
      min: 30,
      max: 200,
    },
    postedBy: {
      type: String,
      min: 5,
      max: 30,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("note", Notes);