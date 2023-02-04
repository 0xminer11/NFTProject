import { Connection } from "../../../DatabaseUtils/mongoDBConnection";
export default async function handler(req, res) {
  const client = await Connection();
  const db = client.db("cclMaketplace");
  const userData = db.collection("userdata");

  const { walletAddress } = req.body;

  console.log("user wallet address", walletAddress);

  if (walletAddress !== undefined) {
    try {
      const response = await userData.findOne({
        walletAddress,
      });

      res.status(200).json({
        success: true,
        message: "getting user profile data",
        data: response,
      });
      return;
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "failed to get user profile data",
        data: err,
      });
      return;
    }
  }
  res.status(200).json({ Invalid_QUERY: "Please provide wallet address" });
}
