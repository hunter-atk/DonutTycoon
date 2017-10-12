
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops_donuts', (table) => {
    table.increments();
    table.integer('shop_id')
      .notNullable()
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE');
    table.integer('donut_id')
      .notNullable()
      .references('id')
      .inTable('donuts')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops_donuts');
};
