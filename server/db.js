const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const db = client.db("intouch");

module.exports = {
  connectDB,
  db,
  client
};
