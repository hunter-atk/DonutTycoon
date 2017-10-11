/*jshint esversion: 6 */

// TODO - for user login, cookie parser, cookie session

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const ejs = require('ejs');

const shops = require('./routes/shops');
const donuts = require('./routes/donuts');
const employees = require('./routes/employees');


// TODO - create index file with all routes
// const routes = require('./routes/index');


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// configure ejs for templating
app.set('view engine', 'ejs');


// middleware routers
app.use('/shops', shops);

// TODO update routes for employees to be mounted differently
// app.use('/shops/:sid/employees', routes.employees);
app.use('/shops', employees);

app.use('/donuts', donuts);


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
