const express = require('express');
const productsRepository = require('../repository/products');
const productsIndexTamplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepository.getAll();

  res.send(productsIndexTamplate({ products }));
});

module.exports = router;
