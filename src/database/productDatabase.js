const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, '..', '..', 'db.json');

async function delayReadProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function readProducts() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

module.exports = {
  readProducts,
  writeProducts,
  delayReadProducts,
};
