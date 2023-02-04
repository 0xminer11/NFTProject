const etherjs = require("ethers");
const { MongoClient } = require("mongodb");
const { FACTORY_CONTRACT_ABI } = require("../contract/abis/Factory");

async function handleNewCollection() {
  const FactoryContractAddress = process.env.FACTORY_CONTRACT_ADDRESS;

  const provider = new etherjs.providers.JsonRpcProvider(
    process.env.POLYGON_TESTNET_PROVIDER
  );

  const contract = new etherjs.Contract(
    FactoryContractAddress,
    FACTORY_CONTRACT_ABI,
    provider
  );

  const client = new MongoClient(process.env.DB_CONNECTION_URI);
  const db = client.db("cclMaketplace");
  const collectionData = db.collection("collection");
  console.log(
    `adding event listner on factory contract address ${FactoryContractAddress}`
  );

  // biddingDataCollection.drop()

  // const response = await biddingDataCollection.find({
  //   state: { $eq: "CANCELLED" },
  // });

  // console.log("response", await response.toArray());

  contract.on(
    "CreatedNFTCollection",
    async (_creator, _nft, _name, _symbol, transactionHash) => {
      console.log({
        _creator,
        _nft,
        _name,
        _symbol,
        transactionHash,
      });

      const filter = { _creator, _nft, _name, _symbol };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          _creator,
          _nft,
          _name,
          _symbol,
          collectionHash: transactionHash.transactionHash,
        },
      };
      const result = await collectionData.updateOne(filter, updateDoc, options);
      console.log(`${_name} collection added`);
      console.log("response", result);
    }
  );
}
module.exports = { handleNewCollection };
