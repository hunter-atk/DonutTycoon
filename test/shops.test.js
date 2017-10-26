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

describe("GET /shops", function() {
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
  it('should display info for selected shop', function(done) {
    request.get('/shops/3')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Dippin Donuts'); // shop title
      expect(res.text).to.contain('The Usual');  // available donut
      done();
    });
  });
});

describe("GET /shops/:id/edit", function() {
  it('should display edit form with current values', function(done) {
    request.get('/shops/1/edit')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Name:');
      expect(res.text).to.contain('Jim Freeze');
      expect(res.text).to.contain('City:');
      expect(res.text).to.contain('Cleveland');
      done();
    });
  });
});

describe("PATCH /shops/:id", function() {
  it('should update the database for changes made to entry', function(done) {
    request.patch('/shops/2')
    .send({ name: 'Shrunkin Shronuts', city: 'Hotlanta'})
    .end(function(err, res) {
      if (err) throw err;
      knex('shops')
        .where({id: 2})
        .first()
        .then(shop => {
          expect(shop.name).to.equal('Shrunkin Shronuts');
          expect(shop.city).to.equal('Hotlanta');
          done();
        })
    });
  });

  it('should redirect to show page for updated donut', function(done) {
    request.patch('/shops/2')
    .send({ name: 'Shrunkin Shronuts', city: 'Hotlanta'})
    .expect('Content-Type', /text\/plain/)  // based on redirect
    .expect(302)
    .expect('Location', '/shops/2')
    .end(function(err, res) {
      if (err) throw err;
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
      expect(res.text).to.contain('Name:');
      expect(res.text).to.contain('City:');
      expect(res.text).to.contain('Create a New Shop');
      done();
    });
  });
});

describe("POST /shops", function() {
  it('should create a new entry in the database', function(done) {
    request.post('/shops')
    .send({name: 'Spudnuts', city: 'Berea'})
    .end(function(err, res) {
      if (err) throw err;
      knex('shops')
        .where({
          name: 'Spudnuts'
        })
        .first()
        .then((shop) => {
          expect(shop.name).to.equal('Spudnuts');
          expect(shop.city).to.equal('Berea');
          done();
        });
    });
  });

  it('redirects to the new shop show page', function(done) {
    request.post('/shops')
    .send({id: 5, name: 'Giant Eagle', city: 'Strongsville'})
      .expect('Content-Type', /text\/plain/)  // based on redirect
      .expect(302)
      .expect('Location', '/shops/5')  // redirect to the show page for edited donut
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("DELETE /shops/:id", function() {
  it('should delete entry from shops table', function(done) {
    request.delete('/shops/1')
    .end(function(err, res) {
      if (err) throw err;
      knex('shops')
        .where({id: 1})
        .first()
        .then((shop) => {
          expect(shop).to.be.undefined;
          done();
        });
    });
  });

  it('should redirect to shops/', function(done) {
    request.delete('/shops/2')
    .expect('Content-Type', /text\/plain/)
    .expect(302)
    .expect('Location', '/shops')
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });
});
