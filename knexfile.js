module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/donuttycoon_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/donuttycoon_test'
  }
};
