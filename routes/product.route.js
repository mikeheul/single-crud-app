const express = require('express');
const Product = require('../models/product.model.js')
const router = express.Router();
const { getProductsAPI, getProductAPI, createProductAPI, updateProductAPI, deleteProductAPI, displayProducts, deleteProduct } = require('../controllers/product.controller.js')

router.get('/displayProducts', displayProducts);
router.get('/deleteProduct/:id', deleteProduct);
router.get('/', getProductsAPI);
router.get('/:id', getProductAPI);
router.post('/', createProductAPI);
router.put('/:id', updateProductAPI);
router.delete('/:id', deleteProductAPI);

module.exports = router;