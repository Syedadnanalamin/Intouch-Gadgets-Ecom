const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");






    /**
     * GET /
     * Retrieves active, featured categories along with their newest 5 products
     * dynamically queried from the "intouch" database.
     */
    app.get('/', async (req, res) => {
      try {
        const db = client.db("intouch");
        const categoriesCollection = db.collection("categories");

        // Aggregation pipeline to fetch categories and nested products
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


          {
            $lookup: {
              from: "products",
              let: { categoryIdObj: "$_id" },
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
              as: "products"
            }
          },


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

    /**
     * GET /api/products/:id
     * Retrieves details for a single product from the "intouch" database by its _id.
     */
    app.get('/api/products/:id', async (req, res) => {
      try {
        const db = client.db("intouch");
        const productsCollection = db.collection("products");
        const id = req.params.id;

        let query = {};
        try {
          query = { _id: new ObjectId(id) };
        } catch (err) {
          // Fallback query if id is not a standard 24-character hex string ObjectId
          query = { _id: id };
        }

        const product = await productsCollection.findOne(query);

        if (!product) {
          return res.status(404).json({
            success: false,
            error: "Product not found"
          });
        }

        res.json(product);

      } catch (error) {
        console.error("Fetch product by ID error:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        });
      }
    });

    /**
     * GET /api/products
     * Retrieves all products in the "intouch" database sorted by newest first.
     */
    app.get('/api/products', async (req, res) => {
      try {
        const db = client.db("intouch");
        const productsCollection = db.collection("products");

        const products = await productsCollection.find({}).sort({ _id: -1 }).toArray();
        res.json(products);

      } catch (error) {
        console.error("Fetch all products error:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        });
      }
    });

    /**
     * POST /api/orders
     * Creates a new order in the "orders" collection.
     */
    app.post('/api/orders', async (req, res) => {
      try {
        const db = client.db("intouch");
        const ordersCollection = db.collection("orders");

        const {
          customerInfo,
          deliveryArea,
          paymentMethod,
          items,
          couponApplied
        } = req.body;

        if (!customerInfo || !customerInfo.fullName || !customerInfo.mobileNumber || !customerInfo.deliveryAddress || !items || items.length === 0) {
          return res.status(400).json({
            success: false,
            error: "Missing required order details."
          });
        }

        const orderId = `IT-${Math.floor(100000 + Math.random() * 900000)}`;

        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const discount = couponApplied ? subtotal * 0.1 : 0;
        const netSubtotal = subtotal - discount;

        const deliveryFee = deliveryArea === 'inside' ? 60 : deliveryArea === 'outside' ? 120 : 0;
        const finalTotal = netSubtotal + deliveryFee;

        const orderDoc = {
          orderId,
          customerInfo,
          deliveryArea,
          paymentMethod,
          items,
          couponApplied,
          pricing: {
            subtotal,
            discount,
            netSubtotal,
            deliveryFee,
            finalTotal
          },
          status: "pending",
          createdAt: new Date()
        };

        await ordersCollection.insertOne(orderDoc);

        res.status(201).json({
          success: true,
          orderId
        });

      } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        });
      }
    });

    /**
     * GET /api/orders/:orderId
     * Retrieves the details of a single order by its custom orderId.
     */
    app.get('/api/orders/:orderId', async (req, res) => {
      try {
        const db = client.db("intouch");
        const ordersCollection = db.collection("orders");
        const orderId = req.params.orderId;

        const order = await ordersCollection.findOne({ orderId });

        if (!order) {
          return res.status(404).json({
            success: false,
            error: "Order not found"
          });
        }

        res.json(order);

      } catch (error) {
        console.error("Fetch order details error:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error"
        });
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // NOTE: Commented out client.close() so the database connection stays active for incoming requests
    // await client.close();
  }
}
run().catch(console.dir);


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
