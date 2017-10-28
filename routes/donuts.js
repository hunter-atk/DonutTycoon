const express = require('express');
const donuts = require('../controllers/donuts');

const router = express.Router();

router.get('/json', donuts.json);

router.route('/')
  .get(donuts.index)
  .post(donuts.create);

router.route('/new').get(donuts.createPage);

router.route('/:id/edit').get(donuts.editPage);

router.route('/:id')
  .get(donuts.showPage)
  .patch(donuts.edit)
  .delete(donuts.destroy);

module.exports = router;
