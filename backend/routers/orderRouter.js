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
      if (!result) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error fetching order by ID' });
    });
});

// Update order by ID
router.put('/update/:id', (req, res) => {
  OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      if (!result) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error updating order' });
    });
});

// Delete order by ID
router.delete('/delete/:id', (req, res) => {
  OrderModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json({ message: 'Order deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting order' });
    });
});

module.exports = router;
