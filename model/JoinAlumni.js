const mongoose = require("mongoose");

const joinAlumniSchema = new mongoose.Schema({
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
  position: {
    type: String,
    // required:true,
  },
  medal: {
    type: String,
    // required: true,
  },
  achievements: {
    type: String,
    // required:true,
  },

  higherstudies1: {
    type: String,
    // required:true,
  },
  higherStudies2: {
    type: String,
    // required: true,
  },
  higherStudies3: {
    type: String,
    // required:true,
  },

  workExperience1: {
    type: String,
    // required:true,
  },
  workExperience2: {
    type: String,
    // required: true,
  },
  workExperience3: {
    type: String,
    // required:true,
  },

  currentOrganisation: {
    type: String,
    // required:true,
  },
});

const JoinAlumni = mongoose.model("JoinAlumni", joinAlumniSchema);

module.exports = JoinAlumni;
