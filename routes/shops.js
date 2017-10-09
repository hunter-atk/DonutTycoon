/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('shops/index');
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
