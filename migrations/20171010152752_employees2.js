exports.up = function(knex, Promise) {
  return knex.schema.table('employees', (table) => {
    table.integer('shop_id')
      .notNullable()
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.table('employees', (table) => {
    table.dropColumn('shop_id');
  });
};
