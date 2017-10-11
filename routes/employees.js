/*jshint esversion: 6 */
const express = require('express');
const rp = require('request-promise');
const router = express.Router();

const knex = require('../db/knex');

router.route('/:sid/employees')
  .get((req, res, next) => {
    knex('employees')
      .where({
        shop_id: req.params.sid
      })
      .join('shops', 'employees.shop_id', '=', 'shops.id')
      .select(
        'employees.id as e_id', 'employees.first_name', 'employees.last_name',
        'shops.id as s_id', 'shops.name')
      .then((employees_shops) => {
        res.render('employees/index', {employees_shops, shopId: req.params.sid, shopName: employees_shops[0].name});
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    let newEmployee = {
      shop_id: req.params.sid,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      hashed_password: 'hashtheplaintextpassword',
      favorite_donut: req.body.favorite_donut
    };
    knex('employees')
      .insert(newEmployee)
      .then(() => {
        res.redirect(`/shops/${req.params.sid}/employees`);
      })
      .catch((err) => next(err));
  });

router.get('/:sid/employees/:eid/edit', (req, res, next) => {
  knex('employees')
    .innerJoin('shops', 'employees.shop_id', 'shops.id')
    .innerJoin('donuts', 'employees.favorite_donut', 'donuts.id')
    .select('employees.id as e_id', 'employees.first_name', 'employees.last_name', 'employees.favorite_donut',
            'shops.id as s_id', 'shops.name as s_name',
            'donuts.id as d_id', 'donuts.name as d_name')
    .where('employees.id', req.params.eid)
    .first()
    .then((data) => {
      rp('http://localhost:3000/donuts/json')
        .then((htmlString) => {
          res.render('employees/edit',
          {
            employees_shops: data,
            // donuts: [{id: 1, name: 'Sprinkles'}, {id: 3, name: 'Chocolate'}]
            donuts: JSON.parse(htmlString)
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:sid/employees/new', (req, res, next) => {
  rp('http://localhost:3000/donuts/json')
    .then((htmlString) => {
      res.render('employees/new',
      {
        error: null,
        shopId: req.params.sid,
        donuts: JSON.parse(htmlString)
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:sid/employees/:eid', (req, res, next) => {
  knex('employees')
    .innerJoin('shops', 'employees.shop_id', 'shops.id')
    .innerJoin('donuts', 'employees.favorite_donut', 'donuts.id')
    .select('employees.id as e_id', 'employees.first_name', 'employees.last_name', 'employees.favorite_donut',
            'shops.id as s_id', 'shops.name as s_name',
            'donuts.id as d_id', 'donuts.name as d_name')
    .where('employees.id', req.params.eid)
    .first()
    .then((data) => {
      res.render('employees/show', {employees_shops: data});
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/:sid/employees/:eid', (req, res, next) => {
  let updatedEmployee = req.body;
  knex('employees')
    .where({
      id: req.params.eid
    })
    .first()
    .update(updatedEmployee)
    .then(() => {
      res.status(204).redirect(`/shops/${req.params.sid}/employees/${req.params.eid}`);
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = router;
