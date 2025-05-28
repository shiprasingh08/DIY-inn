const express = require('express');
const OrderModel = require('../models/orderModel');
require('dotenv').config();

const router = express.Router();

// Create a new order
router.post('/create', (req, res) => {
  console.log(req.body);

  new OrderModel(req.body).save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong while creating order' });
    });
});

// Get all orders
router.get('/getall', (req, res) => {
  OrderModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to fetch orders' });
    });
});

// Get order by ID
router.get('/getbyid/:id', (req, res) => {
  OrderModel.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to fetch order' });
    });
});

// Update order by ID
router.put('/update/:id', async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update order' });
  }
});

// Delete order by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

module.exports = router;
