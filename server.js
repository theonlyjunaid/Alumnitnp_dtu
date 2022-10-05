const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/User");
const New = require("./model/New");
const Event = require("./model/Event");
const path = require("path");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URL);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const news = await New.find({});
  const eventsData = await Event.find({});
  const events = eventsData.map((item) => {
    return { ...item, date: item.date.split(" ") };
  });
  res.render("pages/index", { news, events });
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
