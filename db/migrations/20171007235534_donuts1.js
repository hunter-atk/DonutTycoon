
exports.up = function(knex, Promise) {
  return knex.schema.createTable('donuts', (table) => {
    table.increments();
    table.text('name').notNullable().defaultTo('');
    table.text('topping').defaultTo('');
    table.integer('price').defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('donuts');
};
