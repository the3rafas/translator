const fs = require('fs');

const city_names = JSON.parse(fs.readFileSync('index.json', 'utf8')).SA;
const translatte = require('translatte');

const newCityNames = [];
new Promise(async (resolve, reject) => {
  for (const iterator of city_names) {
    await translatte(iterator['ar-title'], { from: 'ar', to: 'en' })
      .then((res) => {
        newCityNames.push({ 'en-title': res.text, 'ar-title': iterator['ar-title'] });
      })
      .catch((err) => {
        console.error('>', err);
        newCityNames.push({ 'en-title': '', 'ar-title': iterator['ar-title'] });
      });
  }
  fs.writeFileSync('data.json', JSON.stringify(newCityNames, null, 4));
}).then(() => {});
