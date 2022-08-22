const express = require('express');
const cartsRepository = require('../repository/carts');
const productsRepository = require('../repository/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepository.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepository.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({
      id: req.body.productId,
      quantity: 1,
    });
  }

  await cartsRepository.update(cart.id, {
    items: cart.items,
  });

  return res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepository.getOne(req.session.cartId);

  for (const item of cart.items) {
    const product = await productsRepository.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
  const itemId = req.body.itemId;
  const cart = await cartsRepository.getOne(req.session.cartId);

  const items = cart.items.filter((item) => {
    if (item.id !== itemId) {
      return item;
    }
  });

  await cartsRepository.update(req.session.cartId, { items });

  return res.redirect('/cart');
});

module.exports = router;
