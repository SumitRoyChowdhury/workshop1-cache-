const { readProducts, writeProducts, delayReadProducts } = require('../database/productDatabase');

async function getAllProducts() {
  return delayReadProducts();
}

async function getProductById(id) {
  const products = await delayReadProducts();
  return products.find((product) => product.id === Number(id));
}

async function createProduct(productData) {
  const products = await readProducts();
  const newProduct = {
    id: Date.now(),
    ...productData,
  };

  products.push(newProduct);
  await writeProducts(products);

  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === Number(id));

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    ...products[index],
    ...productData,
    id: Number(id),
  };

  products[index] = updatedProduct;
  await writeProducts(products);

  return updatedProduct;
}

async function patchProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === Number(id));

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    ...products[index],
    ...productData,
    id: Number(id),
  };

  products[index] = updatedProduct;
  await writeProducts(products);

  return updatedProduct;
}

async function deleteProduct(id) {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === Number(id));

  if (index === -1) {
    return null;
  }

  const deletedProduct = products[index];
  products.splice(index, 1);
  await writeProducts(products);

  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
