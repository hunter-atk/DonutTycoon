/*jshint esversion: 6 */
process.env.PORT = 3030;
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
const knex = require('../db/knex');

beforeEach(function(done) {
  knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
});

describe("GET /donuts", function() {
  it.only('should return all donuts', function(done) {
    request.get('/donuts')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Glazed');
      expect(res.text).to.contain('Choc-tastic');
      expect(res.text).to.contain(200);
      done();
    });
  });
});

describe("GET /donuts/:id", function() {
  it('', function(done) {
    expect().to.equal();
  });
});

describe("GET /donuts/:id/edit", function() {
  it('', function(done) {
    expect().to.equal();
  });
});

describe("PATCH /donuts/:id", function() {
  it('', function(done) {
    expect().to.equal();
  });
});

describe("GET /donuts/new", function() {
  it('', function(done) {
    expect().to.equal();
  });
});

describe("DELETE /donuts", function() {
  it('', function(done) {
    expect().to.equal();
  });
});

describe("POST /donuts", function() {
  it('', function(done) {
    expect().to.equal();
  });
});
