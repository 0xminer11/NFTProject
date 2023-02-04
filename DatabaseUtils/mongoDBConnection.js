import { MongoClient } from "mongodb";

const { DB_CONNECTION_URI } = process.env;

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function Connection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(DB_CONNECTION_URI, opts).then(
      (client) => {
        return client;
      }
    );
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
