// For exception handling
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc fetch all Products
// @routes Get /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

// @desc fetch single Product
// @routes Get /api/product/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
