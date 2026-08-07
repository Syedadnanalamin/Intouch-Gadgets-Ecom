const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, db } = require('./db');
const { 
  getFeaturedCategories, 
  getAllProducts, 
  getProductById 
} = require('./controllers/productsController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Products API Routes
app.get('/api/products/featured', getFeaturedCategories);
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);

// Fallback Route
app.get('/', (req, res) => {
  res.send('Intouch Gadgets Ecom API is running...');
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
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

// GET /api/orders/:orderId
app.get('/api/orders/:orderId', async (req, res) => {
  try {
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
