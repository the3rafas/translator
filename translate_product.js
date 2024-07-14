const fs = require('fs');

const enData = require('./translated_products.js');
const translatte = require('translatte');
const newCityNames = [];
new Promise(async (resolve, reject) => {
  for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(enData))) {
    try {
      if (descriptor.value.ar[1] === 'خيار') continue;
      if (!descriptor.value.ar[8]) continue;
      await translatte(descriptor.value.ar[8], {
        from: 'ar',
        to: 'en',
      })
        .then((res) => {
          newCityNames.push({ 'en-description': res.text, id: key });
        })
        .catch((err) => {
          newCityNames.push({ 'en-description': '', id: key });
        });
    } catch (error) {
      console.log('wow');
    }
  }
  fs.writeFileSync('product-description.json', JSON.stringify(newCityNames, null, 4));
}).then(() => {});
