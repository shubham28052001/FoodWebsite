import express from 'express';
import Order from '../models/Orders.js';

const router = express.Router();

// Save order data
router.post('/orderData', async (req, res) => {
  try {
    const { email, order_date, order_data } = req.body;

    if (!email || !order_date || !order_data) {
      return res.status(400).json({
        success: false,
        message: 'Missing email, order_date, or order_data in request body'
      });
    }

    const newOrder = {
      order_date,
      order_data
    };

    const userOrders = await Order.findOne({ email });

    if (!userOrders) {
      await Order.create({
        email,
        orders: [newOrder]
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { orders: newOrder } }
      );
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error in /orderData route:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

router.post('/myorders', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const userOrders = await Order.findOne({ email });

    if (!userOrders) {
      return res.json({ success: true, orders: [] });
    }

    return res.json({ success: true, orders: userOrders.orders });
  } catch (error) {
    console.error('❌ Fetch Orders Error:', error);
    return res.status(500).send('Server Error');
  }
});

export default router;
