const { db } = require('../db');

/**
 * POST /api/orders
 * Creates a new order in the "orders" collection.
 */
const createOrder = async (req, res) => {
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
};

/**
 * GET /api/orders/:orderId
 * Retrieves the details of a single order by its custom orderId.
 */
const getOrderDetails = async (req, res) => {
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
};

module.exports = {
  createOrder,
  getOrderDetails
};
