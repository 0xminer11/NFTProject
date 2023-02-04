const { MongoClient, Db } = require("mongodb");
const { handleBid } = require("./Events/handleBid");
const { handleNewCollection } = require("./Events/handleNewCollection");

async function connection() {
  let client;
  try {
    client = new MongoClient(process.env.DB_CONNECTION_URI);
    await client.connect();
    console.log("connection stablished to the DB...");
  } catch (err) {
    console.log("failed to connect to db", err);
    return;
  }

  return client;
}

async function setUpConnection(app) {
  // const client = await connection();
  const port = process.env.PORT || 3000;
  app.listen(port, async (success, err) => {
    console.log(`Server listing on port ${port}`);
    await connection();
    await handleBid();
    await handleNewCollection();
  });

  // return client;
}

module.exports = { connection, setUpConnection };
