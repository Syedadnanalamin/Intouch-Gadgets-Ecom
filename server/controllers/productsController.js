const { db } = require('../db');
const { ObjectId } = require('mongodb');

/**
 * GET /api/products/featured
 * Retrieves active, featured categories along with their newest 5 products
 * dynamically queried from the "intouch" database.
 */
const getFeaturedCategories = async (req, res) => {
  try {
    const categoriesCollection = db.collection("categories");

    const pipeline = [
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
            {
              $match: {
                $expr: { $eq: ["$categoryId", "$$categoryIdObj"] }
              }
            },
            {
              $sort: { _id: -1 }
            },
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
};

/**
 * GET /api/products
 * Retrieves all products in the "intouch" database sorted by newest first.
 */
const getAllProducts = async (req, res) => {
  try {
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
};

/**
 * GET /api/products/:id
 * Retrieves details for a single product from the "intouch" database by its _id.
 */
const getProductById = async (req, res) => {
  try {
    const productsCollection = db.collection("products");
    const id = req.params.id;

    let query = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (err) {
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
};

module.exports = {
  getFeaturedCategories,
  getAllProducts,
  getProductById
};
