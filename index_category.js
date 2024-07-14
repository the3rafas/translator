const fs = require('fs');

const category = [
  'شجر صناعي',
  'ديكورات',
  'عشب صناعي',
  'بديل الخشب',
  'أحواض',
  'أثاث خارجي > جلسات,أثاث خارجي',
  'نوافير',
  'إضاءات خارجية',
  'نباتات',
  'أثاث خارجي > كراسي بين باج,أثاث خارجي',
  'أثاث خارجي,أثاث خارجي > بين بوكس',
  'أثاث خارجي,أثاث خارجي > وسائد',
  'أثاث خارجي',
  'أحواض سيراميك',
  'معطرات',
  'أثاث خارجي > جلسات',
];
const translatte = require('translatte');

const newCityNames = [];
new Promise(async (resolve, reject) => {
  for (const iterator of category) {
    await translatte(iterator, { from: 'ar', to: 'en' })
      .then((res) => {
        newCityNames.push({ 'en-title': res.text, 'ar-title': iterator });
      })
      .catch((err) => {
        console.error('>', err);
        newCityNames.push({ 'en-title': '', 'ar-title': iterator });
      });
  }
  fs.writeFileSync('category.json', JSON.stringify(newCityNames, null, 4));
}).then(() => {});
