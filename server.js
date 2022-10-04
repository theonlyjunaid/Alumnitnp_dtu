const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/User");
const path = require("path");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.post("/registration", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.sendFile(path.join(__dirname, "public/registration.html"));
  } catch (error) {
    res.send("No");
  }
});

app.listen(3000, (req, res) => {
  console.log("Server is up at 3000");
});
