const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const productsRouter = require('./routes/productsRouter');
const { getFeaturedCategories } = require('./controllers/productsController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Root endpoint fallback
app.get('/', getFeaturedCategories);

// Products Router
app.use('/api/products', productsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
