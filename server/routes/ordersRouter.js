const express = require('express');
const router = express.Router();
const { createOrder, getOrderDetails } = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/:orderId', getOrderDetails);

module.exports = router;
