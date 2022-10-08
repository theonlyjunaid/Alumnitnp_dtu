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
  phone: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
     required:true,
  },
  course: {
    type: String,
    required: true,
  },
  yearofpassing: {
    type: String,
    required:true,
  },
  branch: {
    type: String,
    required: true,
  },
  rollString: {
    type: String,
    required:true,
  },
  position: {
    type: String,
    // required:true,
  },
  medal: {
    type: String,
    // required: true,
  },
  achievement: {
    type: String,
    // required:true,
  },


  higherstudies1: {
    type: String,
    // required:true,
  },
  higherstudies2: {
    type: String,
    // required: true,
  },
  higherstudies3: {
    type: String,
    // required:true,
  },


  workexperience1: {
    type: String,
    // required:true,
  },
  workexperience2: {
    type: String,
    // required: true,
  },
  workexperience3: {
    type: String,
    // required:true,
  },


  currentorganisation: {
    type: String,
    // required:true,
  },
  



});

const JOINALUMNI = mongoose.model("Event", joinAlumniSchema);

module.exports = JOINALUMNI;
