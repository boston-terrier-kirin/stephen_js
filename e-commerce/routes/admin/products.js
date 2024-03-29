const express = require('express');
const multer = require('multer');
const productsRepository = require('../../repository/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsEditTemplate = require('../../views/admin/products/edit');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');
const { handleErrors, requireAuth } = require('./middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  if (!req.session.userId) {
    res.redirect('/signin');
  }

  const products = await productsRepository.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(productsNewTemplate({ req }));
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepository.create({ title, price, image });

    res.redirect('/admin/products');
  }
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await productsRepository.getOne(req.params.id);
  if (!product) {
    res.send('Product not found');
  }

  res.send(productsEditTemplate({ product }));
});

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, async (req) => {
    const product = await productsRepository.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (req.file) {
      changes.image = req.file.buffer.toString('base64');
    }

    try {
      await productsRepository.update(id, changes);
    } catch (err) {
      return res.send('Could not find item');
    }

    res.redirect('/admin/products');
  }
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  await productsRepository.delete(req.params.id);

  res.redirect('/admin/products');
});

module.exports = router;
