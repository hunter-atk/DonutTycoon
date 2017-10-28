const Shop = require('../models/shop');
const knex = require('../db/knex');

const index = (req, res, next) => {
  Shop.all()
    .then(shops => res.status(200).render('shops/index', { shops }))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  if (req.body.name && req.body.city) {
    Shop.create({
      name: req.body.name,
      city: req.body.city,
    })
      .then(newShop => res.redirect(`/shops/${newShop[0].id}`))
      .catch(err => next(err));
  } else {
    // if form is not complete, do not post AND send error
    res.render('shops/new', { error: 'Please be sure all fields are completed' });
  }
};

const createPage = (req, res, next) => {
  res.render('shops/new', { error: '' });
};

const showPage = (req, res, next) => {
  Shop.findById(req.params.id)
    .then((shop) => {
      knex('shops_donuts')
        .join('donuts', 'shops_donuts.donut_id', 'donuts.id')
        .where('shops_donuts.shop_id', req.params.id)
        .select('*')
        .then((donuts) => {
          res.status(200).render('shops/show', { shop, donuts });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const edit = (req, res, next) => {
  Shop.edit(req.params.id, req.body)
    .then(() => res.status(204).redirect(`/shops/${req.params.id}`))
    .catch(err => next(err));
};

const editPage = (req, res, next) => {
  Shop.findById(req.params.id)
    .then(shop => res.status(200).render('shops/edit', { shop }))
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  Shop.destroy(req.params.id)
    .then(() => res.status(204).redirect('/shops'))
    .catch(err => next(err));
};

// TODO - move to separate shops_donuts controller
const addInventoryPage = (req, res, next) => {
  knex('donuts').orderBy('id')
    .then(donuts => res.render('shops/addinventory', { donuts, id: req.params.id }))
    .catch(err => next(err));
};

const addinventory = (req, res, next) => {
  if (Array.isArray(req.body.donut_ids)) {
    req.body.donut_ids.forEach((id) => {
      knex('shops_donuts')
        .insert({ shop_id: req.params.id, donut_id: id })
        .then(() => null)
        .catch(err => next(err));
    });
    res.redirect(`/shops/${req.params.id}`);
  } else {
    knex('shops_donuts')
      .insert({ shop_id: req.params.id, donut_id: req.body.donut_ids })
      .then(() => res.redirect(`/shops/${req.params.id}`))
      .catch(err => next(err));
  }
};

const getShopsDonuts = (req, res, next) => {
  knex('shops_donuts')
    .join('donuts', 'shops_donuts.donut_id', 'donuts.id')
    .where('shops_donuts.shop_id', req.params.id)
    .select('*')
    .then(donuts => res.status(200).json(donuts))
    .catch(err => next(err));
};


module.exports = {
  index,
  create,
  createPage,
  addInventoryPage,
  addinventory,
  getShopsDonuts,
  editPage,
  edit,
  showPage,
  destroy,
};
