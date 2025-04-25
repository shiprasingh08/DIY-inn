const express = require('express');
const orderRouter = express.orderRouter();



// Create a new order
router.post('/create', (req, res) => {
  const { customer, items } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing customer or items' });
  }

  const newOrder = {
    id: Date.now().toString(),
    customer,
    items,
    status: '',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order created successfully', order: newOrder });
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

//order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Update 
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  order.status = status;
  res.json({ message: 'Order status updated', order });
});

// Delete 
router.delete('/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders.splice(index, 1);
  res.json({ message: 'Order deleted successfully' });
});

module.exports = router;

