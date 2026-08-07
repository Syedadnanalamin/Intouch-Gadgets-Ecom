const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedCategories
} = require('../controllers/productsController');

router.get('/featured', getFeaturedCategories);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
