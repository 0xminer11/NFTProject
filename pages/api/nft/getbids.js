import { Connection } from "../../../DatabaseUtils/mongoDBConnection";
import { ethers } from "ethers";
export default async function handler(req, res) {
  console.log("getting all created bids ");
  const { tokenaddress, tokenid, bidstatus } = req.query;
  console.log(tokenaddress, tokenid, bidstatus);

  if (bidstatus === undefined) {
    try {
      const client = await Connection();

      const db = client.db("cclMaketplace");
      const biddingDataCollection = db.collection("biddingData");

      const response = await biddingDataCollection
        .find({
          _tokenAddress: {
            $regex: new RegExp("^" + tokenaddress.toLowerCase(), "i"),
          },
          _tokenId: new ethers.BigNumber.from(tokenid),
        })
        .toArray();
      res.status(200).json({
        success: true,
        message: "getting all bids history",
        data: response,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "failed to get all bids history",
        data: err,
      });
    }
  } else {
    switch (bidstatus.toLowerCase()) {
      case "created":
        try {
          const client = await Connection();

          const db = client.db("cclMaketplace");
          const biddingDataCollection = db.collection("biddingData");

          const response = await biddingDataCollection
            .find({
              _tokenAddress: {
                $regex: new RegExp("^" + tokenaddress.toLowerCase(), "i"),
              },
              _tokenId: new ethers.BigNumber.from(tokenid),
              BidState: "CREATED",
            })
            .toArray();
          res.status(200).json({
            success: true,
            message: "getting all created bids history ",
            data: response,
          });
        } catch (err) {
          res.status(200).json({
            success: false,
            message: "failed to get all created bid history",
            data: err,
          });
        }
        break;
      case "accepted":
        try {
          const client = await Connection();

          const db = client.db("cclMaketplace");
          const biddingDataCollection = db.collection("biddingData");

          const response = await biddingDataCollection
            .find({
              _tokenAddress: {
                $regex: new RegExp("^" + tokenaddress.toLowerCase(), "i"),
              },
              _tokenId: new ethers.BigNumber.from(tokenid),
              BidState: "ACCEPTED",
            })
            .toArray();
          res.status(200).json({
            success: true,
            message: "getting all accepted bids history ",
            data: response,
          });
        } catch (err) {
          res.status(200).json({
            success: false,
            message: "failed to get all accepted bid history",
            data: err,
          });
        }
        break;

      case "cancelled":
        try {
          const client = await Connection();

          const db = client.db("cclMaketplace");
          const biddingDataCollection = db.collection("biddingData");

          const response = await biddingDataCollection
            .find({
              _tokenAddress: {
                $regex: new RegExp("^" + tokenaddress.toLowerCase(), "i"),
              },
              _tokenId: new ethers.BigNumber.from(tokenid),
              BidState: "CANCELLED",
            })
            .toArray();
          res.status(200).json({
            success: true,
            message: "getting all cancelled bids history",
            data: response,
          });
        } catch (err) {
          res.status(200).json({
            success: false,
            message: "failed to get all cancelled bid history",
            data: err,
          });
        }
        break;
    }
  }
}
