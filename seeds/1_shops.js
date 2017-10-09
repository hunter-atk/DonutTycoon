
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      // Inserts seed entries
      return knex('shops').insert([
        {id: 1, name: "Jim Freeze", city: 'Cleveland'},
        {id: 2, name: 'Krunchy Kreme', city: 'Denver'},
        {id: 3, name: 'Dippin Donuts', city: 'Austin'},
        {id: 4, name: "Bob's Donuts", city: 'Chicago'}
      ]);
    });
};
