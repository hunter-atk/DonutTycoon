const express = require('express');
const rp = require('request-promise');

const router = express.Router({ mergeParams: true }); // passed route params from parent to child

const knex = require('../db/knex');

router.route('/')
  .get((req, res, next) => {
    knex('employees')
      .where({
        shop_id: req.params.shop_id,
      })
      .join('shops', 'employees.shop_id', '=', 'shops.id')
      .select(
        'employees.id as e_id', 'employees.first_name', 'employees.last_name',
        'shops.id as s_id', 'shops.name'
      )
      .then((employees_shops) => {
        res.render('employees/index', { employees_shops, shopId: req.params.shop_id, shopName: employees_shops[0].name });
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    const newEmployee = {
      shop_id: req.params.shop_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      hashed_password: 'hashtheplaintextpassword',
      favorite_donut: req.body.favorite_donut,
    };
    knex('employees')
      .insert(newEmployee)
      .then(() => {
        res.redirect(`/shops/${req.params.shop_id}/employees`);
      })
      .catch(err => next(err));
  });

router.get('/:eid/edit', (req, res, next) => {
  knex('employees')
    .innerJoin('shops', 'employees.shop_id', 'shops.id')
    .innerJoin('donuts', 'employees.favorite_donut', 'donuts.id')
    .select(
      'employees.id as e_id', 'employees.first_name', 'employees.last_name', 'employees.favorite_donut',
      'shops.id as s_id', 'shops.name as s_name',
      'donuts.id as d_id', 'donuts.name as d_name'
    )
    .where('employees.id', req.params.eid)
    .first()
    .then((data) => {
      rp('http://localhost:3000/donuts/json')
        .then((htmlString) => {
          res.render(
            'employees/edit',
            {
              employees_shops: data,
              // donuts: [{id: 1, name: 'Sprinkles'}, {id: 3, name: 'Chocolate'}]
              donuts: JSON.parse(htmlString),
            }
          );
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/new', (req, res, next) => {
  rp('http://localhost:3000/donuts/json')
    .then((htmlString) => {
      res.render(
        'employees/new',
        {
          error: null,
          shopId: req.params.shop_id,
          donuts: JSON.parse(htmlString),
        }
      );
    })
    .catch(err => next(err));
});

router.route('/:eid')
  .get((req, res, next) => {
    knex('employees')
      .innerJoin('shops', 'employees.shop_id', 'shops.id')
      .innerJoin('donuts', 'employees.favorite_donut', 'donuts.id')
      .select(
        'employees.id as e_id', 'employees.first_name', 'employees.last_name', 'employees.favorite_donut',
        'shops.id as s_id', 'shops.name as s_name',
        'donuts.id as d_id', 'donuts.name as d_name'
      )
      .where('employees.id', req.params.eid)
      .first()
      .then((data) => {
        res.render('employees/show', { employees_shops: data });
      })
      .catch(err => next(err));
  })
  .patch((req, res, next) => {
    const updatedEmployee = req.body;
    knex('employees')
      .where({
        id: req.params.eid,
      })
      .first()
      .update(updatedEmployee)
      .then(() => {
        res.status(204).redirect(`/shops/${req.params.shop_id}/employees/${req.params.eid}`);
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    knex('employees')
      .where({ id: req.params.shop_id })
      .del()
      .then(() => res.status(204).redirect(`/shops/${req.params.shop_id}/employees`))
      .catch(err => next(err));
  });


module.exports = router;
