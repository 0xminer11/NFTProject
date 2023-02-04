const { MongoClient } = require("mongodb");
const { ethers } = require("ethers");

async function getBiddingHistory(req, res) {
  const { tokenAddress, tokenID } = req.query;
  console.log(
    `getting bidding history for token address ${tokenAddress} and token id ${tokenID}`
  );

  res.status(200).json({ data: "api shifted to next server" });
}

module.exports = { getBiddingHistory };
