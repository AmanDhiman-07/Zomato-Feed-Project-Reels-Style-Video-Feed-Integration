// server is create here

const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
