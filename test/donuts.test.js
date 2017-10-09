/*jshint esversion: 6 */
process.env.PORT = 3030;

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
// const seed = require("../seeds/states_cities").seed;
const knex = require('../db/knex');

describe("mocha test connection", function() {
  it('should return true when mocha is connected properly', function() {
    expect(true).to.equal(true);
  });

  it('should return true when express is connected properly', function(done) {
    request.get('/')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('hello world');
      done();
    });
  });
});
