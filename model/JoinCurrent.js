const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearOfPassing: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
