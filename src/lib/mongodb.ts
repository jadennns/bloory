import { Db, MongoClient } from "mongodb";

let cachedDb: Db;

export const dbConnect = async () => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_NAME);
  cachedDb = db;

  return db;
};
