const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Initialize MongoDB client
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

// Establish persistent database connection
async function connectDB() {
  try {
    await client.connect();
    // Connect to the specific database 'ecommerce'
    db = client.db("ecommerce");
    
    // Ping to verify connection
    await db.command({ ping: 1 });
    console.log("Pinged deployment. Successfully connected to MongoDB database 'ecommerce'!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Router configuration
const router = express.Router();

/**
 * GET /
 * Retrieves all active, featured categories along with their newest 5 products
 * using a single MongoDB Aggregation query.
 */
router.get('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({
        success: false,
        error: "Database connection not initialized"
      });
    }

    const categoriesCollection = db.collection("categories");

    // Definition of the aggregation pipeline to fetch featured categories and their products
    const pipeline = [
      
      /**
       * STAGE 1: Filter Categories
       * Matches only categories that are marked as featured and active.
       */
      {
        $match: {
          isFeatured: true,
          status: "active"
        }
      },

      /**
       * STAGE 2: Lookup Products
       * Performs a left outer join to the "products" collection.
       * Uses a custom lookup pipeline to limit and sort the joined products.
       */
      {
        $lookup: {
          from: "products",
          let: { categoryIdObj: "$_id" }, // Define category _id as a variable for the sub-pipeline
          pipeline: [
            // Sub-stage 1: Match products where products.categoryId matches categories._id
            {
              $match: {
                $expr: { $eq: ["$categoryId", "$$categoryIdObj"] }
              }
            },
            // Sub-stage 2: Sort products by newest first (descending _id order)
            {
              $sort: { _id: -1 }
            },
            // Sub-stage 3: Limit the output to the first 5 products for each category
            {
              $limit: 5
            }
          ],
          as: "products" // Output the joined documents inside a "products" array field
        }
      },

      /**
       * STAGE 3: Filter Categories with Products
       * Matches only categories that have at least one product in their products array.
       * If a category has no products, it will be excluded.
       */
      {
        $match: {
          "products.0": { $exists: true }
        }
      }
    ];

    const featuredData = await categoriesCollection.aggregate(pipeline).toArray();
    res.json(featuredData);

  } catch (error) {
    console.error("Aggregation endpoint error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// Register routes
app.use('/', router);

// Start Server after connecting to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
