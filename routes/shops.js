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

router.get('/new', (req, res, next) => {
  res.render('shops/new');
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
