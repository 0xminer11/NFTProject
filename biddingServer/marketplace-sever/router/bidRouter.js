const express = require("express");
const { getBiddingHistory } = require("../controller/bidController");

const biddingRouter = express.Router();

biddingRouter.route("/getbiddinghistory").get(getBiddingHistory);

module.exports = { biddingRouter };
