
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {shop_id: 1, first_name: 'Ryan', last_name: 'Wittrup', email: 'ryanw@donuts.com', hashed_password :'abc', favorite_donut:4},
        {shop_id: 2, first_name: 'Russ', last_name: 'Pierce', email: 'russp@donuts.com', hashed_password :'123', favorite_donut:3},
        {shop_id: 1, first_name: 'David', last_name: 'Bondy', email: 'davidb@donuts.com', hashed_password :'!@#', favorite_donut:2},
        {shop_id: 3, first_name: 'Mike', last_name: 'Wiora', email: 'wioramj@donuts.com', hashed_password :'supersecret', favorite_donut:1},
        {shop_id: 4, first_name: 'Dan', last_name: 'Wiora', email: 'wioradp@donuts.com', hashed_password :'qwerty', favorite_donut:1}
      ]);
    });
};
