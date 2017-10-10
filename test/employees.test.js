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

describe("GET /shops/:sid/employees, show all employees", function() {
  it.only('should return all employees for a given shop', function(done) {
    request.get('/shops/1/employees')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Ryan');
      expect(res.text).to.contain('Wittrup');
      done();
    });
  });
});

describe("GET /shops/:sid/employees/:eid, show one employee", function() {
  it.only('should return a selected employee', function(done) {
    request.get('/shops/1/employees/3')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('David');
      expect(res.text).to.contain('Bondy');
      done();
    });
  });
});

describe("GET /shops/:sid/employees/:eid/edit, get edit page for employee", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});

describe("PATCH /shops/:sid/employees/:eid, edit selected employee", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});

describe("GET /shops/:sid/employees/new, get new employee page", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});

describe("POST /shops/:sid/employees, create a new employee", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});

describe("DELETE /shops/:sid/employees/:eid, delete selected employee", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});
