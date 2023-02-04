import { Connection } from "../../../DatabaseUtils/mongoDBConnection";
import { ethers } from "ethers";
export default async function handler(req, res) {
  console.log("getting all created bids ");
  const { collectioncreator } = req.query;
  console.log("collection creator", typeof(collectioncreator));

  if (collectioncreator === undefined) {
    try {
      const client = await Connection();
      const db = client.db("cclMaketplace");
      const collectionData = db.collection("collection");
      console.log("client", client);
      const response = await collectionData.find().toArray();
      res.status(200).json({
        success: true,
        message: "getting all collection",
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "failed to get all collection",
        data: err,
      });
    }
  } else {
    try {
      const client = await Connection();
      const db = client.db("cclMaketplace");
      const collectionData = db.collection("collection");
      console.log("inside backend creator", collectioncreator);
      const response = await collectionData
        .find({
          _creator: {
            $regex: new RegExp("^" + collectioncreator.toLowerCase(), "i"),
          },
        })
        .toArray();

      console.log("response", response);

      res.status(200).json({
        success: true,
        message: `getting collection by ${collectioncreator}`,
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: `failed to get collection by ${collectioncreator}`,
        data: err,
      });
    }
  }
}
