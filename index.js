const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./Route/Product");
const reviewRouter = require("./Route/Review");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Deployed to AWS !");
});

/* Routes */
app.use("/api/Product", productRouter);
app.use("/api/Review", reviewRouter);

module.exports = app;