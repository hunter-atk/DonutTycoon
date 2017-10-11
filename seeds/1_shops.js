
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      // Inserts seed entries
      return knex('shops').insert([
        {name: "Jim Freeze", city: 'Cleveland'},
        {name: 'Krunchy Kreme', city: 'Denver'},
        {name: 'Dippin Donuts', city: 'Austin'},
        {name: "Bob's Donuts", city: 'Chicago'}
      ]);
    });
};
