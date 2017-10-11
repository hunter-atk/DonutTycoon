/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

// TODO - consolidate routes
// router.route('/')
// .get()
// .patch()

router.get('/', (req, res, next) => {
  knex('shops')
    .orderBy('updated_at', 'desc')
    .then((shops) => {
      res.status(200).render('shops/index', {shops});
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
  .where({
    id: req.params.id
  })
  .first() // NEED TO DO FIRST - to get from array to object
  .then((shop) => {
    res.status(200).render('shops/show', {shop});
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/:id', (req, res, next) => {
  let updatedShop = req.body;
  knex('shops')
    .where({
      id: req.params.id
    })
    .first() // NEED TO DO FIRST - to get from array to object
    .update(updatedShop)
    .then(() => {
      res.status(204).redirect('/shops/' + req.params.id);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id/edit', (req, res, next) => {
  knex('shops')
    .where({
      id: req.params.id
    })
    .first()
    .then((shop) => {
      res.status(200).render('shops/edit', {shop});
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  knex('shops')
    .where({
      id: req.params.id
    })
    .first()
    .del()
    .then(() => {
      res.status(204).redirect('/shops');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
