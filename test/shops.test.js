/*jshint esversion: 6 */
process.env.PORT = 3030;

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
const knex = require('../db/knex');

// MOCKS for testing
const SHOPS = [
  {id: 1, name: "Jim Freeze", city: 'Cleveland'},
  {id: 2, name: 'Krunchy Kreme', city: 'Denver'}
];
const SHOP = {id: 1, name: "Jim Freeze", city: 'Cleveland'};

// runs after each test in this block
afterEach(function() {
  knex('shops').del().then(() => null);
});

describe("GET /shops", function() {
  before(function(){
    knex('shops').del();
    knex('shops').insert(SHOPS).then(() => null);
  });
  it('should display all shop names', function(done) {
    request.get('/shops')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Jim Freeze');
      expect(res.text).to.contain('Krunchy Kreme');
      done();
    });
  });
});

describe("GET /shops/:id", function() {
  it('should contain the text "show"', function(done) {
    request.get('/shops/1')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});

describe("GET /shops/:id/edit", function() {
  it('should contain the text "edit"', function(done) {
    request.get('/shops/1/edit')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});

describe("PATCH /shops/:id", function() {
  it('should redirect to shops/:id', function(done) {
    request.patch('/shops/1')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});

describe("GET /shops/new", function() {
  it('should contain the text "create"', function(done) {
    request.get('/shops/new')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});

describe("POST /shops", function() {
  it('should redirect to shops/', function(done) {
    request.post('/shops')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});

describe("DELETE /shops/:id", function() {
  it('should redirect to shops/', function(done) {
    request.delete('/shops/1')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('random');
      done();
    });
  });
});
