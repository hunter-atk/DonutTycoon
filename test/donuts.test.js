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
  it.only('should return a single donut based on id', function(done) {
    request.get('/donuts/1')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('The Usual');
      expect(res.text).to.contain('Glazed');
      expect(res.text).to.contain(200);
      done();
    });
  });
});

describe("GET /donuts/:id/edit", function() {
  it.only('should render the edit form for a given donut', function(done) {
    request.get('/donuts/2')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Name:');
      expect(res.text).to.contain('Cinnariffic');
      expect(res.text).to.contain('Cinnamon and brown sugar');
      expect(res.text).to.contain(250);
      done();
    });
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
