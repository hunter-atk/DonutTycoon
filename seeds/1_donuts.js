
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donuts').del()
    .then(function () {
      // Inserts seed entries
      return knex('donuts').insert([
        {id: 1, name: 'The Usual', topping: 'Glazed', price: 200},
        {id: 2, name: 'Cinnariffic', topping: 'Cinnamon and brown sugar', price: 250},
        {id: 3, name: 'Choc-tastic', topping: 'Chocolate frosting with chocolate filling', price: 300},
        {id: 4, name: 'Sprinkles', topping: 'Lots of sprinkles', price: 200}
      ]);
    });
};
