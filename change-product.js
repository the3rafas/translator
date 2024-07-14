const fs = require('fs');
const product = JSON.parse(fs.readFileSync('new-product-title-back-up.json', 'utf8'));
const enData = require('./translated_products.js');

const mappedProduct = product.map((item) => {
  const arDescription = enData?.[item.id]?.ar?.[8];
  return { ...item, 'ar-description': arDescription || '' };
});
fs.writeFileSync('new-product-title.json', JSON.stringify(mappedProduct, null, 4));
