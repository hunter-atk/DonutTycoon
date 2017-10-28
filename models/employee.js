const Resource = require('../models/resource')('employees');
const knex = require('../db/knex');

const Employee = Object.create(Resource);

// class Employee extends Resource {
//   all() {
//     return knex('employees')
//       .where({
//         shop_id: req.params.shop_id,
//       })
//       .join('shops', 'employees.shop_id', '=', 'shops.id')
//       .select(
//         'employees.id as e_id', 'employees.first_name', 'employees.last_name',
//         'shops.id as s_id', 'shops.name',
//       );
//   }
// }

module.exports = Employee;
