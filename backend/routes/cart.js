const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Receipt = require('../models/Receipt');

// Get cart
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().populate('product');
    const total = items.reduce((s, it) => s + (it.qty * (it.product?.price || 0)), 0);
    res.json({ items, total });
  } catch (err) {
    console.error('Error in GET /api/cart:', err);
    res.status(500).json({ error: 'Server error fetching cart' });
  }
});

// Add to cart
router.post('/', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

  const existing = await CartItem.findOne({ product: productId });
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  if (existing) {
    existing.qty += qty;
    await existing.save();
    return res.json(existing);
  }
  const item = new CartItem({ product: productId, qty, priceAtAdd: product.price });
  await item.save();
  res.status(201).json(item);
});

// Delete product
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  const result = await CartItem.findOneAndDelete({ product: productId });
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
});

// Checkout (create receipt)
router.post('/checkout', async (req, res) => {
  const { name, email } = req.body;
  const items = await CartItem.find().populate('product');
  if (!items || items.length === 0) return res.status(400).json({ error: 'Cart empty' });

  const total = items.reduce((s, it) => s + it.qty * (it.product?.price || 0), 0);
  const receipt = await Receipt.create({
    name, email,
    items: items.map(it => ({ product: it.product?._id, qty: it.qty, price: it.product?.price || 0 })),
    total
  });

  // clear cart
  await CartItem.deleteMany({});
  res.json({ receiptId: receipt._id, total, timestamp: receipt.createdAt, items: receipt.items });
});

module.exports = router;