/*jshint esversion: 6 */
process.env.PORT = 3030;
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
const knex = require('../db/knex');

// MOCKS for testing
const EMPLOYEES = [
  {id: 1, first_name: 'Ryan', last_name: 'Wittrup', email: 'ryanw@donuts.com', hashed_password :'abc', favorite_donut:4},
  {id: 2, first_name: 'Russ', last_name: 'Pierce', email: 'russp@donuts.com', hashed_password :'123', favorite_donut:3},
];

const EMPLOYEE = {id: 2, first_name: 'Russ', last_name: 'Pierce', email: 'russp@donuts.com', hashed_password :'123', favorite_donut:3};

describe("GET /shops/:sid/employees, show all employees", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});

describe("GET /shops/:sid/employees/:eid, show one employee", function() {
  it('', function() {
    expect(false).to.equal(true);
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
