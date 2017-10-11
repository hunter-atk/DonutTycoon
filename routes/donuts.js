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

module.exports = router;
