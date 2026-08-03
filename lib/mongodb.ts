import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dayang-ev';
const dbName = process.env.MONGODB_DB || 'dayang-ev';

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    try {
      client = new MongoClient(uri, {
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 3000,
      });
      global._mongoClientPromise = client.connect();
    } catch {
      global._mongoClientPromise = undefined;
    }
  }
  clientPromise = global._mongoClientPromise || null;
} else {
  // In production mode, it's best to not use a global variable.
  try {
    client = new MongoClient(uri, {
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000,
    });
    clientPromise = client.connect();
  } catch {
    clientPromise = null;
  }
}

export async function getDatabase(): Promise<{ db: Db | null; client: MongoClient | null }> {
  try {
    if (!clientPromise) {
      return { db: null, client: null };
    }
    const connectedClient = await clientPromise;
    const db = connectedClient.db(dbName);
    return { db, client: connectedClient };
  } catch (error) {
    console.warn('MongoDB connection failed or unavailable, operating in fallback/demo mode:', (error as Error).message);
    return { db: null, client: null };
  }
}

export default clientPromise;
