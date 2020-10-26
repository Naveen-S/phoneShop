// Instead of placing all routes in one place, separate it out into multiple files.
import express from 'express';
// For exception handling
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

// @desc fetch all Products
// @routes Get /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc fetch single Product
// @routes Get /api/product/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
