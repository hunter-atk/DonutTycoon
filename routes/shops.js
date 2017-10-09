/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('shops')
    .then((data) => {
      res.status(200).render('shops/index', {shops: data});
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api', (req, res) => {
  knex('shops')
    .then((shops) => {
      res.status(200).json(shops);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/new', (req, res) => {
  res.render('shops/new');
});

router.get('/:id', (req, res) => {
  res.render('shops/show');
});


router.get('/:id/edit', (req, res) => {
  res.render('shops/edit');
});

module.exports = router;
