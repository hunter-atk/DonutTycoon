const db = require('../db/knex');

const ResourceFactory = table => ({
  all() {
    return db(table);
  },

  create(data) {
    return db(table).insert(data).returning('*');
  },

  findById(id) {
    // NEED TO DO FIRST - to get from array to object
    return db(table).where({ id }).first();
  },

  edit(id, newData) {
    return this.findById(id).update(newData);
  },

  destroy(id) {
    return this.findById(id).del();
  },

  allJson() {
    return db(table).orderBy('id');
  },
});

module.exports = ResourceFactory;
