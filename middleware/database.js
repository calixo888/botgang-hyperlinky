import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/botgang";

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('botgang');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
