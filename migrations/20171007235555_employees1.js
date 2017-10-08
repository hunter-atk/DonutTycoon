
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employees', (table) => {
    table.increments();
    table.text('first_name').notNullable().defaultTo('');
    table.text('last_name').notNullable().defaultTo('');
    table.text('email').notNullable().defaultTo('');
    table.text('hashed_password').notNullable();
    table.integer('favorite_donut')
      .references('id')
      .inTable('donuts')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('employees');
};
