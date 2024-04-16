const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./Route/Product");
const reviewRouter = require("./Route/Review");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Deployed to AWS !");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

/* Routes */
app.use("/api/Product", productRouter);
app.use("/api/Review", reviewRouter);
