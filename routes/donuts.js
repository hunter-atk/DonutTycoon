/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/json', (req, res, next) => {
  knex('donuts')
    .orderBy('id')
    .then((donuts) => {
      res.status(200).json(donuts);
    })
    .catch((err) => {
      next(err);
    });
});

router.route('/')
  .get((req, res, next) => {
    knex('donuts')
      .then(donuts => res.status(200).render('donuts/index', {donuts}))
      .catch(err => next(err));
  });

router.route('/new')
  .get((req, res, next) => {
    res.status(200).render('donuts/new', {error: null});
  });

router.route('/:id/edit')
  .get((req, res, next) => {
    knex('donuts')
      .where({id: req.params.id})
      .first()
      .then(donut => res.status(200).render('donuts/edit', {donut}))
      .catch(err => next(err));
  });

router.route('/:id')
  .get((req, res, next) => {
    knex('donuts')
      .where({id: req.params.id})
      .first()
      .then(donut => res.status(200).render('donuts/show', {donut}))
      .catch(err => next(err));
  })
  .patch((req, res, next) => {
    knex('donuts')
      .where({id: req.params.id})
      .first()
      .update(req.body)
      .then(() => res.status(204).redirect(`/donuts/${req.params.id}`))
      .catch(err => next(err));
  });

module.exports = router;
