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
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.topping && parseInt(req.body.price)) {
      let newDonut = {
        name: req.body.name,
        topping: req.body.topping,
        price: parseInt(req.body.price)
      };
      knex('donuts')
      .insert(newDonut, '*')
      .then((donut) => res.redirect(`/donuts/${donut[0].id}`))
      .catch(err => next(err));
    } else {
      res.status(200).render('donuts/new', {error: 'Please be sure to fill out all required fields'});
    }
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
  })
  .delete((req, res, next) => {
    knex('donuts')
      .where({id: req.params.id})
      .first()
      .del()
      .then(() => res.status(201).redirect('/donuts'))
      .catch(err => next(err));
  });

module.exports = router;
