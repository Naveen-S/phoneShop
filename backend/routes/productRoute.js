// Instead of placing all routes in one place, separate it out into multiple files.
import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
const router = express.Router();

// Two ways of doing the same thing.
// router.get('/', getProducts);
router.route('/').get(getProducts);

router.get('/:id', getProductById);

export default router;
