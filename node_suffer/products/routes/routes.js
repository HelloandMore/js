import express from 'express';
import * as productControl from '../controllers/controllers.js';

const router = express.Router();

// GET all products
router.get('/product', productControl.getAll);

// GET a product by ID
router.get('/product/:id', productControl.getById);

// POST a new product
router.post('/product', productControl.create);

// PUT update a product by ID
router.put('/product/:id', productControl.updateById);

// DELETE a product by ID
router.delete('/product/:id', productControl.deleteById);

export default router;