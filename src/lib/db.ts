import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  const client = await MongoClient.connect(connectionString);
  return client;
}

export async function databaseSession(client: MongoClient) {
  const session = client.startSession();
  return session;
}
