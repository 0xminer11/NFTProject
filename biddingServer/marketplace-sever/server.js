const express = require("express");
const dotenv = require("dotenv");

const { MongoClient } = require("mongodb");

const { setUpConnection } = require("./connection");
const { biddingRouter } = require("./router/bidRouter");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/nft", biddingRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Server running.." }).send();
});

setUpConnection(app)
  .then((_client) => {})
  .catch((err) => {
    console.log("err", err);
  });
