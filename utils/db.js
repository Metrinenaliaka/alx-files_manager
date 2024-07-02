import { MongoClient } from 'mongodb';

async function connectToMongo(dbClient) {
  await dbClient.client.connect();
  dbClient.db = dbClient.client.db(dbName);
}

class DBClient {
  constructor() {
    const url = process.env.DB_HOST || 'mongodb://localhost:27017';
    const dbName = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
    connectToMongo.call(this);
  }

  // async connectToMongo() {
  //   await this.client.connect();
  //   this.db = client.db(dbName);
  // }

  isAlive = async () => {
    if (!this.db) {
      await connectToMongo.call(this);
    }
    return this.db !== null;
  }

  async nbUsers() {
    try {
      const value = await this.client.db(process.env.DB_DATABASE || 'files_manager').collection('users').countDocuments();
      return value;
    } catch (error) {
      return 0;
    }
  }

  async nbFiles() {
    try {
      const value = await this.client.db(process.env.DB_DATABASE || 'files_manager').collection('files').countDocuments();
      return value;
    } catch (error) {
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
