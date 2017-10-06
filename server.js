/*jshint esversion: 6 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const shops = require('./routes/shops');
const donuts = require('./routes/donuts');
const employees = require('./routes/employees');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// middlewear routers
app.use('/shops', shops);
app.use('/donuts', donuts);
app.use('/employees', employees);

app.get('/', (req, res) => {
  res.send('hello world');
});

// routes not found
app.use((req, res) => {
  res.sendStatus(404);
});

// internal server errors
app.use((err, req, res, next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
