/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  knex('shops')
    .then((data) => {
      res.status(200).render('shops/index', {shops: data});
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  // if forms is complete, POST and redirect
  if (req.body.name && req.body.city) {
    knex('shops')
      .insert({
        name: req.body.name,
        city: req.body.city
      })
      .then(() => {
        res.redirect('/shops');
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // if forms is not complete, do not post AND send error
    res.render('shops/new', {error: 'Please be sure all fields are completed'});
  }
});

router.get('/new', (req, res, next) => {
  res.render('shops/new', {error: ''});
});

router.get('/:id', (req, res, next) => {
  knex('shops')
  .where({id: req.params.id})
  .first() // NEED TO DO FIRST - to get from array to object
  .then((data) => {
    res.status(200).render('shops/show', {shop: data});
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/:id', (req, res, next) => {
  let updatedShop = req.body;
  knex('shops')
    .where({id: req.params.id})
    .first() // NEED TO DO FIRST - to get from array to object
    .update(updatedShop)
    .then((data) => {
      res.status(204).redirect('/shops/' + req.params.id);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id/edit', (req, res, next) => {
  knex('shops')
    .where({id: req.params.id})
    .first()
    .then((data) => {
      res.status(200).render('shops/edit', {shop: data});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
