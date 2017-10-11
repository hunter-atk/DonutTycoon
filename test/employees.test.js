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
  it.only('should display the edit form with current values', function(done) {
    request.get('/shops/1/employees/1/edit')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Ryan');
      expect(res.text).to.contain('Wittrup');
      expect(res.text).to.contain('Favorite Donut:');
      expect(res.text).to.contain('Sprinkles');
      done();
    });
  });
});

describe("PATCH /shops/:sid/employees/:eid, edit selected employee", function() {
  it.only('should update a record in the database', function(done) {
    request.patch('/shops/1/employees/3')
      .send({ first_name: 'David Allen', favorite_donut: 3})
      .end(function(err, res) {
        if (err) throw err;
        knex('employees')
          .where({
            id: 3
          })
          .first()
          .then((employee) => {
            expect(employee.first_name).to.equal('David Allen');
            expect(employee.favorite_donut).to.equal(3);
            done();
          });
      });
  });

  it.only('should redirect to all employees index', function(done) {
    request.patch('/shops/1/employees/3')
      .send({ first_name: 'David Allen', favorite_donut: 3})
      .expect('Content-Type', /text\/plain/)  // based on redirect
      .expect(302)
      .expect('Location', '/shops/1/employees/3')  // redirect to the show page for edited shop
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });

  it.only('should display the update on all employees index', function(done) {
    request.patch('/shops/1/employees/3')
      .send({ first_name: 'David Allen', favorite_donut: 3})
      .end(function(err, res) {
        if (err) throw err;
        request.get('/shops/1/employees/3')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          expect(res.text).to.contain('David Allen');
          expect(res.text).to.contain('Choc-tastic');
          done();
        });
      });
  });
});

describe("GET /shops/:sid/employees/new, get new employee page", function() {
  it.only('renders the new employee page with form', function(done) {
    request.get('/shops/1/employees/new')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('First Name:');
      expect(res.text).to.contain('Last Name:');
      expect(res.text).to.contain('Email:');
      expect(res.text).to.contain('Favorite Donut:');
      // expect(res.text).to.contain('Password:'); TODO
      done();
    });
  });
});

describe("POST /shops/:sid/employees, create a new employee", function() {
  it.only('should create a record in the database', function(done) {
    request.post('/shops/1/employees')
      .send({
        first_name: 'Tommy',
        last_name: 'Snax',
        email: 'numnums@donuts.com',
        favorite_donut:2
      })
      .end(function(err, res) {
        if (err) throw err;
        knex('employees')
          .where({
            email: 'numnums@donuts.com'
          })
          .first()
          .then((employee) => {
            expect(employee.first_name).to.equal('Tommy');
            expect(employee.favorite_donut).to.equal(2);
            done();
          });
      });
  });

  it.only('should redirect to all employees index', function(done) {
    request.post('/shops/1/employees')
      .send({
        first_name: 'Tommy',
        last_name: 'Snax',
        email: 'numnums@donuts.com',
        favorite_donut:2
      })
      .expect('Content-Type', /text\/plain/)  // based on redirect
      .expect(302)
      .expect('Location', '/shops/1/employees')  // redirect to the index page for all employees
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("DELETE /shops/:sid/employees/:eid, delete selected employee", function() {
  it('', function() {
    expect(false).to.equal(true);
  });
});
