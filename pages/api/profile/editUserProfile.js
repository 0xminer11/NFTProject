import { Connection } from "../../../DatabaseUtils/mongoDBConnection";
import { ethers } from "ethers";
export default async function handler(req, res) {
  const client = await Connection();
  const db = client.db("cclMaketplace");
  const userData = db.collection("userdata");

  const {
    walletAddress,
    userName,
    email,
    description,
    website,
    twitter,
    instagram,
  } = req.body;

  console.log("user wallet address", walletAddress);
  if (walletAddress !== undefined) {
    try {
      const filter = { walletAddress };
      const options = { upsert: true };

      let updateObj = {};

      if (userName !== undefined) {
        updateObj["userName"] = userName;
      }
      if (email !== undefined) {
        updateObj["email"] = email;
      }
      if (description !== undefined) {
        updateObj["description"] = description;
      }
      if (website !== undefined) {
        updateObj["website"] = website;
      }
      if (twitter !== undefined) {
        updateObj["twitter"] = twitter;
      }
      if (instagram !== undefined) {
        updateObj["instagram"] = instagram;
      }

      console.log("valid data ", {
        ...updateObj,
      });

      const updateDoc = {
        $set: {
          walletAddress,
          ...updateObj,
        },
      };
      await userData.updateOne(filter, updateDoc, options);
      console.log(`${walletAddress} profile updated`);
      res.status(200).json({
        success: true,
        message: `${walletAddress} updated..`,
        data: response,
      });
      return;
    } catch (err) {
      res.status(200).json({
        success: false,
        message: `${walletAddress} updated failed`,
        data: err,
      });
      return;
    }
  }
  res.status(200).json({
    success: false,
    message: `Invalid Query`,
    data: "",
  });
}
