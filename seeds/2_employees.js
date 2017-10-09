
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {id: 1, first_name: 'Ryan', last_name: 'Wittrup', email: 'ryanw@donuts.com', hashed_password :'abc', favorite_donut:4},
        {id: 2, first_name: 'Russ', last_name: 'Pierce', email: 'russp@donuts.com', hashed_password :'123', favorite_donut:3},
        {id: 3, first_name: 'David', last_name: 'Bondy', email: 'davidb@donuts.com', hashed_password :'!@#', favorite_donut:2}
      ]);
    });
};
