const express = require('express');
const shops = require('../controllers/shops');

const router = express.Router();

router.route('/')
  .get(shops.index)
  .post(shops.create);

router.route('/new').get(shops.createPage);

router.route('/:id/addinventory')
  .get(shops.addInventoryPage)
  .post(shops.addinventory);

router.route('/:id/donuts')
  .get(shops.getShopsDonuts);

// router.get('/:id/donuts', (req, res, next) => {
//   knex('shops_donuts')
//     .join('donuts', 'shops_donuts.donut_id', 'donuts.id')
//     .where('shops_donuts.shop_id', req.params.id)
//     .select('*')
//     .then((donuts) => {
//       res.status(200).json(donuts);
//     })
//     .catch(err => next(err));
// });

router.route('/:id/edit').get(shops.editPage);

router.route('/:id')
  .get(shops.showPage)
  .patch(shops.edit)
  .delete(shops.destroy);

module.exports = router;
