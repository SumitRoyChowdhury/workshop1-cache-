const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products' });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: `There is no product with id ${req.params.id}` });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch product' });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    invalidateCache();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create product' });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: `There is no product with id ${req.params.id}` });
    }

    invalidateCache();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update product' });
  }
}

async function patchProduct(req, res) {
  try {
    const product = await productService.patchProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: `There is no product with id ${req.params.id}` });
    }

    invalidateCache();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to patch product' });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: `There is no product with id ${req.params.id}` });
    }

    invalidateCache();
    return res.json({ deleted: product });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete product' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
