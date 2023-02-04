const etherjs = require("ethers");
const { ERC721_BID_ABI } = require("../contract/abis/ERC721Bid");
const { MongoClient } = require("mongodb");

async function handleBid() {
  const ERC721BidAddress = process.env.ERC721_BID_CONTRATC_ADDRESS;

  const provider = new etherjs.providers.JsonRpcProvider(
    process.env.POLYGON_TESTNET_PROVIDER
  );

  const contract = new etherjs.Contract(
    ERC721BidAddress,
    ERC721_BID_ABI,
    provider
  );

  const STATE_CREATED = "CREATED";
  const STATE_ACCEPTED = "ACCEPTED";
  const STATE_CANCELLED = "CANCELLED";

  const client = new MongoClient(process.env.DB_CONNECTION_URI);
  const db = client.db("cclMaketplace");
  const biddingDataCollection = db.collection("biddingData");
  console.log(`adding event listner on bidding contract address ${ERC721BidAddress}`);

  // biddingDataCollection.drop()

  // const response = await biddingDataCollection.find({
  //   state: { $eq: "CANCELLED" },
  // });

  // console.log("response", await response.toArray());

  contract.on(
    "BidCreated",
    async (
      _id,
      _tokenAddress,
      _tokenId,
      _bidder,
      _price,
      _expiresAt,
      _fingerprint,
      transactionHash
    ) => {
      console.log({
        _id,
        _tokenAddress,
        _tokenId,
        _bidder,
        _price,
        _expiresAt,
        _fingerprint,
        transactionHash,
      });

      const filter = { _id };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          _id,
          _tokenAddress,
          _tokenId,
          _bidder,
          _price,
          _expiresAt,
          _fingerprint,
          _seller: "",
          BidCreatedHash: transactionHash.transactionHash,
          BidAcceptedHash: "",
          BidCancelledHash: "",
          BidState: STATE_CREATED,
        },
      };

      const result = await biddingDataCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log("BID CREATED", result);
    }
  );

  contract.on(
    "BidAccepted",
    async (
      _id,
      _tokenAddress,
      _tokenId,
      _bidder,
      _seller,
      _price,
      _fee,
      transactionHash
    ) => {
      const filter = { _id, BidState: { $eq: STATE_CREATED } };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
          _seller,
          BidAcceptedHash: transactionHash.transactionHash,
          BidState: STATE_ACCEPTED,
        },
      };

      const result = await biddingDataCollection.updateOne(
        filter,
        updateDoc,
        options
      );


      
      console.log("BID ACCEPTED", result);
    }
  );

  contract.on(
    "BidCancelled",
    async (_id, _tokenAddress, _tokenId, _bidder, transactionHash) => {
      const filter = { _id, BidState: STATE_CREATED };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          BidCancelledHash: transactionHash.transactionHash,
          BidState: STATE_CANCELLED,
        },
      };

      const result = await biddingDataCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log("BID CANCELLED", result);
    }
  );
}
module.exports = { handleBid };
