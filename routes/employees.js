const express = require('express');
const employees = require('../controllers/employees');

const router = express.Router({ mergeParams: true }); // passed route params from parent to child

router.route('/')
  .get(employees.index)
  // .get((req, res, next) => {
  //   knex('employees')
  //     .where({
  //       shop_id: req.params.shop_id,
  //     })
  //     .join('shops', 'employees.shop_id', '=', 'shops.id')
  //     .select(
  //       'employees.id as e_id', 'employees.first_name', 'employees.last_name',
  //       'shops.id as s_id', 'shops.name'
  //     )
  //     .then((employees_shops) => {
  //       res.render('employees/index', { employees_shops, shopId: req.params.shop_id, shopName: employees_shops[0].name });
  //     })
  //     .catch(err => next(err));
  // })
  .post(employees.create);

router.route('/:eid/edit').get(employees.editPage);

router.route('/new').get(employees.newPage);

router.route('/:eid')
  .get(employees.showPage)
  .patch(employees.edit)
  .delete(employees.destroy);

module.exports = router;
