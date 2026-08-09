const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const productsRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

const { sendMetaCapiEvent } = require('./utils/metaCapi');

// Products API Routes
app.use('/api/products', productsRouter);

// Orders API Routes
app.use('/api/orders', ordersRouter);

// Meta Conversions API (CAPI) Proxy Route for Client Actions (AddToCart, InitiateCheckout, etc.)
app.post('/api/meta-capi', async (req, res) => {
  try {
    const { eventName, eventId, value, currency, contentName, contentIds, numItems } = req.body;
    await sendMetaCapiEvent({
      eventName,
      eventId,
      value,
      currency,
      contentName,
      contentIds,
      numItems,
      clientIp: req.ip,
      userAgent: req.headers['user-agent']
    });
    res.json({ success: true });
  } catch (error) {
    console.error("CAPI Proxy error:", error);
    res.status(500).json({ success: false });
  }
});

// Fallback Route
app.get('/', (req, res) => {
  res.send('Intouch Gadgets Ecom API is running...');
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
