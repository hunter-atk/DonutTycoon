/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('shops working');
});

module.exports = router;
