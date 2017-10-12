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
    request.get('/donuts/2/edit')
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
  it.only('should update the database for changes made to entry', function(done) {
    request.patch('/donuts/3')
      .send({ name: 'Eclair', topping: 'Chocolate fudge pudding', price: 440})
      .end(function(err, res) {
        if (err) throw err;
        knex('donuts')
          .where({'name': 'Eclair'})
          .first()
          .then((donut) => {
            expect(donut.name).to.equal('Eclair');
            expect(donut.topping).to.equal('Chocolate fudge pudding');
            expect(donut.price).to.equal(440);
            done();
          });
      });
  });

  it.only('should redirect to show page for updated donut', function(done) {
    request.patch('/donuts/3')
      .send({ name: 'Eclair', topping: 'Chocolate fudge pudding', price: 440})
      .expect('Content-Type', /text\/plain/)  // based on redirect
      .expect(302)
      .expect('Location', '/donuts/3')  // redirect to the show page for edited donut
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
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
